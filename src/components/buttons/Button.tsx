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
        const { action } = this.props;
        
        e.stopPropagation();

        if (action) {
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
                disabled={!isActive}
            >
                {children}
            </button>
        );   
    }
}

export default Button;