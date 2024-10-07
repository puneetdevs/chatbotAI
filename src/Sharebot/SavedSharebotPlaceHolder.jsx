import React from "react";
// @ts-ignore
import { ReactComponent as NoUserFound } from "../assets/No-users-found.svg";

function SavedSharebotPlaceHolder() {
  return (
    <div className="row custom_card_box">
      <div className="col-lg-3 mb-3">
        <div className="saved-sharebot-card">
          <NoUserFound />
          <div className="fs-14 fw-400 stat-card-space">
            You don’t have any saved ShareBots
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedSharebotPlaceHolder;
