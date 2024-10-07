import React from "react";

const AudioCard = ({ avatarSrc, title,sector, description, subtitle, icon, audioSrc }) => {
  return (
    <li className="card">
      <div className="card-path-img">
      <div className="card-path-img-card">
     <img src={avatarSrc} alt="card-img" className="avatar_img" />
     </div>
     <div className="card-path-content">
     <h4>{title}</h4>
      <p>{sector}</p>
      <h6>{subtitle}</h6>
      </div>
        </div>
      <div className="icon_box table">
        <h5 className="flex gap-2 items-start">
        {icon}
        {description}
        </h5>
        
      </div>
      <div className="card-bottom">
      <audio controls className="w-full">
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </li>
  );
};

export default AudioCard;
