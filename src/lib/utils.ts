import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getInitials(text: string) {
	return text.split(" ").map(word => word[0]).join("");
}

export interface PlayerState {
	player: number;
	word: string | undefined;
	score: number;
}

export interface PreRoundState {
	countdown: number;
	playerStates: PlayerState[];
}

export interface RoundState {
	round: number | undefined;
	timer: number;
}