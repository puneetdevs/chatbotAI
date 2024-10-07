import React from "react";
import BotCard from "../components/ShareBot/BotCard";
import SavedSharebotPlaceHolder from "./SavedSharebotPlaceHolder";
import ShareBotLoading from "./ShareBotLoading";

function Saved(props) {
	const { sharebots, isLoading } = props;
	if (isLoading) return <ShareBotLoading />;

	if (!sharebots.length) {
		return <SavedSharebotPlaceHolder />;
	}
	return (
		<>
			<div className="row">
				{sharebots.map((bot, index) => (
					<div className="col-lg-3 mb-3" key={index}>
						<BotCard {...props} {...bot} />
					</div>
				))}
			</div>
		</>
	);
}

export default Saved;
