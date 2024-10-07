import { Button } from 'bootstrap'
import React from 'react'

function Buttons() {
    return (
        <div>
            <button type="button" className="btn btn-primary">Primary</button>
            <button type="button" className="btn btn-danger">Danger</button>
            <button type="button" className="btn btn-link">Link</button>
        </div>
    )
}

export default Buttons