import React from 'react'

import { ReactComponent as FeaturedFileIcon } from "../assets/featured-file.svg";
import { ReactComponent as TrashSvg } from "../assets/trash.svg";

function FileRow({ file, onDelete }) {
    return (
        <div className="d-flex align-items-center justify-content-between w-100 mb-3 pe-4" >
            <div className="d-flex align-items-center gap-3">
                <FeaturedFileIcon />
                <div className="d-flex flex-column">
                    <div className="fs-14 fw-500 text-blue-100">{file?.name}</div>
                    <div className="fs-14 fw-400 text-gray-500">{file?.size}</div>
                </div>
            </div>
            <div>
                <button type="button" onClick={onDelete} className="btn btn-link">
                    <TrashSvg />
                </button>
            </div>
        </div>
    )
}

export default FileRow