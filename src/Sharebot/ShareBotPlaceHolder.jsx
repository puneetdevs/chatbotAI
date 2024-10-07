import React from "react";
import "./style.css";
import { Icon } from "@iconify/react";

function ShareBotPlaceHolder(props) {
	const { createBot } = props;
	return (
		<div className="row">
			<div className="col-lg-3 mb-3">
				<div className="add-sharebot-card" onClick={createBot}>
					<div className="fs-16 fw-400 mb-3"> Add</div>
					<div className="circle-add">
						<Icon icon="ph:plus" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShareBotPlaceHolder;
