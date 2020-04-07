import React from 'react';
import './Button.scss';

interface Props {
    children: string,
    isActive: boolean,
    action: () => void,
}

class Button extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent): void => {
        const { isActive } = this.props;
        
        e.stopPropagation();

        if (isActive) {
            this.props.action();
        }
    }

    render() {
        const { children, isActive } = this.props;

        return (
            <button
                className={`
                    button
                    ${!isActive ? 'is-inactive' : ''}
                `}
                onClick={this.handleClick}
            >
                {children}
            </button>
        );   
    }
}

export default Button;