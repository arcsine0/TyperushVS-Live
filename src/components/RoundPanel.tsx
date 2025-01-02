import { FC } from "react";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

export interface RoundPanelProps {
    round: number | undefined;
    timer: number | undefined;
    onClick: () => void;
}

const RoundPanel: FC<RoundPanelProps> = ({ round, timer, onClick }) => {
    return (
        <Card 
            className={cn(
                "w-full flex flex-row p-4 gap-2 items-center justify-between shadow-md rounded-lg select-none",
            )}
            onClick={onClick}
        >
            <span className="text-2xl font-bold">{round ? `Round ${round}` : "Round Over"}</span>
            <span className="text-2xl font-bold">{timer}</span>
        </Card>
    )
}

export default RoundPanel;