import React from 'react';
import { Caste, Size2D, Coordinates2D, SpecialCaste } from '../types/GameTypes';
import './TileIcon.scss';
import { ReactComponent as KatanaIcon } from '../icons/katana.svg';
import { ReactComponent as BuddhaIcon } from '../icons/buddha.svg';
import { ReactComponent as RiceIcon } from '../icons/rice.svg';
import { ReactComponent as KnightIcon } from '../icons/knight.svg';
import { ReactComponent as BoatIcon } from '../icons/boat.svg';

interface TileIconProps {
    position: Coordinates2D,
    size: Size2D,
    type: Caste | SpecialCaste,
}

const TileIcon: React.FC<TileIconProps> = (props) => {
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
        case Caste.Military:
            return (<KatanaIcon {...svgProps} />);
        case Caste.Religion:
            return (<BuddhaIcon {...svgProps} />);
        case Caste.Commerce:
            return (<RiceIcon {...svgProps} />);
        case SpecialCaste.Joker:
            return (<KnightIcon {...svgProps} />);
        case SpecialCaste.Water:
            return (<BoatIcon {...svgProps} />);
        //case SpecialCaste.Switch:
        //    return (<SwitchIcon {...svgProps} />);
        //case SpecialCaste.Move:
        //    return (<MoveIcon {...svgProps} />);
        default:
            throw new Error('Wrong icon type.')
    }
}

export default TileIcon;