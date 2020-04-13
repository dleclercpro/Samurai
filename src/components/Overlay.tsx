import React, { ReactNode } from 'react';
import './Overlay.scss';

interface OwnProps {
    id: string,
    children: ReactNode,
    onClick: () => void,
}

type Props = OwnProps;

const Overlay: React.FC<Props> = (props) => {
    const { id, children, onClick } = props;

    return (
        <div
            id={`overlay-${id}`}
            className='overlay'
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default Overlay;