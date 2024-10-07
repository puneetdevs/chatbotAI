// @ts-nocheck
import React, { useCallback, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as UploadIcon } from "../../assets/Featured-icon.svg";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useUserAuth from "../../hooks/useUserAuth";
import Dropzone from "react-dropzone";
import uploadToS3 from "../../utils/uploadToS3";
import FileRow from "../FileRow";
import getFileMB from "../../utils/getFileMB";
import { toast } from "react-toastify";
import { createDocument } from "../../services/document";
import { DOCUMENT_TYPE } from "../../utils/constants";
import { useQueryClient } from "react-query";


const CreateModal = (props) => {
	const { show, onSave, handleClose } = props;
	const { permissions } = useUserAuth();
	const { shareBotFileSize, isWhiteLabelShareBot } = permissions;

	const sharebotSchema = Yup.object().shape({
		file: Yup.string()
			.required('Required'),
		name: Yup.string()
			.min(2, 'Too Short!')
			.max(5000, 'Too Long!')
			.required('Required'),
		description: Yup.string()
			.min(2, 'Too Short!')
			.max(5000, 'Too Long!')

			.required('Required'),
		welcome_message: Yup.string()
			.min(2, 'Too Short!')
			.max(5000, 'Too Long!')

			.required('Required'),
		...(isWhiteLabelShareBot ? {
			avatar: Yup.string()
				.required('Required'),
		} : {}),

	});
	const queryClient = useQueryClient();


	const handleSubmit = (values) => {

		Promise.all([
			uploadToS3(values.file),
			uploadToS3(values.avatar),
		]).then(([path, avatar]) => {
			values = { ...values, path, avatar, type: DOCUMENT_TYPE.sharebot };

			return createDocument(values)
		}).then((res) => {
			onSave && onSave();
			handleClose();
			toast.success('Sharebot created Successfully')
			queryClient.invalidateQueries("savedSharedBots");

		}).catch(err => {
			toast.error(err)
		})


	}
	return (
		<>
			<Modal show={show} onHide={handleClose} animation={true} centered className="sharebot-modal">
				<Modal.Header closeButton>
					<Modal.Title>Create New Sharebot</Modal.Title>
				</Modal.Header>
				<Modal.Body className="pt-0">
					<Formik
						initialValues={{
							file: null,
							name: '',
							description: '',
							welcome_message: '',
							...(isWhiteLabelShareBot ? { avatar: null } : {}),
						}}
						validationSchema={sharebotSchema}
						onSubmit={handleSubmit}
					>
						{({ errors, touched, isSubmitting, isValid, values, setFieldValue }) => (
							<Form>
								<div className="mb-4">
									<div className="fs-14 fw-500 text-blue-100 mb-2">Document Upload</div>
									{!values?.file ? <Dropzone onDrop={(acceptedFiles) => {

										const file = acceptedFiles[0];
										if (getFileMB(file.size) > shareBotFileSize) {
											return toast.error("File size is too large! Please upgrade your package");
										}
										setFieldValue('file', file)
									}}
									// accept="pdf/*"
									>
										{({ getRootProps, getInputProps }) => (
											<div {...getRootProps()} className="sharebot-uploader">
												<UploadIcon />
												<div className="d-flex gap-1 mt-2">
													<div className="fs-14 fw-600 text-blue-600">Click to upload</div>
													<div className="fs-14 fw-400 text-blue-100">or drag and drop</div>
												</div>
												<div className="fs-12 fw-400">SVG, PNG, JPG or GIF (max. 800x400px)</div>
												<input {...getInputProps()} type="file" />
											</div>
										)}
									</Dropzone> :
										(<FileRow file={values.file} onDelete={() => setFieldValue('file', null)} />)
									}
									{errors.file && touched.file ? (
										<div className="text-danger">{errors.file}</div>
									) : null}
								</div>
								<div className="mb-4">
									<div className="fs-14 fw-500 text-blue-100 mb-2">Name</div>
									<Field
										type="text"
										placeholder="What will your Sharebot's name be?"
										name="name"
										className={`sharebot-input ${errors.name && touched.name ? 'is-invalid' : ''}`}
										disabled={isSubmitting}
									/>
									{errors.name && touched.name ? (
										<div className="text-danger">{errors.name}</div>
									) : null}
								</div>
								<div className="mb-4">
									<div className="fs-14 fw-500 text-blue-100 mb-2">Short Description (max 20 words)</div>
									<Field as="textarea"
										placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
										name="description"
										className={`sharebot-textarea ${errors.description && touched.description ? 'is-invalid' : ''}`}
										rows="6"
										disabled={isSubmitting}
									></Field>
									{errors.description && touched.description ? (
										<div className="text-danger">{errors.description}</div>
									) : null}
								</div>
								<div className="mb-4">
									<div className="fs-14 fw-500 text-blue-100 mb-2">Welcome Message</div>
									<Field
										type="text"
										placeholder="This message will show when the user opens chat..."
										name="welcome_message"
										className={`sharebot-input ${errors.welcome_message && touched.welcome_message ? 'is-invalid' : ''}`}
										disabled={isSubmitting}
									/>
									{errors.welcome_message && touched.welcome_message ? (
										<div className="text-danger">{errors.welcome_message}</div>
									) : null}
								</div>

								{isWhiteLabelShareBot && (


									<>
										{!values?.avatar ? <Dropzone onDrop={(acceptedFiles) => {

											const file = acceptedFiles[0];
											if (getFileMB(file.size) > shareBotFileSize) {
												return toast("File size is too large! Please upgrade your package");
											}
											setFieldValue('avatar', file)
										}}
										// accept="pdf/*"
										>
											{({ getRootProps, getInputProps }) => (

												<div className="mb-4 mt-5">
													<div {...getRootProps()} className="d-flex align-items-center justify-content-between">
														<div className="fs-14 fw-500 text-blue-100">Avatar Image</div>
														<div className="d-flex align-items-center gap-2 avatar-uploader position-relative">
															<UploadIcon />
															<input {...getInputProps()} type="file" disabled={isSubmitting} />
															<div className="fs-16 fw-400 text-blue-600">Upload Image</div>
														</div>
													</div>
												</div>
											)}
										</Dropzone> :
											(<FileRow file={values.avatar} onDelete={() => setFieldValue('avatar', null)} />)
										}
										{errors.avatar && touched.avatar ? (
											<div className="text-danger">{errors.avatar}</div>
										) : null}
									</>
								)}

								<button type="submit" className="create-bot-btn" disabled={isSubmitting}>
									{isSubmitting ? 'Submitting...' : 'Create New ShareBot'}
								</button>
							</Form>
						)}
					</Formik>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CreateModal;
