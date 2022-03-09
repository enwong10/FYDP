import styled from "styled-components";
import back from "../assets/back.svg";
import home from "../assets/home.svg";
import React from "react";
import {useNavigate} from "react-router-dom";

export function TopNavBar({title, component}) {
    const navigate = useNavigate();
    return(
        <div>
            <div className={'row'}>
                <Back className={'col'}>
                    <div role='button' onClick={() => navigate(-1)}>
                        <img src={back} alt='back'/>
                    </div>
                </Back>
                <Home className={'col'}>
                    <div role='button' onClick={() => navigate('/garden')}>
                        <img src={home} alt='home'/>
                    </div>
                </Home>
            </div>
            {title && <Title> {title} </Title>}
            {component}
         </div>
    )
}

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
