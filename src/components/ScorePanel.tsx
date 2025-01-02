import { FC } from "react";
import { cn } from "@/lib/utils";

export interface ScorePanelProps {
    score: number;
}

const ScorePanel: FC<ScorePanelProps> = ({ score }) => {
    return (
        <div className={cn(
            "w-full flex items-center justify-center",
            "shadow-[0px_-10px_20px_rgba(0,255,0,0.3),_0px_10px_20px_rgba(255,0,0,0.3)]",
        )}>
            asdf
        </div>
    )
}

export default ScorePanel;