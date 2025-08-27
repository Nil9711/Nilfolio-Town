import type { ClassValue } from "clsx";
import { useState } from 'react';
import { cn } from "../utils/utils";

type Props = {
    className?: ClassValue;
}

const AboutOverlay = ({ className }: Props) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-black/90 text-white p-8 rounded-lg max-w-md w-[90%] z-[1000]",
            "border-2 border-blue-500",
            isVisible ? "block" : "hidden",
            className
        )}>
            <h2 className="text-blue-400 mb-4 text-center text-xl">👋 About Me</h2>
            <p className="leading-relaxed mb-4">
                Hello! I'm a passionate developer who loves creating interactive experiences and solving complex problems.
            </p>
            <p className="leading-relaxed mb-4">
                <strong>Skills:</strong> TypeScript, JavaScript, Python, React, Node.js, Phaser, Unity
            </p>
            <p className="leading-relaxed mb-4">
                <strong>Background:</strong> 5+ years of experience in full-stack development with a focus on user experience and clean code.
            </p>
            <p className="leading-relaxed mb-4">
                When I'm not coding, you'll find me exploring new technologies, playing games, or working on creative side projects like this portfolio!
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded float-right mt-2.5"
                onClick={() => setIsVisible(false)}
            >
                Close
            </button>
        </div>
    );
};

export default AboutOverlay;