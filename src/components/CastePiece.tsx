import React from 'react';
import { Caste, Size2D, Coordinates2D } from '../types/GameTypes';
import './CastePiece.scss';
import { ReactComponent as KatanaIcon } from '../icons/katana.svg';
import { ReactComponent as BuddhaIcon } from '../icons/buddha.svg';
import { ReactComponent as RiceIcon } from '../icons/rice.svg';

interface CastePieceProps {
    position: Coordinates2D,
    size: Size2D,
    caste: Caste,
}

const CastePiece: React.FC<CastePieceProps> = (props) => {
    const { position, size, caste } = props;
    const { x, y } = position;
    const { width, height } = size;

    const svgProps = {
        className: 'board-tile-caste-piece',
        width: width,
        height: height,
        x: x - width / 2,  // Center in x
        y: y - height / 2, // Center in y
    }

    switch (caste) {
        case Caste.Military:
            return <KatanaIcon {...svgProps} />
        case Caste.Religion:
            return <BuddhaIcon {...svgProps} />
        case Caste.Commerce:
            return <RiceIcon {...svgProps} />
        default:
            throw new Error('Wrong caste.')
    }
}

export default CastePiece;