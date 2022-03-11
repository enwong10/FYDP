import styled from "styled-components";
import back from "../assets/back.svg";
import home from "../assets/home.svg";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import { Context} from "./Context";

export function TopNavBar({title, component}) {
    const navigate = useNavigate();
    const {tutorialStep, setTutorialStep} = useContext(Context);
    return(
        <PageContainer>
            <div className={'row'}>
                <Back className={'col'}>
                    <div role='button' onClick={() => navigate(-1)}>
                        <img src={back} alt='back'/>
                    </div>
                </Back>
                <Home className={'col'}>
                    <div role='button' onClick={() => {
                        //setTutorialStep(7);
                        navigate('/garden')}}>
                        <img src={home} alt='home'/>
                    </div>
                </Home>
            </div>
            {title && <Title> {title} </Title>}
            {component}
        </PageContainer>
    )
}

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;

    padding: 0px 12px;

    display: flex;
    flex-direction: column;
`

const Back = styled.div`
    padding: 12px;
    text-align: left;
`;

const Home = styled.div`
    padding: 12px;
    text-align: right;
`;

const Title = styled.h1`
    text-align: center;
`;
