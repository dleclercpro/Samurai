import React from 'react';
import { TileType, Size2D, Coordinates2D } from '../types/GameTypes';
import './TileIcon.scss';
import { ReactComponent as KatanaIcon } from '../icons/katana.svg';
import { ReactComponent as BuddhaIcon } from '../icons/buddha.svg';
import { ReactComponent as RiceIcon } from '../icons/rice.svg';
import { ReactComponent as KnightIcon } from '../icons/knight.svg';
import { ReactComponent as BoatIcon } from '../icons/boat.svg';

interface Props {
    position: Coordinates2D,
    size: Size2D,
    type: TileType,
}

const TileIcon: React.FC<Props> = (props) => {
    const { position, size, type } = props;
    const { x, y } = position;
    const { width, height } = size;

    const svgProps = {
        className: 'tile-icon',
        width: width,
        height: height,
        x: x - width / 2,  // Center in x
        y: y - height / 2, // Center in y
    }

    switch (type) {
        case TileType.Military:
            return (<KatanaIcon {...svgProps} />);
        case TileType.Religion:
            return (<BuddhaIcon {...svgProps} />);
        case TileType.Commerce:
            return (<RiceIcon {...svgProps} />);
        case TileType.Joker:
            return (<KnightIcon {...svgProps} />);
        case TileType.Boat:
            return (<BoatIcon {...svgProps} />);
        //case TileType.Switch:
        //    return (<SwitchIcon {...svgProps} />);
        //case TileType.Move:
        //    return (<MoveIcon {...svgProps} />);
        default:
            return null;
    }
}

export default TileIcon;