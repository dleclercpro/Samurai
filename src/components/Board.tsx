import React, { Dispatch, ReactNode } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import TileComponent from './TileComponent';
import './Board.scss';
import { Coordinates2D, Size2D, Tile, TileMap, Caste } from '../types/GameTypes';
import { AppAction } from '../actions';
import { TileJSON, BoardJSON } from '../types/JSONTypes';

interface BoardProps {
    gridSize: Size2D,
    tileSize: Size2D,
    origin: Coordinates2D,
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
        this.setState({
            size: this.getSize(),
            tiles: this.getTiles(),
            tilePath: this.getTilePath(),
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
                    console.error('Unknown tile space type.');
                    return Caste.Unknown;
            }
        });
    }

    getTileNodes = (): ReactNode[] => {
        let { tiles, tilePath } = this.state;

        return Array.from(tiles.values()).map((tile: Tile, index: number) => {
            const { coordinates, spaces, isWater } = tile;
            const position = this.getTilePosition(coordinates);

            return (
                <TileComponent
                    key={index}
                    position={position}
                    path={tilePath}
                    spaces={spaces}
                    isWater={isWater}
                />
            );
        });
    }

    getTilePath = (): string => {
        const { width, height } = this.props.tileSize;

        const points = [
            [0, height / 2],
            [0.25 * width, height],
            [0.75 * width, height],
            [width, height / 2],
            [0.75 * width, 0],
            [0.25 * width, 0]
        ];

        return points.reduce((str, point, i) => {
            const [ x, y ] = point;

            return str + x + ',' + y + (i + 1 < points.length ? ' ' : '');
        }, '');
    }

    getTilePosition = (coordinates: Coordinates2D): Coordinates2D => {
        const { origin, tileSize } = this.props;
        const { width, height } = tileSize;
        const x0 = origin.x;
        const y0 = origin.y;

        let x = width * (x0 + coordinates.x * 0.75);
        let y = height * (y0 + coordinates.y);

        if (coordinates.x % 2 !== 0) {
            y += height / 2;
        }

        return { x, y };
    }

    render() {
        const { width, height } = this.state.size;

        return (
            <svg id='board' viewBox={`0 0 ${width} ${height}`}>
                <g id='board-tiles'>
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