import { Popover as BootstrapPopover } from 'react-bootstrap';


function Popover(props, content) {
    return (<BootstrapPopover {...props}
        style={{
            backgroundColor: '#28A745',
            color: 'white',
            border: "none",
            textAlign: 'center',
            ...props.style,
        }}>
        {content}
    </BootstrapPopover>)
}

export default Popover
