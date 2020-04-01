import React from 'react';
import './Button.scss';

interface DialogProps {
    text: string,

    action: () => void,
}

const Button: React.FC<DialogProps> = (props) => {
    const { text, action } = props;

    return (
        <button></button>
    );
}

export default Button;