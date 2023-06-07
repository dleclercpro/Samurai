import BoardDataManager from './BoardDataManager';
import TestBoardDataManager from './TestBoardDataManager';

type BoardDataManagers = [BoardDataManager, BoardDataManager, BoardDataManager];

class DataManagers {
    private static instance: DataManagers;

    private boardDataManagers: BoardDataManagers;

    private constructor() {
        this.boardDataManagers = [
            new BoardDataManager(2),
            new BoardDataManager(3),
            new BoardDataManager(4),
        ];
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new DataManagers();
        }

        return this.instance;
    }

    // PUBLIC METHODS
    public getBoardDataManager(nPlayers: number) {
        return this.boardDataManagers[nPlayers - 2];
    }

    public getTestBoardDataManager(nPlayers: number) {
        return new TestBoardDataManager(nPlayers);
    }
}

export default DataManagers.getInstance();