import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Caste, Size2D, PlayerColor } from '../types/GameTypes';
import './PlayerTile.scss';
import { AppAction } from '../actions';
import CastePiece from './CastePiece';
import { getPositionInHexagon } from '../lib';
import TileBackground from './TileBackground';
import TileText from './TileText';

interface PlayerTileProps {
    size: Size2D, // Size of tile (in pixels)
    path: string,
    stroke: number,
    color: PlayerColor,
    caste: Caste,
    strength: number,
}

interface PlayerTileState {
    isSelected: boolean,
}

class PlayerTile extends React.Component<PlayerTileProps, PlayerTileState> {

    constructor(props: PlayerTileProps) {
        super(props);

        this.state = {
            isSelected: false,
        }
    }

    handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    select = () => {
        this.setState({
            isSelected: true,
        });
    }

    unselect = () => {
        this.setState({
            isSelected: false,
        });
    }

    render() {
        const { size, path, stroke, color, strength, caste } = this.props;

        const { width, height } = size;

        const piecePosition = getPositionInHexagon(0, 2, size);
        const pieceSize = { width: 2 / 5 * width, height: 2 / 5 * height };

        const textPosition = { x: 2 / 3 * width, y: height / 2 };
    
        return (
            <svg className='player-tile' viewBox={`0 0 ${width} ${height}`} onClick={this.handleClick}>
                <TileBackground path={path} stroke={stroke} color={color} />
                <TileText position={textPosition}>{strength}</TileText>
                <CastePiece position={piecePosition} size={pieceSize} caste={caste} />
            </svg>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTile);