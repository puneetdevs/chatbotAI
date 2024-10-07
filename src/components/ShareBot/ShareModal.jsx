import React from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as QrCode } from "../../assets/qr-code.svg";
import QRCode from "react-qr-code";
const ShareModal = (props) => {
	const { show, handleClose , id} = props;
    const qrUrl = `${window.location.origin}/share/chat/${id}`;

	return (
		<>
			<Modal show={show} onHide={handleClose} animation={true} centered className="sharebot-modal">
				<Modal.Header closeButton>
					<Modal.Title>Share Your Sharebot</Modal.Title>
				</Modal.Header>
				<Modal.Body className="pt-0">
					<div className="mb-4">
						<div className="fs-14 fw-500 text-blue-100 mb-2">Scan QR code</div>
						<div className="qr-code">
						<QRCode value={qrUrl} />
						</div>
					</div>
					<div className="mb-4">
						<div className="fs-14 fw-500 text-blue-100 mb-2">Or, Copy Link below:</div>
						<input type="text" value={qrUrl} disabled className="sharebot-input" />
					</div>
					<button className="create-bot-btn">Create New ShareBot</button>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ShareModal;
