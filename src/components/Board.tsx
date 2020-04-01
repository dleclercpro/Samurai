import React, { Dispatch, Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import Tile from './Tile';
import './Board.scss';
import { Position2D, Size2D, BoardMap, BoardTile } from '../types/GameTypes';
import { AppAction } from '../actions';

interface BoardProps {
    gridSize: Size2D,
    tileSize: Size2D,
    map: BoardMap,
    origin: Position2D,
}

interface BoardState {
    size: Size2D,
    tilePath: string,
}

class Board extends Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);

        this.state = {
            size: { width: 0, height: 0 },
            tilePath: '',
        }
    }

    componentDidMount() {
        this.setState({
            size: this.getSize(),
            tilePath: this.getTilePath(),
        })
    }

    getSize = (): Size2D => {
        const { gridSize, tileSize } = this.props;

        return {
            width: gridSize.width * tileSize.width,
            height: gridSize.height * tileSize.height
        };
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

    getTilePosition = (coordinates: Position2D): Position2D => {
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
        const { map } = this.props;
        const { size, tilePath } = this.state;
        const { width, height } = size;

        return (
            <svg id='board' viewBox={`0 0 ${width} ${height}`}>
                <g>
                    {Object.values(map).map((section: BoardTile[]) => (
                        section.map((tile: BoardTile, index: number) => {
                            const { coordinates, isCity, isWater } = tile;
                            const position = this.getTilePosition(coordinates);

                            return (
                                <Tile
                                    key={index}
                                    position={position}
                                    path={tilePath}
                                    neighbors={[]}
                                    size={0}
                                    isCity={isCity}
                                    isWater={isWater}
                                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Board);