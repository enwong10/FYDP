import styled from "styled-components";
import back from "../assets/back.svg";
import home from "../assets/home.svg";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import { OverlayTrigger } from "react-bootstrap";
import Popover from "./Popover";


export function TopNavBar({ title, component }) {
    const navigate = useNavigate();
    const { tutorialStep, setTutorialStep, nextTutorialStep } = useContext(Context);
    const [showPopover, setShowPopover] = useState(false);

    useEffect(() => {
        if (tutorialStep > 0) setShowPopover(true)
    }, [tutorialStep])

    return (
        <PageContainer>
            <ActionButtonContainer>
                <div role='button' onClick={() => navigate(-1)}>
                    <img src={back} alt='back' />
                </div>
                <div className="d-flex flex-row align-items-center">
                {tutorialStep > 0 && tutorialStep < 15 && <div role='button' className="mx-3 text-decoration-underline" onClick={() => setTutorialStep(0)}>
                        Exit Tutorial
                    </div>
                }
                 <OverlayTrigger
                    placement="bottom"
                    overlay={(p) => Popover(p, 'To continue to another feature, navigate back home')}
                    show={showPopover && (tutorialStep === 7 || tutorialStep === 13)}
                >
                    <div role='button' onClick={() => {
                        if (tutorialStep === 7 || tutorialStep === 13) nextTutorialStep();
                        navigate('/garden')
                    }}>
                        <img src={home} alt='home' />
                    </div>
                </OverlayTrigger>
                </div>
            </ActionButtonContainer>
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


const Title = styled.h1`
    text-align: center;
`;

const ActionButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > div {
        padding: 12px 0;
    }
`
