import Phaser from 'phaser';
import type { Controls, PlayerPosition } from '../../types/types';

export class GameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private controls!: Controls;
    private map!: Phaser.Tilemaps.Tilemap;

    constructor() {
        super({ key: 'GameScene' });
    }

    create(): void {
        // Create the world with tilemap
        this.createWorld();
        this.createPlayer();
        this.setupCollisions(); // Set up collisions after player is created
        this.setupControls();
        this.setupCamera();
    }

    private createWorld(): void {
        // Create tilemap
        this.map = this.add.tilemap('map');
        const tileset = this.map.addTilesetImage('Roguelike', 'tiles');

        if (!tileset) {
            console.error("Failed to load tileset");
            return;
        }

        // Create all layers
        const availableLayers = this.map.layers.map(l => l.name);

        availableLayers.forEach(layerName => {
            this.map.createLayer(layerName, tileset);
        });

        // Set world bounds based on map size
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

    private setupCollisions(): void {
        const unwalkableLayersNames = ['Water', 'Objects', 'Doors/windows/roof', 'Roof object']
        for (const unwalkableLayerName of unwalkableLayersNames) {
            const unwalkableLayer = this.map.getLayer(unwalkableLayerName)?.tilemapLayer;
            if (unwalkableLayer) {
                unwalkableLayer.setCollisionByExclusion([-1, 0]);
                this.physics.add.collider(this.player, unwalkableLayer);
            }
        }
    }

    private createPlayer(): void {
        // Position player in the middle of the map
        const startPos: PlayerPosition = {
            x: this.map.widthInPixels / 2 - 275,
            y: this.map.heightInPixels / 2 + 133
        };

        // Create player with idle sprite
        this.player = this.physics.add.sprite(startPos.x, startPos.y, 'player_idle');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.3); // Made smaller

        // Player physics
        this.player.body!.setSize(7, 7); // Adjust hitbox as needed
        (this.player.body as Phaser.Physics.Arcade.Body).setDrag(300, 300);
        this.player.preFX?.addGlow(0x000000, 0.2, 0, false, 0.01, 8);

        // No idle animation for now - just use the static sprite
    }

    private setupControls(): void {
        // Create all keys we need
        const cursors = this.input.keyboard!.createCursorKeys();
        const wasd = this.input.keyboard!.addKeys('W,S,A,D') as any;

        this.controls = {
            up: cursors.up!,
            down: cursors.down!,
            left: cursors.left!,
            right: cursors.right!,
            space: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        };

        // Store WASD keys for checking in handlePlayerMovement
        (this as any).wasdKeys = wasd;
    }

    private setupCamera(): void {
        // Set camera bounds to match the tilemap size
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        // Optional: Set initial zoom
        // this.cameras.main.setZoom(1.5);
    }

    update(): void {
        this.handlePlayerMovement();
    }

    private handlePlayerMovement(): void {
        const speed = 160;
        let velocityX = 0;
        let velocityY = 0;

        const wasd = (this as any).wasdKeys;

        // Check both arrow keys and WASD
        if (this.controls.left.isDown || wasd.A.isDown) {
            velocityX = -speed;
        } else if (this.controls.right.isDown || wasd.D.isDown) {
            velocityX = speed;
        }

        if (this.controls.up.isDown || wasd.W.isDown) {
            velocityY = -speed;
        } else if (this.controls.down.isDown || wasd.S.isDown) {
            velocityY = speed;
        }

        // Normalize diagonal movement
        if (velocityX !== 0 && velocityY !== 0) {
            velocityX *= 0.707;
            velocityY *= 0.707;
        }

        this.player.setVelocity(velocityX, velocityY);

        if (velocityX !== 0 || velocityY !== 0) {
            this.player.play('player_walk', true); // The 'true' forces restart
        } else {
            this.player.anims.stop();
            this.player.setTexture('player_idle');
        }
    }
}