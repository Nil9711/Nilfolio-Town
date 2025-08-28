import type Phaser from "phaser";

export type OverlayType = "projects-overlay" | "about-overlay" | ""


export interface PlayerPosition {
    x: number;
    y: number;
}

export interface House {
    x: number;
    y: number;
    width: number;
    height: number;
    color: number;
    label: string;
    overlayId: OverlayType;
}

export interface Controls {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    space: Phaser.Input.Keyboard.Key;
}

declare global {
    interface Window {
        showOverlay?: (overlayId: OverlayType) => void;
        closeOverlay?: () => void;
    }
}