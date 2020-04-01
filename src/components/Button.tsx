import React from 'react';
import './Button.scss';

interface DialogProps {
    children: string,
    action: () => void,
}

class Button extends React.Component<DialogProps, {}> {

    handleClick = (e: React.MouseEvent): void => {
        e.stopPropagation();

        this.props.action();
    }

    render() {
        const { children } = this.props;

        return (
            <button className='button' onClick={this.handleClick}>
                {children}
            </button>
        );   
    }
}

export default Button;