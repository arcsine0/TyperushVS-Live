import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { donationOptions, donationOptionProps } from "@/lib/donationOptions";

export default function DonationPanel () {
    const [donationPanels, setDonationPanels] = useState<donationOptionProps[] | undefined>(undefined);

    useEffect(() => {
        setDonationPanels(donationOptions.map(option => ({
            name: option.name,
            icon: option.icon,
            active: false,
            disabled: false,
            duration: 0,
        })));
    }, []);

    return (
        <div className="w-full flex p-2 gap-2 items-center justify-center flex-wrap border-2">
            {donationPanels?.map((panel, index) => (
                <Button
                    key={index}
                    className="flex-1 h-auto flex flex-col p-1 gap-[2px] items-center justify-center"
                    variant={panel.active === false ? "outline" : "default"}
                    disabled={panel.disabled}
                >
                    <span className="text-2xl">{panel.icon}</span>
                    <span className="text-xs font-bold">{panel.name}</span>
                    {(panel.duration && panel.duration !== 0) && (
                        <span className="text-xs font-bold">{panel.duration}</span>
                    )}
                </Button>
            ))}
        </div>
    )
}