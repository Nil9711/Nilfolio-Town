import type { ClassValue } from "clsx";
import { useEffect, useRef, useState } from 'react';
import { createPhaserGame } from "../phaser/main";
import type { OverlayType } from "../types/types";
import { cn } from "../utils/utils";
import AboutOverlay from "./AboutOverlay";
import ProjectsOverlay from "./ProjectsOverlay";

type Props = {
    className?: ClassValue;
}


const GameWindow = ({ className }: Props) => {
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const phaserGameRef = useRef<Phaser.Game | null>(null);
    const [activeOverlay, setActiveOverlay] = useState<OverlayType>("");

    useEffect(() => {
        if (gameContainerRef.current && !phaserGameRef.current) {
            phaserGameRef.current = createPhaserGame(gameContainerRef.current);
        }

        window.showOverlay = (overlayId: string) => {
            setActiveOverlay(overlayId as OverlayType);
        };

        return () => {
            if (phaserGameRef.current) {
                phaserGameRef.current.destroy(true);
                phaserGameRef.current = null;
            }
        };
    }, []);

    const showOverlay = (overlayId: OverlayType) => {
        setActiveOverlay(overlayId)
    };

    const closeOverlay = () => {
        setActiveOverlay("")
    }

    useEffect(() => {
        window.showOverlay = showOverlay;
        window.closeOverlay = closeOverlay;
        return () => {
            delete window.showOverlay;
            delete window.closeOverlay;
        };
    }, []);

    return (
        <div className={cn("relative border-2 border-slate-600 rounded-lg", className)}>
            <div ref={gameContainerRef} className="w-[800px] h-[600px]" />

            {activeOverlay === 'projects-overlay' && (
                <ProjectsOverlay onClose={closeOverlay} />
            )}
            {activeOverlay === 'about-overlay' && (
                <AboutOverlay onClose={closeOverlay} />
            )}

            <div className="absolute bottom-5 left-5 bg-black/70 text-white p-2.5 rounded text-xs">
                Use ARROW KEYS or WASD to move<br />
                Press SPACE near houses to interact
            </div>
        </div>
    );
};

export default GameWindow;