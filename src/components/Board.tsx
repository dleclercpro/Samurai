import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import BoardTileComponent from './tiles/BoardTileComponent';
import './Board.scss';
import { Coordinates2D, Size2D, BoardTile, BoardTileMap, Player, PlayerTileMap } from '../types/GameTypes';
import { BOARD_SIZE, TILE_SIZE, BOARD_ORIGIN, BOARD_ROTATION } from '../config';
import PlayedTileComponent from './tiles/PlayedTileComponent';

interface StateProps {
    player: Player,
    opponents: Player[],
    tiles: BoardTileMap,
    initHand: PlayerTileMap,
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
        const { player, opponents, initHand, tiles } = this.props;

        return opponents.concat(player).map((person: Player) => {
            const { playedTiles, color } = person;

            return Array.from(playedTiles.keys()).map((boardTileId: number) => {
                const playedTileId = playedTiles.get(boardTileId);
                if (playedTileId === undefined) {
                    return null;
                }

                const playedTile = initHand.get(playedTileId);
                if (playedTile === undefined) {
                    return null;
                }

                const boardTile = tiles.get(boardTileId);
                if (boardTile === undefined) {
                    return null;
                }
                
                const { type, strength, canReplay } = playedTile;
                const { coordinates } = boardTile;
                const position = this.getTilePosition(coordinates);

                return (
                    <PlayedTileComponent
                        key={`played-tile-component-${playedTileId}`}
                        id={playedTileId}
                        boardId={boardTileId}
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

    getTileNodes = (): ReactNode[] => {
        const { tiles } = this.props;
        let waterTiles: BoardTile[] = [];
        let groundTiles: BoardTile[] = [];        
        let tileNodes: ReactNode[] = [];

        // Differenciation between ground and water tiles
        Array.from(tiles.values()).forEach((tile: BoardTile) => {
            tile.isWater ? waterTiles.push(tile) : groundTiles.push(tile);
        });

        // Ground tiles are added after water tiles in SVG, so that the ground tiles'
        // contour is on top (visible)
        tileNodes.push(...waterTiles.concat(groundTiles).map((tile: BoardTile) => {
            const { id, coordinates, castes, isWater } = tile;
            const position = this.getTilePosition(coordinates);

            return (
                <BoardTileComponent
                    key={`board-tile-component-${id}`}
                    id={id}
                    position={position}
                    castes={castes}
                    isWater={isWater}
                />
            );
        }));

        // We place played tiles on board
        tileNodes.push(...this.getPlayedTileNodes());

        return tileNodes;
    }

    render() {
        const { width, height } = this.state.size;

        return (
            <div id='board-wrapper'>
                <svg id='board' viewBox={`0 0 ${width} ${height}`}>
                    <g id='board-tiles' transform={`rotate(${BOARD_ROTATION})`}>
                        {this.getTileNodes()}
                    </g>
                </svg>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { data, player } = state;
    const { self, opponents } = player;
    const { tiles, initHand } = data;

    return {
        tiles,
        initHand,
        player: self,
        opponents,
    }
};

export default connect(mapStateToProps, () => ({}))(Board);