import { logger } from '../../utils/Logging';
import Game, { IGame } from '../../models/Game';
import Command from '../Command';
import { IPlayer } from '../../models/Player';
import { IBoardTile } from '../../models/BoardTile';
import { IHandTile } from '../../models/HandTile';
import Rules from '../../helpers/Rules';
import { Caste } from '../../types/GameTypes';
import { CASTES } from '../../constants';
import { FromTo } from '../../types';
import Valet from '../../helpers/Valet';

interface Argument {
    userId: string,
    gameId: string,
    play: {
        handTileId: number,
        boardTileIds: FromTo<number>,
        castes: FromTo<Caste>,
    },
}

type Response = void;

class PlayGameCommand extends Command<Argument, Response> {
    private game?: IGame;
    private player?: IPlayer;
    private handTile?: IHandTile;
    private boardTiles?: FromTo<IBoardTile | null>;
    private castes?: FromTo<Caste | null>;

    public constructor(argument: Argument) {
        super('PlayGameCommand', argument);
    }

    protected async doPrepare() {
        const { userId, gameId, play } = this.argument;
        const { handTileId, boardTileIds, castes } = play;

        // Get game and player
        this.game = await Game.getById(gameId);
        this.player = this.game.getPlayerByUserId(userId);

        // Ensure tile exists in player's hand (a hand tile should ALWAYS be provided!)
        this.handTile = this.player.getHand().getTileById(handTileId);

        // Ensure provided (!) board tiles exist in current game
        this.boardTiles = {
            from: boardTileIds.from ? this.game.getBoard().getTileById(boardTileIds.from) : null,
            to: boardTileIds.to ? this.game.getBoard().getTileById(boardTileIds.to) : null,
        };

        // Ensure provided (!) castes exist
        if (![castes.from, castes.to].filter(Boolean).map(caste => CASTES.includes(caste)).every(Boolean)) {
            throw new Error('Invalid caste provided.');
        }

        this.castes = {
            from: castes.from ?? null,
            to: castes.to ?? null,
        };
    }

    protected async doExecute() {
        const game = this.game!;
        const player = this.player!
        const handTile = this.handTile!;
        const boardTiles = this.boardTiles!;
        const castes = this.castes!;

        // Check if player's move respects game rules
        new Rules().canPlay(player, { handTile, boardTiles, castes });

        // Execute player's move
        await new Valet().execute(player, { handTile, boardTiles, castes });

        // Save game
        await game.save();
    }
}

export default PlayGameCommand;