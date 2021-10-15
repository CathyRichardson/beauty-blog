import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import axios from 'axios'

function Header() {

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            <button onClick={handleOpenModal}>Sign In</button>
            <ReactModal
                isOpen={showModal}
                contentLabel="Minimal Modal Example"
            >
                <button onClick={handleCloseModal}>Close Modal</button>
            </ReactModal>
        </div>
    );
}

export default Header;