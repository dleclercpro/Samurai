import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import BoardTileComponent from './BoardTileComponent';
import './Board.scss';
import { Coordinates2D, Size2D, Tile, TileMap, Figure, PlayerTile, Player } from '../types/GameTypes';
import { BOARD_SIZE, TILE_SIZE, BOARD_ORIGIN, BOARD_ROTATION } from '../config';
import PlayedTileComponent from './PlayedTileComponent';

interface StateProps {
    player: Player,
    opponents: Player[],
    tiles: TileMap,
    initHand: PlayerTile[],
    hasShipInHand: boolean,
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

            return Array.from(playedTiles.keys()).map((boardID: number) => {
                const initHandID = playedTiles.get(boardID);
                const initHandTile = initHand.find((tile => tile.id === initHandID));
                const boardTile = tiles.get(boardID);

                if (initHandID === undefined || initHandTile === undefined || boardTile === undefined) {
                    return null;
                }

                const { type, strength, canReplay } = initHandTile;
                const { coordinates } = boardTile;
                const position = this.getTilePosition(coordinates);

                return (
                    <PlayedTileComponent
                        key={`played-tile-${initHandID}`}
                        id={initHandID}
                        type={type}
                        color={color}
                        strength={strength}
                        canReplay={canReplay}
                        isPlayable={false}
                        position={position}
                        rotation={-BOARD_ROTATION}
                    />
                );
            });
        });
    }

    getTileNodes = (): ReactNode[] => {
        const { tiles, hasShipInHand } = this.props;
        let waterTiles: Tile[] = [];
        let groundTiles: Tile[] = [];        
        let tileNodes: ReactNode[] = [];

        // Filter out played tiles to get remaining free board tiles
        /*
        const filteredTiles = Array.from(tiles.values()).filter((tile: Tile) => {
            return Array.from(playedTiles.keys()).some((key: number) => {
                return tile.id !== key;
            })
        });
        */

        // Differenciation between ground and water tiles
        Array.from(tiles.values()).forEach((tile: Tile) => {
            tile.isWater ? waterTiles.push(tile) : groundTiles.push(tile);
        });

        // Ground tiles are added after water tiles in SVG, so that the ground tiles'
        // contour is on top (visible)
        tileNodes.push(...waterTiles.concat(groundTiles).map((tile: Tile) => {
            const { id, coordinates, castes, isWater } = tile;
            const position = this.getTilePosition(coordinates);

            // Tile is playable if it has not been played before, and:
            // ... it is a ground tile,  and not a city
            // ... it is a water tile, and the player has a boat tile in their hand
            const isPlayable = isWater ? hasShipInHand : castes.length === 0;

            return (
                <BoardTileComponent
                    key={`board-tile-${id}`}
                    id={id}
                    position={position}
                    castes={castes}
                    isWater={isWater}
                    isPlayable={isPlayable}
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
    const { tiles } = state.board;
    const { player, opponents, hand, initHand } = state.game;
    const hasShipInHand = Array.from(hand.values()).some(tile => tile.type === Figure.Ship);

    return {
        tiles,
        initHand,
        player,
        opponents,
        hasShipInHand,
    }
};

export default connect(mapStateToProps, () => ({}))(Board);