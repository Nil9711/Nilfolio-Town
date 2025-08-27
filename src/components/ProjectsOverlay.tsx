import type { ClassValue } from "clsx";
import { cn } from "../utils/utils";

type Props = {
    className?: ClassValue;
    onClose: Function
}

const ProjectsOverlay = ({ onClose, className }: Props) => {

    return (
        <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-black/90 text-white p-8 rounded-lg max-w-md w-[90%] z-[1000]",
            "border-2 border-blue-500 block",
            className
        )}>
            <h2 className="text-blue-400 mb-4 text-center text-xl">🗂️ My Projects</h2>
            <p className="leading-relaxed mb-4">Here are some of the cool things I've built:</p>
            <ul className="ml-5 mb-4 space-y-1">
                <li>E-commerce platform with React & Node.js</li>
                <li>Mobile game using Unity & C#</li>
                <li>Data visualization dashboard</li>
                <li>AI-powered chatbot</li>
            </ul>
            <p className="leading-relaxed mb-4">
                Click on individual projects to see more details, code, and live demos!
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded float-right mt-2.5"
                onClick={() => onClose()}
            >
                Close
            </button>
        </div>
    );
};

export default ProjectsOverlay;