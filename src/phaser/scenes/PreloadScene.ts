import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    // Load player sprites
    this.load.image('player_idle', '/assets/characters/player_idle.png');
    this.load.image('player_walk1', '/assets/characters/player_walk1.png');
    this.load.image('player_walk2', '/assets/characters/player_walk2.png');

    // Load environment tiles
    this.loadEnvironmentTiles();

    // Loading text
    this.add.text(400, 300, 'Loading Portfolio Town...', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }

  private loadEnvironmentTiles(): void {
    // Sand tiles (0048-0053 range)
    this.load.image('sand1', '/assets/environment/tile_0048.png');
    this.load.image('sand2', '/assets/environment/tile_0049.png');
    this.load.image('sand3', '/assets/environment/tile_0050.png');
    this.load.image('sand4', '/assets/environment/tile_0051.png');
    this.load.image('sand5', '/assets/environment/tile_0052.png');
    this.load.image('sand6', '/assets/environment/tile_0053.png');

    // Building materials (keeping some for houses)
    this.load.image('wall_brown', '/assets/environment/tile_0033.png');
    this.load.image('wall_stone', '/assets/environment/tile_0034.png');
    this.load.image('door_wood', '/assets/environment/tile_0049.png');
    this.load.image('door_metal', '/assets/environment/tile_0050.png');

    // Some decorations
    this.load.image('tree_small', '/assets/environment/tile_0081.png');
    this.load.image('tree_large', '/assets/environment/tile_0082.png');
    this.load.image('rock', '/assets/environment/tile_0097.png');
    this.load.image('chest', '/assets/environment/tile_0113.png');
  }

  create(): void {
    // Create walking animation
    this.anims.create({
      key: 'player_walk',
      frames: [
        { key: 'player_walk1' },
        { key: 'player_idle' },
        { key: 'player_walk2' },
        { key: 'player_idle' }
      ],
      frameRate: 8,
      repeat: -1
    });

    // Create idle animation (just the idle frame)
    this.anims.create({
      key: 'player_idle_anim',
      frames: [{ key: 'player_idle' }],
      frameRate: 1
    });

    // Start the main game scene
    this.scene.start('GameScene');
  }
}