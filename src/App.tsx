import { useState, useEffect } from "react";

import DonationPanel from "@/components/DonationPanel";
import PlayerPanel from "@/components/PlayerPanel";
import RoundPanel from "@/components/RoundPanel";
import ScorePanel from "@/components/ScorePanel";

import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { PlayerState, PreRoundState, RoundState } from "@/lib/utils";
import { Button } from "./components/ui/button";

function App() {
	const [playerStates, setPlayerStates] = useState<PlayerState[] | undefined>(undefined);
	const [roundState, setRoundState] = useState<RoundState | undefined>(undefined)

	const [isDeveloperMenuOpen, setIsDeveloperMenuOpen] = useState<boolean>(false);
	const [isCountdownModalOpen, setIsCountdownModalOpen] = useState<boolean>(false);

	const [countdownState, setCountdownState] = useState<number>(3);

	window.ipcRenderer.on("onUpdatePlayerStates", (event, data: PlayerState[]) => {
		setPlayerStates(data);
	});

	const getPlayerStates = async () => {
		const response: PlayerState[] = await window.ipcRenderer.invoke("onGetPlayerStates");

		if (response) {
			setPlayerStates(response);
		}
	}

	const triggerStartRound = async () => {
		setIsDeveloperMenuOpen(false);

		const response: PreRoundState = await window.ipcRenderer.invoke("onSignalStartRound");

		if (response) {
			setIsCountdownModalOpen(true);

			let countdown = response.countdown;
			const intervalId = setInterval(async () => {
				setCountdownState(countdown);
				countdown--;

				if (countdown < 0) {
					clearInterval(intervalId);
					
					const startResponse: RoundState = await window.ipcRenderer.invoke("onStartRound");
					
					if (startResponse) {
						setIsCountdownModalOpen(false); 
						setCountdownState(3);

						setRoundState(startResponse);
					}
				}
			}, 1000);
		}
	}

	useEffect(() => {
		getPlayerStates();
	}, []);

	return (
		<div className="w-screen h-screen flex flex-col gap-2 items-center justify-between">
			<div className="w-full flex-1 flex flex-col gap-2 items-center justify-between">
				<RoundPanel
					round={roundState?.round}
					timer={roundState?.timer}
					onClick={() => setIsDeveloperMenuOpen(true)}
				/>

				<PlayerPanel
					isTop={true}
					word={playerStates?.[0]?.word}
				/>
				<ScorePanel
					score={0}
				/>
				<PlayerPanel
					isTop={false}
					word={playerStates?.[1]?.word}
				/>
			</div>
			<DonationPanel />
			<Dialog
				open={isDeveloperMenuOpen}
				onOpenChange={setIsDeveloperMenuOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Developer Menu</DialogTitle>
					</DialogHeader>
					<Button
						className="w-full"
						onClick={() => triggerStartRound()}
					>
						Trigger Round Start
					</Button>
				</DialogContent>
			</Dialog>
			<Dialog
				open={isCountdownModalOpen}
				onOpenChange={setIsCountdownModalOpen}
			>
				<DialogContent 
					className="flex p-4 items-center justify-center bg-transparent border-none"
					hideClose={true}
				>
					<span className="text-5xl font-bold text-white">{countdownState}</span>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default App;
