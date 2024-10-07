import React from "react";
import Modal from "react-bootstrap/Modal";

function DeleteWorkspace(props) {
  const { show, handleClose, workspace, onSuccess } = props;

  return (
    <Modal show={show} onHide={handleClose} centered className="sharebot-modal">
      <Modal.Header closeButton>
        <Modal.Title>Delete Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        Are you sure you want to delete <b>{workspace.title}</b> workspace?
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onSuccess} className="btn btn-primary">
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteWorkspace;
