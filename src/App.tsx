import { useState } from "react";

import DonationPanel from "./components/DonationPanel";
import PlayerPanel from "./components/PlayerPanel";
import RoundPanel from "./components/RoundPanel";
import ScorePanel from "./components/ScorePanel";

function App() {
	return (
		<div className="w-screen h-screen flex flex-col gap-2 items-center justify-between">
			<div className="w-full flex-1 flex flex-col gap-2 items-center justify-between">
				<RoundPanel
					round={1}
					timer={30}
				/>
				<PlayerPanel
					isTop={true}
					word="test"
				/>
				<ScorePanel 
					score={0}
				/>
				<PlayerPanel
					isTop={false}
					word="test"
				/>
			</div>
			<DonationPanel />
		</div>
	)
}

export default App;
