import React, { useState } from "react";
import SinglePlaceHolder from "./SinglePlaceHolder";
import SingleChat from "./SingleChat";
import "./style.css";
import uploadToS3 from "../utils/uploadToS3";
import { createDocument, deleteDocumentById, fetchSingle } from "../services/document";
import { useQuery, useQueryClient } from "react-query";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";

function Single() {
	const queryClient = useQueryClient();
	const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery("singleDoc", () => fetchSingle());
	const document = data?.data || null;

	if (isLoading)
		return (
			<div className="d-flex items-center h-100 justify-center">
				<div className="multiple-doc-empty">
					<Spinner />
				</div>
			</div>
		);
	return document ? <SingleChat document={document} /> : <SinglePlaceHolder />;
}

export default Single;
