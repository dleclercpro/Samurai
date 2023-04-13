import { PATH_BOARD_JSON, PATH_HAND_JSON } from '../config/AppConfig';
import { readJSONSync } from '../libs/file';
import { BoardJSON, HandJSON } from '../types/DataTypes';

class Data {
    private static instance: Data;
    
    private board: BoardJSON;
    private hand: HandJSON;

    private constructor(board: BoardJSON, hand: HandJSON) {
        this.board = board;
        this.hand = hand;
    }

    public static getInstance() {
        if (!Data.instance) {
            Data.instance = new Data(readJSONSync(PATH_BOARD_JSON), readJSONSync(PATH_HAND_JSON));
        }

        return Data.instance;
    }

    public getBoard() {
        return Data.instance.board;
    }

    public getHand() {
        return Data.instance.hand;
    }
}

export default Data.getInstance();