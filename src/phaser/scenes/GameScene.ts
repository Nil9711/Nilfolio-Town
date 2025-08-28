import Phaser from 'phaser';
import type { Controls, House, PlayerPosition } from '../../types/types';

export class GameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private controls!: Controls;
    private houses: House[] = [];
    private interactionPrompt!: Phaser.GameObjects.Text;
    private currentNearHouse: House | null = null;
    private map!: Phaser.Tilemaps.Tilemap;

    constructor() {
        super({ key: 'GameScene' });
    }

    create(): void {
        // Create the world with tilemap
        this.createWorld();
        this.createPlayer();
        this.setupCollisions(); // Set up collisions after player is created
        this.createHouses();
        this.createUI();
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
        console.log('Available layers:', availableLayers);

        availableLayers.forEach(layerName => {
            const layer = this.map.createLayer(layerName, tileset);
            console.log(`Created layer: ${layerName}`, layer);
        });

        // Set world bounds based on map size
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

    private setupCollisions(): void {
        // Get the layers that should have collision
        const objectsLayer = this.map.getLayer('Objects')?.tilemapLayer;
        const doorsLayer = this.map.getLayer('Doors/windows/roof')?.tilemapLayer;
        const roofLayer = this.map.getLayer('Roof object')?.tilemapLayer;

        // Set collision on non-walkable layers
        if (objectsLayer) {
            objectsLayer.setCollisionByExclusion([-1, 0]);
            this.physics.add.collider(this.player, objectsLayer);
            console.log('Added collision to Objects layer');
        }

        if (doorsLayer) {
            doorsLayer.setCollisionByExclusion([-1, 0]);
            this.physics.add.collider(this.player, doorsLayer);
            console.log('Added collision to Doors layer');
        }

        if (roofLayer) {
            roofLayer.setCollisionByExclusion([-1, 0]);
            this.physics.add.collider(this.player, roofLayer);
            console.log('Added collision to Roof layer');
        }
    }

    private createPlayer(): void {
        // Position player in the middle of the map
        const startPos: PlayerPosition = {
            x: this.map.widthInPixels / 2,
            y: this.map.heightInPixels / 2
        };

        // Create player with idle sprite
        this.player = this.physics.add.sprite(startPos.x, startPos.y, 'player_idle');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.3); // Made smaller

        // Player physics
        this.player.body!.setSize(12, 12); // Adjust hitbox as needed
        (this.player.body as Phaser.Physics.Arcade.Body).setDrag(300, 300);

        // No idle animation for now - just use the static sprite
    }

    private createHouses(): void {
        // Houses are now in the tilemap, so we don't need to create them here
        // This method can be removed or used for other purposes
    }

    private createUI(): void {
        // Removed house interaction UI since houses are now in tilemap
        // You can add other UI elements here if needed
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
        // Removed house proximity and interaction since houses are now in tilemap
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

        // Handle animations - simplified since no idle animation yet
        if (velocityX !== 0 || velocityY !== 0) {
            // Player is moving - play walking animation
            if (this.player.anims.currentAnim?.key !== 'player_walk') {
                this.player.play('player_walk');
            }
        } else {
            // Player is idle - stop animation and show idle sprite
            this.player.anims.stop();
            this.player.setTexture('player_idle');
        }
    }

    private checkHouseProximity(): void {
        // Removed - houses are now in tilemap
    }

    private handleInteraction(): void {
        // Removed - will need to be reimplemented for tilemap-based interactions
    }
}