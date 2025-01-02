import { FC } from "react";
import { cn } from "@/lib/utils";

import PlayerCard from "./PlayerCard";

export interface PlayerPanelProps {
    isTop: boolean;
}

const PlayerPanel: FC<PlayerPanelProps> = ({ isTop }) => {
    return (
        <div className="w-full flex-1 flex flex-col gap-2 items-center justify-between">
            <div
                className={cn(
                    "w-full flex-1 flex flex-col p-2 items-center justify-center",
                    isTop ? "order-first" : "order-last",
                )}
            >
                abcde
            </div>
            <div className={cn(
                "w-full flex items-center",
                isTop ? "justify-start" : "justify-end"
            )}>
                <PlayerCard
                    name="Test Player"
                    avatar=""
                    wins={0}
                />
            </div>
        </div>
    )
}

export default PlayerPanel;