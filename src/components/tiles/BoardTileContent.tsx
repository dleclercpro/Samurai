import React from 'react';
import { Coordinates2D, Caste } from '../../types/GameTypes';
import './BoardTileContent.scss';
import { getPositionInHexagon } from '../../lib';
import TileIcon from './TileIcon';
import { TILE_SIZE } from '../../config';

interface OwnProps {
    position: Coordinates2D,
    rotation: number,
    castes: Caste[],
}

type Props = OwnProps;

const BoardTileContent: React.FC<Props> = (props) => {
    const { castes, rotation } = props;
    const { width, height } = TILE_SIZE;
    const center = { x: width / 2, y: height / 2 };
    const pieceSize = { width: width / 3, height: height / 3};
    
    return (
        <g
            className='board-tile-component-content'
            transform={`rotate(${rotation} ${center.x} ${center.y})`}
        >
            {castes.map((type: Caste, index: number) => {
                const position = getPositionInHexagon(index, castes.length, TILE_SIZE);

                return (
                    <TileIcon
                        key={`tile-icon-${index}`}
                        position={position}
                        size={pieceSize}
                        type={type}
                    />
                );
            })}
        </g>
    );
}

export default BoardTileContent;