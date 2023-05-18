import React, { ReactNode } from 'react';
import './Overlay.scss';

interface OwnProps {
    id: string,
    children: ReactNode,
    onMouseDown?: () => void,
}

type Props = OwnProps;

const Overlay: React.FC<Props> = (props) => {
    const { id, children, onMouseDown } = props;

    return (
        <div
            id={`overlay-${id}`}
            className='overlay'
            onMouseDown={onMouseDown}
        >
            {children}
        </div>
    );
}

export default Overlay;