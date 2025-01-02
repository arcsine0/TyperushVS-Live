import { FC } from "react";
import { cn } from "@/lib/utils";

export interface RoundPanelProps {
    round: number;
    timer: number;
}

const RoundPanel: FC<RoundPanelProps> = ({ round, timer }) => {
    return (
        <div 
            className={cn(
                "w-full flex flex-row p-4 gap-2 items-center justify-between shadow-md rounded-lg",
            )}
        >
            <span className="text-2xl font-bold">Round: {round}</span>
            <span className="text-2xl font-bold">{timer}</span>
        </div>
    )
}

export default RoundPanel;