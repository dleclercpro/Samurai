import React, { Dispatch, ReactNode } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import BoardTile from './BoardTile';
import './Board.scss';
import { Coordinates2D, Size2D, Tile, TileMap, Caste } from '../types/GameTypes';
import { AppAction } from '../actions';
import { TileJSON, BoardJSON } from '../types/JSONTypes';
import { getTilePath } from '../lib';

interface BoardProps {
    gridSize: Size2D,
    tileSize: Size2D,
    tileStroke: number,
    origin: Coordinates2D,
    rotation: number,
    data: BoardJSON,
}

interface BoardState {
    size: Size2D,
    tiles: TileMap,
    tilePath: string,
}

class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);

        this.state = {
            size: { width: 0, height: 0 },
            tiles: new Map(),
            tilePath: '',
        };
    }

    componentDidMount() {
        const {tileSize } = this.props;

        // We superimpose tiles on their borders
        const tileStroke = 0;

        this.setState({
            size: this.getSize(),
            tiles: this.getTiles(),
            tilePath: getTilePath(tileSize, tileStroke),
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

    getTileByCoordinates = (coordinates: Coordinates2D): Tile | undefined => {
        const { tiles } = this.state;

        return tiles.get(coordinates);
    }

    /**
     * Build a tile map using its corresponding JSON data. Tiles' keys are their
     * coordinates.
     */
    getTiles = (): TileMap => {
        const { data } = this.props;
        const rawTiles = Object.values(data).flat();
        const tiles: TileMap = new Map();

        // Build tile map
        rawTiles.forEach((rawTile: TileJSON) => {
            const { coordinates, spaces, isWater } = rawTile;
            
            if (tiles.has(coordinates)) {
                console.error('Trying to add same tile twice.');
                return;
            }

            tiles.set(coordinates, {
                coordinates,
                neighborhood: [],
                spaces: this.getTileSpaces(spaces),
                isWater,
            });
        });

        // Build each tile's neighborhood
        for (let tile of tiles.values()) {
            tile.neighborhood = this.getTileNeighborhood(tile, tiles);
        }

        return tiles;
    }

    /**
     * Compute each tile's neighborhood as a list of other tiles' coordinates.
     */
    getTileNeighborhood = (tile: Tile, tiles: TileMap): Coordinates2D[] => {
        let neighborhood = [];

        for (let otherTile of tiles.values()) {
            const x0 = tile.coordinates.x;
            const y0 = tile.coordinates.y;
            const x1 = otherTile.coordinates.x;
            const y1 = otherTile.coordinates.y;

            // Neighbor criteria based on sum of coordinates difference
            const delta = Math.abs(x0 - x1) + Math.abs(y0 - y1);

            if (delta > 0 && delta <= 2) {
                neighborhood.push(otherTile.coordinates);
            }
        }

        return neighborhood;
    }

    getTileSpaces = (spaces: String[]): Caste[] => {
        return spaces.map((space: String) => {
            switch(space) {
                case 'Military':
                    return Caste.Military;
                case 'Religion':
                    return Caste.Religion;
                case 'Commerce':
                    return Caste.Commerce;
                default:
                    throw new Error('getIcon: wrong caste.');
            }
        });
    }

    getTileNodes = (): ReactNode[] => {
        const { rotation, tileSize, tileStroke } = this.props;
        const { tiles, tilePath } = this.state;
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

    getTilePosition = (coordinates: Coordinates2D): Coordinates2D => {
        const { origin, tileSize } = this.props;
        const { width, height } = tileSize;
        const x0 = origin.x;
        const y0 = origin.y;

        let x = (x0 + coordinates.x) * width * 0.75;
        let y = (y0 + coordinates.y) * height;

        if (coordinates.x % 2 !== 0) {
            y += height / 2;
        }

        return { x, y };
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

});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Board);