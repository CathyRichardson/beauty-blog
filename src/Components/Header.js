import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import axios from 'axios'
import { connect } from 'react-redux';
import { saveUserData, clearUserData } from '../redux/userReducer';
import routes from '../routes';
import Nav from './Nav';
import '../App.scss';


function Header(props) {

    ReactModal.setAppElement('#root');  //sets parent of modal

    //modal states
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    //user states
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(async () => {
        try {
            //How can I keep the username from flickering on page refresh?
            const { data } = await axios.get('/api/auth/user');
            props.saveUserData(data);
        } catch (err) {
            if (err.response.status == 404) {
                console.log('no logged in user found')
            } else {
                console.log(err);
            }
        }
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
            const { data } = await axios.post('/api/auth/register', { username, email, password, isAdmin });
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
                <p className="beauty_logo" >Beauty</p>
                <button onClick={handleOpenSignInModal}>Sign In</button>
                <p>user: {props.user.username}</p>
                <button onClick={handleSignOut}>Sign Out</button>

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
                    <button onClick={handleCloseRegisterModal}>Cancel</button>
                </ReactModal>

                <Nav />
            </header>
            {routes}
        </div>
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