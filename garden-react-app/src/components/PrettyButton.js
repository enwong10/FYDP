
import Button from 'react-bootstrap/Button';

function PrettyButton({ content, style, onClick }) {
    return (<Button
        style={{
            color: '#FFFFFF',
            backgroundColor: "#28A745",
            borderColor: "transparent",
            margin: "1em",
            ...style
        }}
        onClick={onClick}>
        {content}
    </Button>);
}

export default PrettyButton