import React, { ReactNode } from 'react';
import './Button.scss';

interface OwnProps {
    id?: string,
    children: string | ReactNode,
    isActive: boolean,
    action: () => void,
}

type Props = OwnProps;

class Button extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent): void => {
        const { isActive, action } = this.props;
        
        e.stopPropagation();

        if (isActive) {
            action();
        }
    }

    render() {
        const { id, children, isActive } = this.props;

        return (
            <button
                id={id}
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