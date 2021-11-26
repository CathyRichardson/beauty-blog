import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import axios from 'axios'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveUserData, clearUserData } from '../redux/userReducer';
import Nav from './Nav';
import './Header.scss';
import logo from '../images/BeautyLogo.png';


function Header(props) {

    ReactModal.setAppElement('#root');  //sets parent of modal

    //modal states
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showSetAdminModal, setShowSetAdminModal] = useState(false);
    //user states
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {

        const getData = async () => {
            try {
                const { data } = await axios.get('/api/auth/user');
                props.saveUserData(data);
            } catch (err) {
                if (err.response.status !== 404) {
                    console.log(err);
                }
            }
        }

        getData();
    }, []);

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
            const { data } = await axios.post('/api/auth/login', { username, password });
            props.saveUserData(data);
            handleCloseSignInModal();
        } catch (err) {
            if (err.isAxiosError) {
                alert(err.response.request.responseText);
            } else {
                alert(err);
            }
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
        setShowRegisterModal(false);
    }

    const handleRegister = async () => {
        try {
            const { data } = await axios.post('/api/auth/register', { username, email, password });
            props.saveUserData(data);
            handleCloseRegisterModal();
        } catch (err) {
            if (err.isAxiosError) {
                alert(err.response.request.responseText);
            } else {
                alert(err);
            }
        }
    }

    const handleOpenSetAdminModal = () => {
        setShowSetAdminModal(true);
    }

    const handleCloseSetAdminModal = () => {
        setUsername('');
        setShowSetAdminModal(false);
    }

    const handleSetAdmin = async (isSetToAdmin) => {
        try {
            if (!username) {
                alert("Username is required")
            } else if (props.user.username === username) {
                alert("Cannot change the admin state of the currently logged in user");
            } else {
                await axios.put(`/api/auth/user/${username}?admin=${isSetToAdmin}`);
                handleCloseSetAdminModal();
            }
        } catch (err) {
            if (err.isAxiosError) {
                alert(err.response.request.responseText);
            } else {
                alert(err);
            }
        }
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

    const handleSignOut = async () => {
        try {
            await axios.post('/api/auth/logout');
            props.clearUserData();
        } catch (err) {
            if (err.isAxiosError) {
                alert(err.response.request.responseText);
            } else {
                alert(err);
            }
        }
    }

    return (
        <div>
            <header>
                <div className="header-flex">
                    <Link to='/beauty'><img src={logo} alt="beauty logo" className="beauty-logo" /></Link>
                    <div className="sign-in-flex">
                        <button onClick={handleOpenSignInModal} className={`sign-in  ${props.user.username ? 'sign-in-hidden' : ''}`} >Sign In</button>
                        <p className={`signed-in-user  ${props.user.username ? '' : 'sign-in-hidden'}`}>Welcome: {props.user.username}</p>
                        <button
                            onClick={handleOpenSetAdminModal}
                            className={`sign-in  ${props.user.username && props.user.isAdmin ? '' : 'sign-in-hidden'}`}>Admin
                        </button>
                        <button onClick={handleSignOut} className={`sign-in  ${props.user.username ? '' : 'sign-in-hidden'}`}>Sign Out</button>
                    </div>
                </div>

                <ReactModal
                    isOpen={showSignInModal}
                    contentLabel="Sign In Modal"
                    onRequestClose={handleCloseSignInModal}
                    className="modal"
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
                    <hr />
                    <button onClick={handleOpenRegisterModal}>Register</button>
                    <button onClick={handleCloseSignInModal}>Cancel</button>
                </ReactModal>

                <ReactModal
                    isOpen={showRegisterModal}
                    contentLabel="Register Modal"
                    onRequestClose={handleCloseRegisterModal}
                    className="modal"
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
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={handleCloseRegisterModal}>Cancel</button>
                </ReactModal>

                <ReactModal
                    isOpen={showSetAdminModal}
                    contentLabel="Set Admin Modal"
                    onRequestClose={handleCloseSetAdminModal}
                    className="modal"
                >
                    <h2>Set User Admin</h2>
                    <p>Set the Admin permissions of a registered user</p>
                    <label>
                        Username
                        <input type="text" onChange={handleUsernameChange} value={username} />
                    </label>
                    <button onClick={() => handleSetAdmin(true)}>Set as Admin</button>
                    <button onClick={() => handleSetAdmin(false)}>Set as Not Admin</button>
                    <hr />
                    <button onClick={handleCloseSetAdminModal}>Cancel</button>
                </ReactModal>

                <Nav />
            </header>
        </div >
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    saveUserData,
    clearUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);