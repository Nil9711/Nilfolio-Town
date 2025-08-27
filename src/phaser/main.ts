import Phaser from 'phaser';
import type { GameConfig } from '../types/types';
import { GameScene } from './scenes/GameScene';
import { PreloadScene } from './scenes/PreloadScene';

const gameConfig: GameConfig = {
    width: 800,
    height: 600
};

export const createPhaserGame = (parentElement: HTMLElement): Phaser.Game => {
    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: gameConfig.width,
        height: gameConfig.height,
        parent: parentElement,
        backgroundColor: '#2c3e50',
        scene: [PreloadScene, GameScene],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { x: 0, y: 0 },
                debug: false
            }
        },
        pixelArt: true,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,

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