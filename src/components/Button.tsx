import React from 'react';
import './Button.scss';

interface Props {
    children: string,
    action: () => void,
}

class Button extends React.Component<Props, {}> {

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