import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import BoardTile from './BoardTile';
import './Board.scss';
import { Coordinates2D, Size2D, Tile, TileMap } from '../types/GameTypes';
import { getHexagonalPath } from '../lib';

interface BoardProps {
    gridSize: Size2D,
    tileSize: Size2D,
    tileStroke: number,
    origin?: Coordinates2D,
    rotation: number,
    tiles: TileMap,
}

interface BoardState {
    size: Size2D,
    tilePath: string,
}

class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
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
        const { tiles, tileSize, tileStroke,  rotation } = this.props;
        const { tilePath } = this.state;
        let waterTiles: Tile[] = [];
        let groundTiles: Tile[] = [];

        // Differenciation between ground and water tiles
        Array.from(tiles.values()).forEach((tile: Tile) => {
            if (tile.isWater) {
                waterTiles.push(tile);
            } else {
                groundTiles.push(tile);
            }
        });

        // Ground tiles are added after water tiles in SVG, so that the ground tiles'
        // contour is on top (visible)
        return waterTiles.concat(groundTiles).map((tile: Tile, index: number) => {
            const { coordinates, spaces, isWater } = tile;
            const position = this.getTilePosition(coordinates);

            return (
                <BoardTile
                    key={index}
                    path={tilePath}
                    size={tileSize}
                    position={position}
                    rotation={-rotation}
                    stroke={tileStroke}
                    spaces={spaces}
                    isWater={isWater}
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

const mapStateToProps = (state: AppState) => ({
    tiles: state.board.tiles,
});

export default connect(mapStateToProps, () => {})(Board);