import React from 'react';
import { TileType, SpecialTileType, Size2D, Coordinates2D } from '../types/GameTypes';
import './TileIcon.scss';
import { ReactComponent as HouseIcon } from '../icons/house.svg';
import { ReactComponent as MonkIcon } from '../icons/monk.svg';
import { ReactComponent as RiceIcon } from '../icons/rice.svg';
import { ReactComponent as HorseIcon } from '../icons/horse.svg';
import { ReactComponent as ShipIcon } from '../icons/ship.svg';
import { ReactComponent as ExchangeIcon } from '../icons/exchange.svg';
import { ReactComponent as KanjiIcon } from '../icons/kanji.svg';

interface Props {
    position: Coordinates2D,
    size: Size2D,
    type: TileType | SpecialTileType,
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
            return (<HouseIcon {...svgProps} />);
        case TileType.Religion:
            return (<MonkIcon {...svgProps} />);
        case TileType.Commerce:
            return (<RiceIcon {...svgProps} />);
        case TileType.Joker:
            return (<HorseIcon {...svgProps} />);
        case TileType.Ship:
            return (<ShipIcon {...svgProps} />);
        case TileType.Switch:
            return (<ExchangeIcon {...svgProps} />);
        case TileType.Move:
            return (<ExchangeIcon {...svgProps} />);
        case SpecialTileType.Replay:
            return (<KanjiIcon {...svgProps} />);
        default:
            return null;
    }
}

export default TileIcon;