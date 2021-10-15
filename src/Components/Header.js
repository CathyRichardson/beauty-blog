import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import axios from 'axios'


function Header() {

    ReactModal.setAppElement('#root');

    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleOpenSignInModal = () => {
        setShowSignInModal(true);
    }

    const handleCloseSignInModal = () => {
        setShowSignInModal(false);
    }

    const handleOpenRegisterModal = () => {
        setShowRegisterModal(true);
        setShowSignInModal(false);
    }

    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
    }


    return (
        <div>
            <button onClick={handleOpenSignInModal}>Sign In</button>
            <ReactModal
                isOpen={showSignInModal}
                contentLabel="Sign In Modal"
                onRequestClose={handleCloseSignInModal}
            >
                <h2>Sign In</h2>
                <button onClick={handleCloseSignInModal}>Close</button>
                <button onClick={handleOpenRegisterModal}>Register</button>
            </ReactModal>
            
            <ReactModal
                isOpen={showRegisterModal}
                contentLabel="Register Modal"
                onRequestClose={handleCloseRegisterModal}
            >
                <h2>Register</h2>
                <button onClick={handleCloseRegisterModal}>Close</button>
            </ReactModal>
        </div>
    );
}

export default Header;