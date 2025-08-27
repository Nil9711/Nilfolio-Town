import type { ClassValue } from "clsx";
import { useEffect, useRef } from 'react';
import { createPhaserGame } from "../phaser/main";
import { cn } from "../utils/utils";
import AboutOverlay from "./AboutOverlay";
import ProjectsOverlay from "./ProjectsOverlay";

type Props = {
    className?: ClassValue;
}

const GameWindow = ({ className }: Props) => {
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const phaserGameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (gameContainerRef.current && !phaserGameRef.current) {
            phaserGameRef.current = createPhaserGame(gameContainerRef.current);
        }

        return () => {
            if (phaserGameRef.current) {
                phaserGameRef.current.destroy(true);
                phaserGameRef.current = null;
            }
        };
    }, []);

    // Handle overlays in React instead of global functions
    const showOverlay = (overlayId: string) => {
        console.log('Show overlay:', overlayId);
        // You can manage overlays as React state instead
    };

    useEffect(() => {
        window.showOverlay = showOverlay;
        return () => {
            delete window.showOverlay;
        };
    }, []);

    return (
        <div className={cn("relative border-2 border-slate-600 rounded-lg", className)}>
            <div ref={gameContainerRef} className="w-[800px] h-[600px]" />

            <ProjectsOverlay />
            <AboutOverlay />

            <div className="absolute bottom-5 left-5 bg-black/70 text-white p-2.5 rounded text-xs">
                Use ARROW KEYS or WASD to move<br />
                Press SPACE near houses to interact
            </div>
        </div>
    );
};

export default GameWindow;