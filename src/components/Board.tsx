import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import BoardTileComponent from './BoardTileComponent';
import './Board.scss';
import { Coordinates2D, Size2D, BoardTile, BoardTileMap, Figure } from '../types/GameTypes';
import { BOARD_SIZE, TILE_SIZE, BOARD_ORIGIN, BOARD_ROTATION } from '../config';

interface StateProps {
    tiles: BoardTileMap,
    hasShipInHand: boolean,
}

type Props = StateProps;

interface State {
    size: Size2D,
}

class Board extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            size: { width: 0, height: 0 },
        };
    }

    componentDidMount() {
        this.setState({
            size: this.getSize(),
        });
    }

    /**
     * Compute board size in pixels, based grid coordinates range and tile size.
     */
    getSize = (): Size2D => {
        return {
            width: BOARD_SIZE.width * TILE_SIZE.width,
            height: BOARD_SIZE.height * TILE_SIZE.height
        };
    }

    getTilePosition = (coordinates: Coordinates2D): Coordinates2D => {
        const { width, height } = TILE_SIZE;
        let { x, y } = BOARD_ORIGIN;

        x = (x + coordinates.x) * width * 0.75;
        y = (y + coordinates.y) * height;

        if (coordinates.x % 2 !== 0) {
            y += height / 2;
        }

        return { x, y };
    }

    getTileNodes = (): ReactNode[] => {
        const { tiles, hasShipInHand } = this.props;
        let waterTiles: BoardTile[] = [];
        let groundTiles: BoardTile[] = [];

        // Differenciation between ground and water tiles
        Array.from(tiles.values()).forEach((tile: BoardTile) => {
            if (tile.isWater) {
                waterTiles.push(tile);
            } else {
                groundTiles.push(tile);
            }
        });

        // Ground tiles are added after water tiles in SVG, so that the ground tiles'
        // contour is on top (visible)
        return waterTiles.concat(groundTiles).map((tile: BoardTile) => {
            const { id, coordinates, castes, isWater } = tile;
            const position = this.getTilePosition(coordinates);

            // Tile is playable if it has not been played before, and:
            // ... it is a ground tile,  and not a city
            // ... it is a water tile, and the player has a boat tile in their hand
            const isPlayable = isWater ? hasShipInHand : castes.length === 0;

            return (
                <BoardTileComponent
                    key={`board-tile-component-${id}`}
                    id={id}
                    position={position}
                    castes={castes}
                    isWater={isWater}
                    isPlayable={isPlayable}
                />
            );
        });
    }

    render() {
        const { width, height } = this.state.size;

        return (
            <svg id='board' viewBox={`0 0 ${width} ${height}`}>
                <g id='board-tiles' transform={`rotate(${BOARD_ROTATION})`}>
                    {this.getTileNodes()}
                </g>
            </svg>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { board, player } = state;
    const { tiles } = board;
    const { hand } = player;
    let hasShipInHand = false;

    for (let tile of hand.values()) {
        if (tile.type === Figure.Ship) {
            hasShipInHand = true;
            break;
        }
    }

    return {
        tiles,
        hasShipInHand,
    }
};

export default connect(mapStateToProps, () => ({}))(Board);