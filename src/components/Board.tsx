import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppState } from '../types/StateTypes';
import { AppAction } from '../types/ActionTypes';
import Tile from './Tile';
import './Board.scss';
import { Position2D, Size2D } from '../types/GameTypes';

const BOARD_SIZE: Size2D = { width: 14, height: 14 };
const TILE_SIZE: Size2D = { width: 300, height: 260 };
const INIT_POS: Position2D = { x: 9, y: -16 };

const NORTH_ISLAND = [
    { x: 0, y: 3, isWater: true },
    { x: 0, y: 4, isWater: true },
    { x: 0, y: 5, isWater: true },
    { x: 0, y: 6, isWater: true },
    { x: 1, y: 0, isWater: true },
    { x: 1, y: 1, isWater: true },
    { x: 1, y: 2, isWater: true },
    { x: 2, y: 0, isWater: true },
    { x: 3, y: 0, isWater: true },
    { x: 4, y: 1, isWater: true },
    { x: 4, y: 2, isWater: true },
    { x: 5, y: 1, isWater: true },
    { x: 6, y: 1, isWater: true },
    { x: 7, y: 1, isWater: true },
    { x: 7, y: 2, isWater: true },
    { x: 7, y: 3, isWater: true },
    { x: 6, y: 4, isWater: true },
    { x: 5, y: 4, isWater: true },
    { x: 5, y: 5, isWater: true },
    { x: 5, y: 6, isWater: true },

    { x: 1, y: 3, isWater: false },
    { x: 1, y: 4, isWater: false },
    { x: 1, y: 5, isWater: false },
    { x: 2, y: 1, isWater: false },
    { x: 2, y: 2, isWater: false },
    { x: 2, y: 3, isWater: false },
    { x: 2, y: 4, isWater: false },
    { x: 2, y: 5, isWater: false },
    { x: 3, y: 1, isWater: false },
    { x: 3, y: 2, isWater: false },
    { x: 3, y: 3, isWater: false },
    { x: 3, y: 4, isWater: false },
    { x: 3, y: 5, isWater: false },
    { x: 4, y: 3, isWater: false },
    { x: 4, y: 4, isWater: false },
    { x: 4, y: 5, isWater: false },
    { x: 4, y: 6, isWater: false },
    { x: 5, y: 2, isWater: false },
    { x: 5, y: 3, isWater: false },
    { x: 6, y: 2, isWater: false },
    { x: 6, y: 3, isWater: false },
];

const MIDDLE_ISLAND = [
    { x: 1, y: 6, isWater: true },
    { x: 1, y: 7, isWater: true },
    { x: 1, y: 8, isWater: true },
    { x: 1, y: 9, isWater: true },
    { x: 2, y: 6, isWater: true },
    { x: 3, y: 6, isWater: true },
    { x: 4, y: 7, isWater: true },
    { x: 5, y: 7, isWater: true },
    { x: 5, y: 8, isWater: true },
    { x: 5, y: 9, isWater: true },
    { x: 5, y: 10, isWater: true },
    { x: 5, y: 11, isWater: true },
    { x: 4, y: 11, isWater: true },

    { x: 2, y: 7, isWater: false },
    { x: 2, y: 8, isWater: false },
    { x: 2, y: 9, isWater: false },
    { x: 2, y: 10, isWater: false },
    { x: 2, y: 11, isWater: false },
    { x: 3, y: 7, isWater: false },
    { x: 3, y: 8, isWater: false },
    { x: 3, y: 9, isWater: false },
    { x: 3, y: 10, isWater: false },
    { x: 4, y: 8, isWater: false },
    { x: 4, y: 9, isWater: false },
    { x: 4, y: 10, isWater: false },

    { x: 1, y: 10, isWater: true },
    { x: 0, y: 11, isWater: true },
    { x: -1, y: 11, isWater: true },
    { x: -2, y: 12, isWater: true },
    { x: 5, y: 12, isWater: true },
    { x: 5, y: 13, isWater: true },
    { x: 5, y: 14, isWater: true },
    { x: 4, y: 15, isWater: true },
    { x: 3, y: 14, isWater: true },
    { x: 2, y: 15, isWater: true },
    { x: 1, y: 15, isWater: true },

    { x: 1, y: 11, isWater: false },
    { x: 1, y: 12, isWater: false },
    { x: 1, y: 13, isWater: false },
    { x: 1, y: 14, isWater: false },
    { x: 2, y: 12, isWater: false },
    { x: 2, y: 13, isWater: false },
    { x: 2, y: 14, isWater: false },
    { x: 3, y: 11, isWater: false },
    { x: 3, y: 12, isWater: false },
    { x: 3, y: 13, isWater: false },
    { x: 4, y: 12, isWater: false },
    { x: 4, y: 13, isWater: false },
    { x: 4, y: 14, isWater: false },
    { x: 0, y: 12, isWater: false },
    { x: 0, y: 13, isWater: false },
    { x: 0, y: 14, isWater: false },
    { x: 0, y: 15, isWater: false },
    { x: -1, y: 12, isWater: false },
    { x: -1, y: 13, isWater: false },
    { x: -1, y: 14, isWater: false },

    { x: -2, y: 13, isWater: true },
    { x: -2, y: 14, isWater: true },
    { x: -3, y: 13, isWater: true },
    { x: -4, y: 14, isWater: true },
    { x: -5, y: 14, isWater: true },
    { x: -6, y: 15, isWater: true },
    { x: -7, y: 15, isWater: true },
    { x: -8, y: 16, isWater: true },
    { x: -8, y: 17, isWater: true },
    { x: -8, y: 18, isWater: true },
    { x: -7, y: 18, isWater: true },
    { x: -6, y: 18, isWater: true },
    { x: -5, y: 17, isWater: true },
    { x: -4, y: 17, isWater: true },
    { x: -3, y: 17, isWater: true },
    { x: -3, y: 16, isWater: true },
    { x: -2, y: 18, isWater: true },
    { x: -1, y: 17, isWater: true },
    { x: 0, y: 17, isWater: true },
    { x: 0, y: 16, isWater: true },

    { x: -1, y: 15, isWater: false },
    { x: -1, y: 16, isWater: false },
    { x: -2, y: 15, isWater: false },
    { x: -2, y: 16, isWater: false },
    { x: -2, y: 17, isWater: false },
    { x: -3, y: 14, isWater: false },
    { x: -3, y: 15, isWater: false },
    { x: -4, y: 15, isWater: false },
    { x: -4, y: 16, isWater: false },
    { x: -5, y: 15, isWater: false },
    { x: -5, y: 16, isWater: false },
    { x: -6, y: 16, isWater: false },
    { x: -6, y: 17, isWater: false },
    { x: -7, y: 16, isWater: false },
    { x: -7, y: 17, isWater: false },
];

const SOUTH_ISLANDS = [
    { x: -2, y: 19, isWater: true },
    { x: -2, y: 20, isWater: true },
    { x: -3, y: 20, isWater: true },
    { x: -4, y: 21, isWater: true },
    { x: -5, y: 21, isWater: true },
    { x: -6, y: 21, isWater: true },
    { x: -7, y: 19, isWater: true },
    { x: -7, y: 20, isWater: true },
    { x: -7, y: 21, isWater: true },
    { x: -7, y: 22, isWater: true },
    { x: -8, y: 23, isWater: true },
    { x: -9, y: 22, isWater: true },
    { x: -10, y: 22, isWater: true },
    { x: -11, y: 21, isWater: true },
    { x: -11, y: 20, isWater: true },
    { x: -12, y: 20, isWater: true },
    { x: -12, y: 19, isWater: true },
    { x: -11, y: 18, isWater: true },
    { x: -10, y: 18, isWater: true },
    { x: -9, y: 17, isWater: true },

    { x: -3, y: 18, isWater: false },
    { x: -3, y: 19, isWater: false },
    { x: -4, y: 18, isWater: false },
    { x: -4, y: 19, isWater: false },
    { x: -4, y: 20, isWater: false },
    { x: -5, y: 18, isWater: false },
    { x: -5, y: 19, isWater: false },
    { x: -5, y: 20, isWater: false },
    { x: -6, y: 20, isWater: false },
    { x: -6, y: 19, isWater: false },
    { x: -8, y: 19, isWater: false },
    { x: -8, y: 20, isWater: false },
    { x: -8, y: 21, isWater: false },
    { x: -8, y: 22, isWater: false },
    { x: -9, y: 18, isWater: false },
    { x: -9, y: 19, isWater: false },
    { x: -9, y: 20, isWater: false },
    { x: -9, y: 21, isWater: false },
    { x: -10, y: 19, isWater: false },
    { x: -10, y: 20, isWater: false },
    { x: -10, y: 21, isWater: false },
    { x: -11, y: 19, isWater: false },
];

interface BoardProps {

}

interface BoardState {
    tilePath: string,
    size: Size2D,
}

class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);

        this.state = {
            tilePath: this.getTilePath(TILE_SIZE),
            size: {
                width: BOARD_SIZE.width * TILE_SIZE.width,
                height: BOARD_SIZE.height * TILE_SIZE.height
            },
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    getTilePath = (size: Size2D): string => {
        const { width, height } = size;

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

    getTilePosition = (position: Position2D, size: Size2D): Position2D => {
        const { width, height } = size;
        let x = width * (INIT_POS.x + position.x * 0.75);
        let y = height * (INIT_POS.y + position.y);

        if (position.x % 2 !== 0) {
            y += height / 2;
        }

        return { x, y };
    }

    render() {
        const size = this.state.size;
        const tilePath = this.state.tilePath;

        return (
            <svg id='board' viewBox={`0 0 ${size.width} ${size.height}`}>
                <g>
                    {[ NORTH_ISLAND, MIDDLE_ISLAND, SOUTH_ISLANDS ].map((submap) => (
                        submap.map((tile: any) => (
                            <Tile position={this.getTilePosition({ x: tile.x, y: tile.y }, TILE_SIZE)} path={tilePath} neighbors={[]} size={0} isCity={false} isWater={tile.isWater} />
                        ))
                    ))}
                </g>
            </svg>
        );
    }
}

const mapStateToProps = (state: AppState) => {

}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));