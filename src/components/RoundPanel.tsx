import { FC } from "react";

export interface RoundPanelProps {
    round: number;
    timer: number;
    score: number;
}

const RoundPanel: FC<RoundPanelProps> = ({ round, timer, score }) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            <span className="text-2xl font-bold">Round: {round}</span>
            <span>Score: {score}</span>
            <span className="text-2xl font-bold">Timer: {timer}</span>
        </div>
    )
}

export default RoundPanel;