import React, { Dispatch, ReactNode } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import Tile from './Tile';
import './Board.scss';
import { Coordinates2D, Size2D } from '../types/GameTypes';
import { AppAction } from '../actions';
import { TileJSON, BoardJSON } from '../types/JSONTypes';

interface BoardProps {
    gridSize: Size2D,
    tileSize: Size2D,
    root: BoardJSON,
    origin: Coordinates2D,
}

interface BoardState {
    size: Size2D,
    tiles: TileJSON[],
    tilePath: string,
}

class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);

        this.state = {
            size: { width: 0, height: 0 },
            tiles: [],
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

    getSize = (): Size2D => {
        const { gridSize, tileSize } = this.props;

        return {
            width: gridSize.width * tileSize.width,
            height: gridSize.height * tileSize.height
        };
    }

    getTiles = (): TileJSON[] => {
        const { root } = this.props;
        const tiles = Object.values(root).flat();

        // Define neighborhoods
        tiles.forEach((tile: TileJSON) => {
            tile.neighbors = this.getTileNeighbors(tile, tiles);
        })

        return tiles;
    }

    getTileNeighbors = (tile: TileJSON, tiles: TileJSON[]): TileJSON[] => {
        let neighbors = [];

        // Establish tile neighborhood
        for (const otherTile of tiles) {
            const x0 = tile.coordinates.x;
            const y0 = tile.coordinates.y;
            const x1 = otherTile.coordinates.x;
            const y1 = otherTile.coordinates.y;

            // Neighbor criteria based on sum of coordinates difference
            const delta = Math.abs(x0 - x1) + Math.abs(y0 - y1);

            if (delta > 0 && delta <= 2) {
                neighbors.push(otherTile);
            }
        }

        return neighbors;
    }

    getTileNodes = (): ReactNode[] => {
        const { tiles, tilePath } = this.state;

        return tiles.map((tile: TileJSON, index: number) => {
            const { coordinates, spaces, isWater } = tile;
            const position = this.getTilePosition(coordinates);

            return (
                <Tile
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