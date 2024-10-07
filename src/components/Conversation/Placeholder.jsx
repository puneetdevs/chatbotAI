import React from "react";
import { ReactComponent as SunSvg } from "../../assets/sun.svg";
import { ReactComponent as StormSvg } from "../../assets/storm.svg";
import { ReactComponent as AlertSvg } from "../../assets/alert.svg";
import "./placeholder.css";

function Placeholder(props) {
	const { onSend, docPreview = false, placeholderContainer = "", classes = "" } = props;
	const onTitleClick = (title) => {
		onSend(title);
	};
	return (
		<div className={`d-flex flex-column placeholder-container justify-content-center ${placeholderContainer} ${classes[0]}`}>
			<div className="primary-content mb-4 mb-lg-0">
				<h1 className="title">AI Chat</h1>
				<div className="description">Engage with advanced chatbot for insightful, context-aware conversations powered by GPT 4 or 3.5</div>
			</div>
			{/* <div className={`placeholder-content placeholder-content-prev ${docPreview ? "d-flex" : ""} ${classes[1]}`}>
				<div className="w-100">
					<div className="icon-with-title" onClick={() => onTitleClick("Examples")}>
						<SunSvg />
						<div className="title">Examples</div>
					</div>
					<div className="placeholder-card">"Explain quantum computing in simple terms" →</div>
					<div className="placeholder-card">"Got any creative ideas for a 10 year old’s birthday?" →</div>
					<div className="placeholder-card">"How do I make an HTTP request in Javascript?" →</div>
				</div>
				<div className="w-100">
					<div className="icon-with-title" style={{ marginBottom: "10px" }} onClick={() => onTitleClick("Capabilities")}>
						<StormSvg />
						<div className="title">Capabilities</div>
					</div>
					<div className="placeholder-card">Remembers what user said earlier in the conversation</div>
					<div className="placeholder-card">Allows user to provide follow-up corrections</div>
					<div className="placeholder-card">Trained to decline inappropriate requests</div>
				</div>
				<div className="w-100">
					<div className="icon-with-title" onClick={() => onTitleClick("Limitations")}>
						<AlertSvg />
						<div className="title">Limitations</div>
					</div>
					<div className="placeholder-card">May occasionally generate incorrect information</div>
					<div className="placeholder-card">May occasionally produce harmful instructions or biased content</div>
					<div className="placeholder-card">Limited knowledge of world and events after 2021</div>
				</div>
			</div> */}
		</div>
	);
}

export default Placeholder;
