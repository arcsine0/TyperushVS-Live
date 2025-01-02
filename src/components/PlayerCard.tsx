import { FC } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface PlayerCardProps {
    name: string;
    avatar: string;
    wins: number;
}

const PlayerCard: FC<PlayerCardProps> = ({ name, avatar, wins }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row items-center gap-2">
                    <Avatar>
                        <AvatarImage src={avatar} />
                        <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <span>{name}</span>
                        <span>👑 {wins}</span>
                    </div>
                    
                </CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PlayerCard;