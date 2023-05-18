import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import BoardTileComponent from './tiles/BoardTileComponent';
import './Board.scss';
import { Coordinates2D, Size2D, BoardTile, BoardTileMap, Player, HandTileMap } from '../types/GameTypes';
import { BOARD_SIZE, TILE_SIZE, BOARD_ORIGIN, BOARD_ROTATION } from '../config';
import PlayedTileComponent from './tiles/PlayedTileComponent';
import { getTakenBoardTileIds, getAllPlayers } from '../selectors';
import TileEmptyPattern from './tiles/TileEmptyPattern';

interface StateProps {
    players: Player[],
    tiles: BoardTileMap,
    fullHand: HandTileMap,
    takenTileIds: number[],
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

    getPlayedTileNodes = (): ReactNode[] => {
        const { players, fullHand, tiles } = this.props;

        return players.map((person: Player) => {
            const { playedTiles, color } = person;

            return Array.from(playedTiles.keys()).map((boardTileId: number) => {
                const handTileId = playedTiles.get(boardTileId);

                if (handTileId === undefined) {
                    return null;
                }

                const handTile = fullHand.get(handTileId);
                const boardTile = tiles.get(boardTileId);

                if (handTile === undefined || boardTile === undefined) {
                    return null;
                }
                
                const { type, strength, canReplay } = handTile;
                const { coordinates } = boardTile;
                const position = this.getTilePosition(coordinates);

                return (
                    <PlayedTileComponent
                        key={`played-tile-component-${boardTileId}-${handTileId}`}
                        handTileId={handTileId}
                        boardTileId={boardTileId}
                        type={type}
                        color={color}
                        strength={strength}
                        canReplay={canReplay}
                        position={position}
                        rotation={-BOARD_ROTATION}
                    />
                );
            });
        });
    }

    getBoardTileNodes = (): ReactNode[] => {
        const { tiles, takenTileIds } = this.props;
        
        let waterTiles: BoardTile[] = [];
        let groundTiles: BoardTile[] = [];

        // Remove board tiles on which a tile was played
        const freeBoardTiles = Array.from(tiles.values()).filter((tile: BoardTile) => {
            return !takenTileIds.includes(tile.id)
        });

        // Differenciation between ground and water tiles
        freeBoardTiles.forEach((tile: BoardTile) => {
            tile.isWater ? waterTiles.push(tile) : groundTiles.push(tile);
        });

        // Ground tiles are added after water tiles in SVG, so that the ground tiles'
        // contour is on top (visible)
        return waterTiles.concat(groundTiles).map((tile: BoardTile) => {
            const { id, coordinates, castes, isClosed, isWater, isSwap } = tile;
            const position = this.getTilePosition(coordinates);

            return (
                <BoardTileComponent
                    key={`board-tile-component-${id}`}
                    id={id}
                    position={position}
                    castes={castes}
                    isClosed={isClosed}
                    isWater={isWater}
                    isSwap={isSwap}
                />
            );
        });
    }

    render() {
        const { width, height } = this.state.size;

        return (
            <div id='board-wrapper'>
                <svg id='board' viewBox={`0 0 ${width} ${height}`}>
                    <TileEmptyPattern />
                    <g id='tiles' transform={`rotate(${BOARD_ROTATION})`}>
                        {this.getBoardTileNodes()}
                        {this.getPlayedTileNodes()}
                    </g>
                </svg>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { tiles } = state.board;
    const { full } = state.hand;

    return {
        tiles,
        fullHand: full,
        players: getAllPlayers(state.players),
        takenTileIds: getTakenBoardTileIds(state.players),
    };
};

export default connect(mapStateToProps)(Board);