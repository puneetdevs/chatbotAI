import React from "react";
import BotCard from "../components/ShareBot/BotCard";
import ShareBotPlaceHolder from "./ShareBotPlaceHolder";
import ShareBotLoading from "./ShareBotLoading";

function YourShareBots(props) {
	const { sharebots, isLoading } = props;
	if (isLoading)
		return <ShareBotLoading />

	if (!sharebots.length) {
		return <ShareBotPlaceHolder {...props} />
	}

	return (

		<div className="row custom_card_box">
			{sharebots.map((bot, index) => (
				<div className="col-sm-3 mb-3" key={index}>
					<BotCard {...props} {...bot} />
				</div>
			))}
		</div>



	);
}

export default YourShareBots;
