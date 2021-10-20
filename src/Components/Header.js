import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import axios from 'axios'
import { connect } from 'react-redux';
import { saveUserData } from '../redux/userReducer';


function Header(props) {

    ReactModal.setAppElement('#root');

    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleOpenSignInModal = () => {
        setShowSignInModal(true);
    }

    const handleCloseSignInModal = () => {
        setUsername('');
        setPassword('');
        setShowSignInModal(false);
    }

    const handleSignIn = async () => {
        try {
            const user = await axios.post('/api/auth/login', { username, password });
            props.saveUserData(user.data);
            handleCloseSignInModal();
        } catch (err) {
            alert(err); 
        }
    }

    const handleOpenRegisterModal = () => {
        setShowRegisterModal(true);
        handleCloseSignInModal();
    }

    const handleCloseRegisterModal = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setIsAdmin(false);
        setShowRegisterModal(false);
    }

    const handleUsernameChange = (event) => {
        const { value } = event.target;
        setUsername(value);
    }

    const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
    }

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    }

    const handleIsAdminChange = (event) => {
        const { checked } = event.target;
        setIsAdmin(checked);
    }

    const handleRegister = async () => {
        try {
            const user = await axios.post('/api/auth/register', { username, email, password, isAdmin });
            props.saveUserData(user.data);
            handleCloseRegisterModal();
        } catch (err) {
            alert(err);
        }
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
                <label>
                    Username
                    <input type="text" onChange={handleUsernameChange} value={username} />
                </label>
                <label>
                    Password
                    <input type="password" onChange={handlePasswordChange} value={password} />
                </label>
                <button onClick={handleSignIn}>Sign In</button>
                <button onClick={handleOpenRegisterModal}>Register</button>
                <button onClick={handleCloseSignInModal}>Cancel</button>
            </ReactModal>

            <ReactModal
                isOpen={showRegisterModal}
                contentLabel="Register Modal"
                onRequestClose={handleCloseRegisterModal}
            >
                <h2>Register</h2>
                <label>
                    Username
                    <input type="text" onChange={handleUsernameChange} value={username} />
                </label>
                <label>
                    Email
                    <input type="email" onChange={handleEmailChange} value={email} />
                </label>

                <label>
                    Password
                    <input type="password" onChange={handlePasswordChange} value={password} />
                </label>
                <label>
                    I am an Admin
                    <input type="checkbox" onChange={handleIsAdminChange} value={isAdmin} />
                </label>
                <button onClick={handleRegister}>Register</button>
                <button onClick={handleCloseRegisterModal}>Close</button>
            </ReactModal>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    saveUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);