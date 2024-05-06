import React, { useState } from 'react';
import '../index.css';
import { signInUser, signUpUser } from '../firebase/firebase-src';
import { AuthErrorCodes } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignUpOrLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const homeButton = () => {
        return <button
            onClick={(e) => {
                e.preventDefault();
                navigate('/');
            }} style={{position: "fixed", top: 0, left: 0, margin: 10, padding: 10}}
        >
            Home
        </button>
    }

    const onLogin = async () => {
        try {
            await signInUser(email, password);
            setError('');
            navigate('/');
        } catch (e) {
            if (e.code === 'auth/invalid-email') {
                setError("Please enter a valid email address.");
            }
            else if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
                setError("Email already exists. Please try again.");
            }
            else if (e.code === 'auth/weak-password') {
                setError("Password must be longer than six characters.");
            }
            else if (e.code === 'auth/missing-email' || e.code === 'auth/missing-password') {
                setError("Please enter both an email and password.");
            }
            else if (e.code === 'auth/invalid-credential') {
                setError("Invalid email or password. Please try again.");
            }
            else {
                setError(e.code);
            }
        }
    }

    const onSignUp = async () => {
        try {
            await signUpUser(email, password);
            setError('');
            alert('Welcome to Pictogram! Please login with your credentials to begin using the app.');
        } catch (e) {
            if (e.code === 'auth/invalid-email') {
                setError("Please enter a valid email address.");
            }
            else if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
                setError("Email already exists. Please try again.");
            }
            else if (e.code === 'auth/weak-password') {
                setError("Password must be longer than six characters.");
            }
            else if (e.code === 'auth/missing-email' || e.code === 'auth/missing-password') {
                setError("Please enter both an email and password.");
            }
            else if (e.code === 'auth/invalid-credential') {
                setError("Invalid email or password. Please try again.");
            }
            else {
                setError(e.code);
            }
        }
    }

    return (
        <div id='login' className='login-container'>
            <h1>Welcome to Pictogram!</h1>
            <h2>Sign Up / Login</h2>
            <h4>Please enter your credentials below</h4>
            <form className='login-form' onSubmit={e => e.preventDefault()}>
                <div className='form-group'>
                    <label htmlFor='emailInput'>Email</label>
                    <input type='email' id='emailInput' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='passwordInput'>Password</label>
                    <input type='password' id='passwordInput' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
            </form>
            {error && <p className='error-message'>{error}</p>}
            <div className='button-container'>
                <button id='loginButton' onClick={onLogin}>Login</button>
                <button id='signUpButton' onClick={onSignUp}>Sign Up</button>
            </div>
            <div className='home-button'>
                {homeButton()}
            </div>
        </div>
    );    
}

export default SignUpOrLogin;