export interface donationOptionProps {
    name: string;
    icon: string;
    active?: boolean;
    disabled?: boolean;
    duration?: number;
}

export const donationOptions: donationOptionProps[] = [
    {
        name: "Hard",
        icon: "😡",
    },
    {
        name: "Fast",
        icon: "⏱️",
    },
    {
        name: "Damage",
        icon: "💔",
    },
    {
        name: "Reverse",
        icon: "🔄",
    },
    {
        name: "Upside-Down",
        icon: "🔃",
    },
    {
        name: "Blink",
        icon: "👁️",
    },
    {
        name: "Hide",
        icon: "🤦🏻",
    },
    {
        name: "Flash",
        icon: "✨",
    },
]