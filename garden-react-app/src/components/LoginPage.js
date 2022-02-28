import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from '../assets/logo.svg'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onLoginClick = () => {
        if (username === 'user@example.com' && password === 'password') 
        navigate('/my-gardens');
    }

    return(
        <LoginMainContainer>
            <img src={logo} alt='Green Thumb' className="m-auto"/>
            <LoginInputContainer>
                <input
                    className="mb-2"
                    placeholder='Email Address'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="mb-4"
                    placeholder='Password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    className="btn btn-success mb-2"
                    onClick={onLoginClick}>
                        Login
                    </button>
                <button 
                    className="btn btn-outline-success mb-4">
                        Sign Up
                    </button>
            </LoginInputContainer>
        </LoginMainContainer>
    )
}

const LoginMainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`

const LoginInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 18px;

    input, button {
        width: 80%;
        max-width: 400px;
    }
`

export default LoginPage;
