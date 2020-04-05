import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import BoardTileComponent from './BoardTileComponent';
import './Board.scss';
import { Coordinates2D, Size2D, BoardTile, BoardTileMap, TileType } from '../types/GameTypes';
import { getHexagonalPath } from '../lib';

interface OwnProps {
    gridSize: Size2D,
    tileSize: Size2D,
    tileStroke: number,
    origin?: Coordinates2D,
    rotation: number,
}

interface StateProps {
    tiles: BoardTileMap,
    hasBoatInHand: boolean,
}

type Props = OwnProps & StateProps;

interface State {
    size: Size2D,
    tilePath: string,
}

class Board extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            size: { width: 0, height: 0 },
            tilePath: '',
        };
    }

    componentDidMount() {
        const { tileSize } = this.props;

        // We superimpose tiles on their borders
        const tileStroke = 0;

        this.setState({
            size: this.getSize(),
            tilePath: getHexagonalPath(tileSize, tileStroke),
        });
    }

    /**
     * Compute board size in pixels, based grid coordinates range and tile size.
     */
    getSize = (): Size2D => {
        const { gridSize, tileSize } = this.props;

        return {
            width: gridSize.width * tileSize.width,
            height: gridSize.height * tileSize.height
        };
    }

    getTilePosition = (coordinates: Coordinates2D): Coordinates2D => {
        const { origin, tileSize } = this.props;
        const { width, height } = tileSize;
        const x0 = origin ? origin.x : 0;
        const y0 = origin ? origin.y : 0;

        let x = (x0 + coordinates.x) * width * 0.75;
        let y = (y0 + coordinates.y) * height;

        if (coordinates.x % 2 !== 0) {
            y += height / 2;
        }

        return { x, y };
    }

    getTileNodes = (): ReactNode[] => {
        const { tiles, tileSize, tileStroke, rotation, hasBoatInHand } = this.props;
        const { tilePath } = this.state;
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
        return waterTiles.concat(groundTiles).map((tile: BoardTile, index: number) => {
            const { coordinates, types, isWater } = tile;
            const position = this.getTilePosition(coordinates);

            // Tile is playable if it has not been played before, and:
            // ... it is a ground tile,  and not a city
            // ... it is a water tile, and the player has a boat tile in their hand
            const isPlayable = isWater ? hasBoatInHand : types.length === 0;

            return (
                <BoardTileComponent
                    key={index}
                    path={tilePath}
                    size={tileSize}
                    position={position}
                    rotation={-rotation}
                    stroke={tileStroke}
                    types={types}
                    isWater={isWater}
                    isPlayable={isPlayable}
                />
            );
        });
    }

    render() {
        const { rotation } = this.props;
        const { width, height } = this.state.size;
        const transform = `rotate(${rotation})`;

        return (
            <svg id='board' viewBox={`0 0 ${width} ${height}`}>
                <g id='board-tiles' transform={transform}>
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
    let hasBoatInHand = false;

    for (let tile of hand.values()) {
        if (tile.type === TileType.Boat) {
            hasBoatInHand = true;
            break;
        }
    }

    return {
        tiles,
        hasBoatInHand,
    }
};

export default connect(mapStateToProps, () => ({}))(Board);