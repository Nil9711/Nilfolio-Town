import type { ClassValue } from "clsx";
import { cn } from "../utils/utils";

type Props = {
    className?: ClassValue;
}

const GameWindow = ({ className }: Props) => {
    return (
        <div className={cn("w-full h-full flex justify-center items-center", className)}>
            <div className="h-[600px] w-[800px] bg-red-400">
                Game
            </div>
        </div>
    )
}

export default GameWindow