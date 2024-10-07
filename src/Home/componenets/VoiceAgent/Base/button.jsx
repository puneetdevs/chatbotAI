import ScaleLoader from "react-spinners/ScaleLoader";
import Mic from "../../../../assets/mic.png";

const Button = ({ onClick, isLoading, disabled }) => {
  const opacity = disabled ? 0.75 : 1;
  const cursor = disabled ? "not-allowed" : "pointer";

  const Contents = isLoading ? (
    <ScaleLoader
      color="#000"
      height={10}
      width={2.5}
      margin={0.5}
      loading={true}
      size={50}
      css={{ display: "block", margin: "0 auto" }}
    />
  ) : (
    <p style={{ margin: 0, padding: 0 }}><img src={Mic} /></p>
  );

  return (
    <button
      onClick={onClick}
     className="voice-assistant-button"
    >
      {Contents}
    </button>
  );
};

export default Button;
