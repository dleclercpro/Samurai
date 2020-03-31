import React, { Dispatch, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppState } from '../types/StateTypes';
import Tile from './Tile';
import './Board.scss';
import { Position2D, Size2D, BoardMap, BoardTile } from '../types/GameTypes';
import BoardJSON from '../data/Board.json';
import { AppAction } from '../actions';

const BOARD_SIZE: Size2D = { width: 14, height: 14 };
const TILE_SIZE: Size2D = { width: 300, height: 260 };
const INIT_POS: Position2D = { x: 9, y: -16 };

interface BoardProps {

}

interface BoardState {
    map: BoardMap,
    tilePath: string,
    size: Size2D,
}

class Board extends Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);

        this.state = {
            map: BoardJSON,
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

    getMap = () => {

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

    getTilePosition = (coordinates: Position2D, size: Size2D): Position2D => {
        const { width, height } = size;
        let x = width * (INIT_POS.x + coordinates.x * 0.75);
        let y = height * (INIT_POS.y + coordinates.y);

        if (coordinates.x % 2 !== 0) {
            y += height / 2;
        }

        return { x, y };
    }

    render() {
        const { map, size, tilePath } = this.state;
        const sections = Object.values(map);

        return (
            <svg id='board' viewBox={`0 0 ${size.width} ${size.height}`}>
                <g>
                    {sections.map((section: BoardTile[]) => (
                        section.map((tile: BoardTile, index: number) => {
                            const { coordinates, isWater } = tile;

                            return (
                                <Tile key={index} position={this.getTilePosition(coordinates, TILE_SIZE)} path={tilePath} neighbors={[]} size={0} isCity={false} isWater={isWater} />
                            );
                        })
                    ))}
                </g>
            </svg>
        );
    }
}

const mapStateToProps = (state: AppState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));