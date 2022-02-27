import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function MyGardens() {
    const navigate = useNavigate();
    const onButtonClick = () => {
        navigate('/3d-grid');
    }

    return (
        <div>
            <h1>
                My Gardens
            </h1>
            <Button onClick={onButtonClick}>
                View 3D Preview
            </Button>
        </div>
    )
}

export default MyGardens;
