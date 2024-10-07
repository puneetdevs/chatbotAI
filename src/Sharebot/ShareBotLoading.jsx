import React from "react";
import "./style.css";
import { Icon } from "@iconify/react";
import { Spinner } from "reactstrap";
function ShareBotLoading() {
	return (
		<div className="row">
			<div className="col-lg-3 mb-3">
				<div className="add-sharebot-card">
					<Spinner />
				</div>
			</div>
		</div>
	);
}

export default ShareBotLoading;
