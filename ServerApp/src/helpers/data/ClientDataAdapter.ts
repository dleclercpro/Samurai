import { HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP } from '../../constants';
import { IBoard } from '../../models/Board';
import { BoardTileType, IBoardTile } from '../../models/BoardTile';
import { IGame } from '../../models/Game';
import { IHandTile } from '../../models/HandTile';
import { IPlayedTile } from '../../models/PlayedTile';
import { IPlayer } from '../../models/Player';
import { IScore } from '../../models/Score';
import User, { IUser } from '../../models/User';
import { BoardData, BoardTileData, HandData, HandTileData, PlayedTilesData, PlayerData, PlayersData, ScoreData } from '../../types/DataTypes';
import { Caste } from '../../types/GameTypes';

/*
    This class is responsible for preparing data to serve
    to client application. It is an adapter.
*/
class ClientDataAdapter {
    private static instance: ClientDataAdapter;

    private constructor() {
    
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new ClientDataAdapter();
        }

        return this.instance;
    }

    // PUBLIC METHODS
    public async getGameData(user: IUser, game: IGame) {
        const player = game.getPlayerByUser(user);
        const board = game.getBoard();

        return {
            name: game.getName(),
            version: game.getVersion(),
            hand: this.getHandData(player),
            board: this.getBoardData(board),
            players: await this.getPlayersData(player, game),
            playedSinceLastTurn: this.getPlayedSinceLastTurn(player),
        };
    }

    // PRIVATE METHODS
    private getBoardData(board: IBoard): BoardData {
        const tiles = board.getTiles();

        return tiles.reduce((sections, tile) => {
            const section = tile.getSection();
            const sectionTiles = sections[section] ?? [];

            return {
                ...sections,
                [section]: [...sectionTiles, this.getBoardTileData(tile)],
            };

        }, {} as BoardData);
    }

    private getBoardTileData(boardTile: IBoardTile): BoardTileData {
        return {
            id: boardTile.getId(),
            coordinates: boardTile.getCoordinates(),
            castes: boardTile.getCastePieces(),
            isClosed: boardTile.isCity() && boardTile.isClosed(),
            isWater: boardTile.getType() === BoardTileType.Water,
            isSwap: boardTile.getType() === BoardTileType.Swap,
        };
    }

    private getHandData(player: IPlayer): HandData {
        return player.getHand().getCurrent().map(handTile => handTile.getId());
    }

    private getHandTileData(handTile: IHandTile): HandTileData {
        return {
            id: handTile.getId(),
            type: handTile.getType(),
            strength: handTile.getStrength(),
            canReplay: handTile.canReplay(),
        };
    }

    private async getPlayersData(player: IPlayer, game: IGame): Promise<PlayersData> {
        const self = player;
        const opponents = game.getPlayers().filter(player => player.getId() !== self.getId());

        return {
            self: await this.getPlayerData(self),
            opponents: await Promise.all(opponents.map((opponent) => this.getPlayerData(opponent))),
        };
    }

    private async getPlayerData(player: IPlayer): Promise<PlayerData> {
        const user = await User.getById(player.getUserId()); // FIXME

        return {
            id: player.getId(),
            username: user.getUsername(),
            color: player.getColor(),
            isPlaying: player.getIsPlaying(),
            playedTiles: this.getPlayedTilesData(player),
            score: this.getScoreData(player.getScore()),
            hasWon: player.hasWon(),
        };
    }

    private getPlayedTilesData(player: IPlayer): PlayedTilesData {
        const game = player.ownerDocument() as IGame;
        const board = game.getBoard();

        const playedTiles = board.getTilesPlayedByPlayer(player);

        // Board tile ID -> Hand tile ID
        return playedTiles.reduce((prevTiles: Record<number, number>, playedTile: IPlayedTile) => ({
            ...prevTiles,
            [playedTile.getBoardTile().getId()]: playedTile.getHandTile().getId(),

        }), {} as PlayedTilesData);
    }

    private getScoreData(score: IScore): ScoreData {
        return {
            'Military': score.getByCaste(Caste.Military),
            'Religion': score.getByCaste(Caste.Religion),
            'Commerce': score.getByCaste(Caste.Commerce),
        };
    }

    private getPlayedSinceLastTurn(player: IPlayer): PlayedTilesData {
        const game = player.ownerDocument() as IGame;
        const board = game.getBoard();
        const orders = game.getHistory().getOrdersSince(player.getLastTurn());

        return orders.reduce((playedTiles, order) => {
            const { handTileId,  boardTileIds, castes } = order; 
            
            // Move order
            if (handTileId === HAND_TILE_ID_MOVE) {
                return {
                    ...playedTiles,
                    [boardTileIds.from!]: handTileId,
                    [boardTileIds.to!]: board
                        .getTileById(boardTileIds.to!)
                        .getPlayedTile()
                        .getHandTile()
                        .getId(),
                };
            }

            // Swap order
            if (handTileId === HAND_TILE_ID_SWAP) {
                const swapTile = board
                    .getSwapTiles()
                    .find(swapTile => swapTile.getPlayedTile()?.getPlayer().getId() === player.getId());
                
                if (swapTile) {
                    return {
                        ...playedTiles,
                        [swapTile.getId()]: handTileId,
                    };
                }

                // No swap tile played yet
                return {
                    ...playedTiles,
                };
            }

            // Normal order
            return {
                ...playedTiles,
                [boardTileIds.to!]: handTileId,
            };

        }, {} as PlayedTilesData);
    }
}

export default ClientDataAdapter.getInstance();