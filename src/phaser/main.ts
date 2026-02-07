import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';
import { PreloadScene } from './scenes/PreloadScene';

export const createPhaserGame = (parentElement: HTMLElement): Phaser.Game => {
    const config: Phaser.Types.Core.GameConfig = {
        parent: parentElement,
        backgroundColor: '#2c3e50',
        type: Phaser.AUTO,
        width: 608,
        height: 560,
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH,

        },
        scene: [PreloadScene, GameScene],
        physics: {
            default: 'arcade',
            arcade: { debug: false }
        }

    };

    const game = new Phaser.Game(config);

    const handleResize = () => {
        game.scale.refresh();
    };

    window.addEventListener('resize', handleResize);

    (game as any).cleanup = () => {
        window.removeEventListener('resize', handleResize);
    };

    return game;
};