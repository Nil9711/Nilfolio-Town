export class PreloadScene extends Phaser.Scene {
  preload(): void {
    // Load all assets
    this.load.image('player_idle', '/assets/characters/player_idle.png');
    this.load.image('player_walk1', '/assets/characters/player_walk1.png');
    this.load.image('player_walk2', '/assets/characters/player_walk2.png');
    this.load.tilemapTiledJSON('map', '/assets/tilesets/nilfolio-town.json');
    this.load.image('tiles', '/assets/tilesets/roguelikeSheet_transparent.png');
    
    // Loading text
    this.add.text(400, 300, 'Loading Portfolio Town...', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }

  create(): void {
    // Create animations
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

    this.scene.start('GameScene');
  }
}