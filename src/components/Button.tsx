import React, { ReactNode } from 'react';
import './Button.scss';

interface OwnProps {
    id?: string,
    type?: string,
    action?: () => void,
    children: string | ReactNode,
    isActive: boolean,
}

type Props = OwnProps;

class Button extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent): void => {
        const { isActive, action } = this.props;
        
        e.stopPropagation();

        if (!isActive) {
            e.preventDefault();
        }

        if (isActive && action) {
            action();
        }
    }

    render() {
        const { id, type, children, isActive } = this.props;
        const isSubmit = type === 'submit';

        return (
            <button
                id={id}
                type={isSubmit ? 'submit' : 'button'}
                className={`button ${!isActive ? 'is-inactive' : ''}`}
                onClick={this.handleClick}
            >
                {children}
            </button>
        );   
    }
}

export default Button;