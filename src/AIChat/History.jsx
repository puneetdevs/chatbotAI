// @ts-nocheck
import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";

function History(props) {
	const navigate = useNavigate();
	const historyScrollRef = useRef(null);
	const { onClearClick, onDeleteClick, chatHistory, conversation_id } = props;

	const [historyShow, setHistoryShow] = useState(false);

	const handleHistoryClose = () => setHistoryShow(false);
	const handleHistoryShow = () => setHistoryShow(true);

	const onNewClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		navigate(`/chat`);
	};

	const onConversationClick = (e, id) => {
		e.stopPropagation();
		e.preventDefault();
		navigate(`/chat/${id}`);
	};

	const onDelete = (e, id) => {
		e.stopPropagation();
		e.preventDefault();
		onDeleteClick(id);
	};

	useEffect(() => {
		if (historyScrollRef?.current) {
			// @ts-ignore
			historyScrollRef?.current?.recalculate();
		}
	}, [historyScrollRef]);

	return (
		<>
			<div className="d-none d-lg-block">
				<div className="chat-history">
					<button onClick={onNewClick} className="new-chat-btn fff">
						<div className="fs-14 mt-1">
							<Icon icon="ic:baseline-plus"></Icon>
						</div>
						<div className="fs-14 fw-400">New Chat</div>
					</button>
					<h6 className="history-title">History</h6>
					<SimpleBar ref={historyScrollRef} forceVisible="y" style={{ maxHeight: 'calc(100vh - 239px)' }} autoHide={false}>
						<ul className="history-items">
							{chatHistory?.map((item, index) => {
								return (
									<li className={parseInt(conversation_id) === item.conversation_id ? "active" : ""} onClick={(e) => onConversationClick(e, item.conversation_id)} key={item.conversation_id}>
										<div className="d-inline-flex">
											<Icon icon="circum:chat-1"></Icon>
										</div>
										<a className="pointer">{item.subject}</a>
										<button onClick={(e) => onDelete(e, item.conversation_id)} className="delete-chat-btn">
											<div className="mt-1">
												<Icon icon="ph:trash"></Icon>
											</div>
										</button>
									</li>
								);
							})}
						</ul>
					</SimpleBar>
					<button onClick={onClearClick} className="clear-chat-btn">
						<div>
							<Icon icon="ph:trash"></Icon>
						</div>
						<div>Clear Conversation</div>
					</button>
				</div>
			</div>
			<div className="d-lg-none d-block">
				<a className="pointer fs-20 d-inline-block toggle-history-btn" onClick={handleHistoryShow}>
					<Icon icon="material-symbols:history"></Icon>
				</a>
			</div>

			<Offcanvas show={historyShow} onHide={handleHistoryClose} className="mob-history">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title></Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className="position-relative">
					<div className="chat-history">
						<button onClick={onNewClick} className="new-chat-btn">
							<div className="fs-16 mt-1">
								<Icon icon="ic:baseline-plus"></Icon>
							</div>
							<div className="fs-14 fw-400">New Chat</div>
						</button>
						<h6 className="history-title">History</h6>
						<SimpleBar ref={historyScrollRef} forceVisible="y" style={{ maxHeight: 500 }} autoHide={false}>
							<ul className="history-items">
								{chatHistory?.map((item, index) => {
									return (
										<li
											className={parseInt(conversation_id) === item.conversation_id ? "active" : ""}
											onClick={(e) => {
												onConversationClick(e, item.conversation_id);
												handleHistoryClose();
											}}
											key={item.conversation_id}>
											<div className="d-inline-flex">
												<Icon icon="circum:chat-1"></Icon>
											</div>
											<a className="pointer">{item.subject}</a>
											<button onClick={(e) => onDelete(e, item.conversation_id)} className="delete-chat-btn">
												<div className="mt-1">
													<Icon icon="ph:trash"></Icon>
												</div>
											</button>
										</li>
									);
								})}
							</ul>
						</SimpleBar>
						<button onClick={onClearClick} className="clear-chat-btn">
							<div>
								<Icon icon="ph:trash"></Icon>
							</div>
							<div>Clear Conversation</div>
						</button>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default History;
