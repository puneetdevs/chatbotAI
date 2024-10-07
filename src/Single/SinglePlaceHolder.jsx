import React, { useState } from "react";
import Upload from "../components/Upload";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import uploadToS3 from "../utils/uploadToS3";
import { DOCUMENT_TYPE } from "../utils/constants";
import { createDocument } from "../services/document";

function SinglePlaceHolder(props) {
	const {  } = props;
	const queryClient = useQueryClient();
	const [isUploading, setIsUplaoding] = useState(false);
	const [file, setFile] = useState(null);

	const onUpload = (key) => {
		onCreate(key);
	};

	const onCreate = async (file) => {
		if (!file) {
			return;
		}
		setIsUplaoding(true)
		try {
			const path = await uploadToS3(file);

			const values = { name: file.name, path, type: DOCUMENT_TYPE.single };

			const response = await createDocument(values);
			setIsUplaoding(false)
			setFile(null);
			queryClient.invalidateQueries('singleDoc');

			toast.success('Sharebot created Successfully')
		} catch (error) { 
			toast.error(error)

		}

	}

	return (
		<>
			<div className="single-placeholder-container">
				<div className="fs-30 fw-600 text-blue-100">Single Document</div>
				<div className="fs-16 fw-400 text-gray-500 mb-4">Start chat by uploading a supported file, to have access to split screen mode with ChatGPT. </div>
				<Upload onUploadSuccess={onUpload} onCreateClick={onCreate} uploading={isUploading} {...props} file={file} setFile={setFile}  />
			</div>
		</>
	);
}

export default SinglePlaceHolder;
