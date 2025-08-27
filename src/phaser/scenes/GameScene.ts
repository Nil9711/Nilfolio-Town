import Phaser from 'phaser';
import type { Controls, House, PlayerPosition } from '../../types/types';

export class GameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private controls!: Controls;
    private houses: House[] = [];
    private interactionPrompt!: Phaser.GameObjects.Text;
    private currentNearHouse: House | null = null;

    constructor() {
        super({ key: 'GameScene' });
    }

    create(): void {
        // Create the world
        this.createWorld();
        this.createPlayer();
        this.createHouses();
        this.createUI();
        this.setupControls();
        this.setupCamera();
    }

    private createWorld(): void {
        const tileSize = 16; // Kenny's tiles are 16x16
        const scale = 2; // Scale up the tiles

        // Create sandy ground using sand tiles
        this.createSandyGround(tileSize, scale);

        // Create world boundaries
        this.physics.world.setBounds(0, 0, 800, 600);
    }

    private createSandyGround(tileSize: number, scale: number): void {
        // Fill the world with sand tiles, using variety for texture
        for (let x = 0; x < 25; x++) {
            for (let y = 0; y < 19; y++) {
                // Use different sand tiles for variety
                let sandType = 'sand1'; // Default
                const rand = Math.random();

                if (rand > 0.8) {
                    sandType = 'sand2';
                } else if (rand > 0.6) {
                    sandType = 'sand3';
                } else if (rand > 0.4) {
                    sandType = 'sand4';
                }

                const tile = this.add.image(x * tileSize * scale, y * tileSize * scale, sandType);
                tile.setOrigin(0).setScale(scale);
            }
        }
    }

    private createPlayer(): void {
        const startPos: PlayerPosition = { x: 400, y: 500 };

        // Create player with idle sprite
        this.player = this.physics.add.sprite(startPos.x, startPos.y, 'player_idle');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.5); // Keep it small as requested

        // Player physics
        this.player.body!.setSize(12, 12); // Adjust hitbox as needed
        (this.player.body as Phaser.Physics.Arcade.Body).setDrag(300, 300);

        // Start with idle animation
        this.player.play('player_idle_anim');
    }

    private createHouses(): void {
        this.houses = [
            {
                x: 100,
                y: 150,
                width: 120,
                height: 100,
                color: 0xe74c3c, // Not used anymore but kept for compatibility
                label: "Projects",
                overlayId: "projects-overlay"
            },
            {
                x: 500,
                y: 150,
                width: 120,
                height: 100,
                color: 0x9b59b6,
                label: "About Me",
                overlayId: "about-overlay"
            }
        ];

        // Create detailed houses using Kenny tiles
        this.createDetailedHouse(this.houses[0], 'wall_brown', 'door_wood', 'Projects House');
        this.createDetailedHouse(this.houses[1], 'wall_stone', 'door_metal', 'About House');

        // Create collision areas
        this.houses.forEach((house) => {
            const collider = this.physics.add.staticGroup();
            const houseCollider = collider.create(
                house.x + house.width / 2,
                house.y + house.height / 2,
                undefined
            );
            houseCollider.body!.setSize(house.width + 40, house.height + 40);
            houseCollider.setVisible(false);
        });
    }

    private createDetailedHouse(house: House, wallType: string, doorType: string, signText: string): void {
        const tileSize = 16;
        const scale = 2;

        // Create house foundation
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 3; y++) {
                const wall = this.add.image(
                    house.x + x * tileSize * scale,
                    house.y + y * tileSize * scale,
                    wallType
                );
                wall.setOrigin(0).setScale(scale);
            }
        }

        // Add roof tiles
        for (let x = 0; x < 4; x++) {
            const roofTile = this.add.image(
                house.x + x * tileSize * scale,
                house.y - tileSize * scale,
                'roof'
            );
            roofTile.setOrigin(0).setScale(scale);
        }

        // Add door
        const door = this.add.image(
            house.x + tileSize * scale * 1.5,
            house.y + tileSize * scale * 2,
            doorType
        );
        door.setOrigin(0).setScale(scale);

        // Add windows
        const window1 = this.add.image(
            house.x + tileSize * scale * 0.5,
            house.y + tileSize * scale * 1,
            'window'
        );
        window1.setOrigin(0).setScale(scale);

        const window2 = this.add.image(
            house.x + tileSize * scale * 2.5,
            house.y + tileSize * scale * 1,
            'window'
        );
        window2.setOrigin(0).setScale(scale);

        // Add decorative chest next to house
        const chest = this.add.image(
            house.x - tileSize * scale,
            house.y + tileSize * scale * 2,
            'chest'
        );
        chest.setOrigin(0).setScale(scale);

        // House label with better positioning
        this.add.text(
            house.x + house.width / 2,
            house.y - 60,
            signText,
            {
                fontSize: '14px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 3,
                backgroundColor: '#8B4513',
                padding: { x: 6, y: 3 }
            }
        ).setOrigin(0.5);
    }

    private createUI(): void {
        this.interactionPrompt = this.add.text(400, 50, '', {
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setVisible(false).setScrollFactor(0);
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
        this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update(): void {
        this.handlePlayerMovement();
        this.checkHouseProximity();
        this.handleInteraction();
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

        // Handle animations
        if (velocityX !== 0 || velocityY !== 0) {
            // Player is moving - play walking animation
            if (this.player.anims.currentAnim?.key !== 'player_walk') {
                this.player.play('player_walk');
            }
        } else {
            // Player is idle - play idle animation
            if (this.player.anims.currentAnim?.key !== 'player_idle_anim') {
                this.player.play('player_idle_anim');
            }
        }
    }

    private checkHouseProximity(): void {
        this.currentNearHouse = null;

        for (const house of this.houses) {
            const distance = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                house.x + house.width / 2,
                house.y + house.height / 2
            );

            if (distance < 80) { // Interaction range
                this.currentNearHouse = house;
                this.interactionPrompt.setText(`Press SPACE to visit ${house.label}`);
                this.interactionPrompt.setVisible(true);
                break;
            }
        }

        if (!this.currentNearHouse) {
            this.interactionPrompt.setVisible(false);
        }
    }

    private handleInteraction(): void {
        if (Phaser.Input.Keyboard.JustDown(this.controls.space) && this.currentNearHouse) {
            if (window.showOverlay) {
                window.showOverlay(this.currentNearHouse.overlayId);
            }
        }
    }
}