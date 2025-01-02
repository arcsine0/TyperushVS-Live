import { FC } from "react";
import { cn, getInitials } from "@/lib/utils";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface PlayerCardProps {
    isTop: boolean;
    name: string;
    avatar: string;
    wins: number;
}

const PlayerCard: FC<PlayerCardProps> = ({ isTop, name, avatar, wins }) => {
    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
                <CardTitle className="flex flex-row items-center gap-2">
                    <Avatar className={cn(isTop ? "order-first" : "order-last")}>
                        <AvatarImage src={avatar} />
                        <AvatarFallback>{getInitials(name)}</AvatarFallback>
                    </Avatar>
                    <div className={cn(
                        "flex flex-col gap-1",
                        isTop ? "items-start" : "items-end"
                    )}>
                        <span>{name}</span>
                        <span>👑 {wins}</span>
                    </div>
                </CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PlayerCard;