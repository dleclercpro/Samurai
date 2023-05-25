import React from 'react';
import { Size2D, Coordinates2D, TileType, Caste, Figure, Action } from '../../types/GameTypes';
import './CastePiece.scss';
import { ReactComponent as HouseIcon } from '../../icons/house.svg';
import { ReactComponent as MonkIcon } from '../../icons/monk.svg';
import { ReactComponent as RiceIcon } from '../../icons/rice.svg';
import { ReactComponent as HorseIcon } from '../../icons/horse.svg';
import { ReactComponent as ShipIcon } from '../../icons/ship.svg';
import { ReactComponent as ExchangeIcon } from '../../icons/exchange.svg';
import { ReactComponent as KanjiIcon } from '../../icons/kanji.svg';

interface Props {
    position: Coordinates2D,
    size: Size2D,
    type: TileType,
}

const TileIcon: React.FC<Props> = (props) => {
    const { position, size, type } = props;
    const { x, y } = position;
    const { width, height } = size;

    const iconProps = {
        className: 'caste-piece',
        width: width,
        height: height,
        x: x - width / 2,  // Center in x
        y: y - height / 2, // Center in y
    };

    switch (type) {
        case Caste.Military:
            return (<HouseIcon {...iconProps} />);
        case Caste.Religion:
            return (<MonkIcon {...iconProps} />);
        case Caste.Commerce:
            return (<RiceIcon {...iconProps} />);
        case Figure.Samurai:
            return (<HorseIcon {...iconProps} />);
        case Figure.Ship:
            return (<ShipIcon {...iconProps} />);
        case Action.Swap:
            return (<ExchangeIcon {...iconProps} />);
        case Action.Move:
            return (<ExchangeIcon {...iconProps} />);
        case Action.Replay:
            return (<KanjiIcon {...iconProps} />);
        default:
            return null;
    }
}

export default TileIcon;