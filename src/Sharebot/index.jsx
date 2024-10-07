import React, { useState } from "react";
import YourShareBots from "./YourShareBots";
import Saved from "./Saved";
import "./style.css";
import CreateModal from "../components/ShareBot/CreateModal";
import ShareModal from "../components/ShareBot/ShareModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteDocumentById, deleteSavedShareBot, fetchSharedBot } from "../services/document";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

function Sharebot() {
	const [createShareBotShow, setCreateShareBotShow] = useState(false);
	const [shareBotShow, setShareBotShow] = useState(false);
	const [documentId, setDocumnetId] = useState(null);

	const handleCreateBotClose = () => setCreateShareBotShow(false);
	const handleCreateBotShow = () => setCreateShareBotShow(true);

	const handleShareBotClose = () => setShareBotShow(false);
	const handleShareBotShow = () => setShareBotShow(true);

	const queryClient = useQueryClient();

	const deleteBotMutation = useMutation(deleteSavedShareBot, {
		onSuccess: () => {},
	});

	const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery("savedSharedBots", () => fetchSharedBot());
	const savedShareBots = (data?.data?.share.map((d) => d.document) || []).map((b) => ({ ...b, isShare: false, title: b.name, date: format(new Date(b.updated_at), "MM/dd/yyyy") }));
	const yourShareBots = (data?.data?.sharebot || []).map((b) => ({ ...b, isShare: true, title: b.name, date: format(new Date(b.updated_at), "MM/dd/yyyy") }));

	const onSavedDelete = async (id) => {
		deleteSavedShareBot(8)
			.then((res) => {
				queryClient.invalidateQueries("savedSharedBots");
				toast.success("Sharebot deleted Successfully");
			})
			.catch((e) => toast.error(e.message));
	};
	const onDelete = (id) => {
		deleteDocumentById(id)
			.then((res) => {
				queryClient.invalidateQueries("savedSharedBots");
				toast.success("Sharebot deleted Successfully");
			})
			.catch((e) => toast.error(e.message));
	};
	const onShare = (id) => {
		setDocumnetId(id);
		handleShareBotShow();
	};

	return (
		<>
			<div className="sharebot-container">
				<div className="d-flex  flex-column flex-lg-row align-items-lg-center justify-content-between mb-3">
					<div className="d-flex flex-column mb-4 mb-lg-0">
						<div className="fs-30 fw-600 text-blue-100 "> Your Sharebots </div>
						<div className="fs-16 fw-400">Share a Thousand Words in One Screen: Unveil Limitless Information with Ease!</div>
					</div>
					<button onClick={handleCreateBotShow} className="create-sharebot-btn">
						<div className="fs-16 mt-1">
							<Icon icon="ic:baseline-plus" />
						</div>
						<div>Create New ShareBot</div>
					</button>
				</div>
				<YourShareBots isLoading={isLoading} sharebots={yourShareBots} onDelete={onDelete} onShare={onShare} createBot={handleCreateBotShow} />
				<div className="fs-24 fw-600 text-blue-100 mb-3"> Saved ShareBots </div>
				<Saved isLoading={isLoading} sharebots={savedShareBots} onDelete={onSavedDelete} />
			</div>
			<CreateModal show={createShareBotShow} handleClose={handleCreateBotClose} />
			<ShareModal show={shareBotShow} handleClose={handleShareBotClose} id={documentId} />
		</>
	);
}

export default Sharebot;
