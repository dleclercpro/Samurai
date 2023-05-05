import { exit } from 'process';
import { start, stop } from './app';
import CastePiecesBag from './helpers/CastePiecesBag';
import { readJSONSync } from './libs/file';
import { logger } from './utils/Logging';
import { getRange } from './libs/math';
import fs from 'fs';
import { BoardSection } from './models/Board';

const test = (nPlayers: number) => {
    const name = `test/TestBoard${nPlayers}Players.json`;
    const board = readJSONSync(`./public/${name}`);
    let excludedSections = [BoardSection.SwapTiles];

    const newBoard = board.sort((a: any, b: any) => {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    })
    console.log(newBoard);
    
    fs.writeFileSync(`./public/${name}`, JSON.stringify(newBoard, undefined, 2))
}

test(4);
exit();


// Run
start().catch(async (err) => {
    logger.fatal(err);

    await stop();
});