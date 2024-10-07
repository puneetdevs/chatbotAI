import React, { ReactComponent } from "react";
import "./BotCard.scss";
import { ReactComponent as ShareSvg } from "../../assets/share.svg";
import { ReactComponent as TrashSvg } from "../../assets/trash.svg";
import { useNavigate } from "react-router-dom";

function BotCard(props) {
	const {
		isShare = false,
		onShare,
		onDelete,
		id = 1,
		date = "12 September 2023",
		description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
		title = "CreatedShareBot#1",
	} = props;
	const navigate = useNavigate();
	const navigateToChat = () => {
		navigate(`/share/chat/${id}`)
	}
	return (
		<div className="bot-card">
			<div className="body">
				<div className="title" onClick={navigateToChat}> {title} </div>
				<div className="description">{description}</div>
			</div>

			<div className="footer">
				<div className="date">{date}</div>
				<div className="action">
					{isShare && (
						<button type="button" onClick={() => onShare(id)} className="btn btn-link">
							<ShareSvg />
						</button>
					)}
					<button type="button" onClick={() => onDelete(id)} className="btn btn-link">
						<TrashSvg />
					</button>
				</div>
			</div>
		</div>
	);
}

export default BotCard;
