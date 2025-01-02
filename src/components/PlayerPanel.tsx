import { FC } from "react";
import { cn } from "@/lib/utils";

import PlayerCard from "./PlayerCard";

export interface PlayerPanelProps {
    isTop: boolean;
    word?: string;
}

const PlayerPanel: FC<PlayerPanelProps> = ({ isTop, word }) => {
    return (
        <div className="w-full flex-1 flex flex-col gap-2 items-center justify-between">
            <div
                className={cn(
                    "w-full flex-1 flex p-2 gap-2 items-center justify-center",
                    isTop ? "order-first" : "order-last",
                )}
            >
                {word && [...word].map((ch, index) => (
                    <div
                        key={index}
                        className="flex p-4 items-center justify-end border rounded-lg select-none"
                    >
                        <span className="text-5xl font-semibold">{ch.toUpperCase()}</span>
                    </div>
                ))}
            </div>
            <div className={cn(
                "w-full flex items-center",
                isTop ? "justify-start" : "justify-end"
            )}>
                <PlayerCard
                    isTop={isTop}
                    name="Test Player"
                    avatar=""
                    wins={0}
                />
            </div>
        </div>
    )
}

export default PlayerPanel;