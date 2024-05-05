import React, { useState } from 'react';
import './App.css';
import { signInUser, signUpUser } from '../firebase/firebase-src';
import { AuthErrorCodes } from 'firebase/auth';

function SignUpOrLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const onLogin = async () => {
        try {
            await signInUser(email, password);
            setError('');
        } catch (e) {
            if (e.code === 'auth/invalid-email') {
                setError("Please enter a valid email address.");
            }
            else if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
                setError("Email already exists. Please try again.");
            }
            else if (e.code === AuthErrorCodes.INVALID_PASSWORD) {
                setError("Password must be longer than six characters.");
            }
            else if (e.code === AuthErrorCodes.MISSING_APP_CREDENTIAL) {
                setError("Please enter both an email and password.");
            }
            else if (e.code === AuthErrorCodes.INVALID_APP_CREDENTIAL) {
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
        } catch (e) {
            if (e.code === 'auth/invalid-email') {
                setError("Please enter a valid email address.");
            }
            else if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
                setError("Email already exists. Please try again.");
            }
            else if (e.code === AuthErrorCodes.INVALID_PASSWORD) {
                setError("Password must be longer than six characters.");
            }
            else if (e.code === AuthErrorCodes.MISSING_APP_CREDENTIAL) {
                setError("Please enter both an email and password.");
            }
            else if (e.code === AuthErrorCodes.INVALID_APP_CREDENTIAL) {
                setError("Invalid email or password. Please try again.");
            }
            else {
                setError(e.code);
            }
        }
    }

    return (
        <div id='login'>
            <h1>Sign Up/Login</h1>
            <h4>Please enter your credentials below</h4>
            <form onSubmit={e => e.preventDefault()}>
                <div className='userInput'>
                    <input type="email" id='emailInput' value={email} onChange={e => setEmail(e.target.value)}/>
                    <label>Email</label>
                </div>
                <div>
                    <input type='password' id='passwordInput' value={password} onChange={e => setPassword(e.target.value)}/>
                    <label>Password</label>
                </div>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button id='loginButton' onClick={onLogin}>Login</button>
            <button id='signUpButton' onClick={onSignUp}>Sign Up</button>
        </div>
    );
}

export default SignUpOrLogin;