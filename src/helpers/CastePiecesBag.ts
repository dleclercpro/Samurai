import { CASTES } from '../constants';
import { ErrorGameEmptyCastePiecesBag } from '../errors/GameErrors';
import { getRandom } from '../libs';
import { sum } from '../libs/math';
import { Caste } from '../types/GameTypes';

class CastePiecesBag {
    private counts: Record<Caste, number>;

    public constructor(nPlayers: number) {
        this.counts = {
            [Caste.Military]: this.getInitialCount(nPlayers),
            [Caste.Religion]: this.getInitialCount(nPlayers),
            [Caste.Commerce]: this.getInitialCount(nPlayers),
        }
    }

    private getInitialCount = (nPlayers: number) => {
        switch (nPlayers) {
            case 2:
                return 7;
            case 3:
                return 10;
            case 4:
                return 13;
            default:
                throw Error('Invalid number of players.');
        }
    }

    public hasNext() {
        return sum(Object.values(this.counts)) > 0;
    }

    public getNext() {
        while (this.hasNext()) {
            const caste = getRandom<Caste>(CASTES);

            if (this.counts[caste] > 0) {
                this.counts[caste] -= 1;

                return caste;
            }
        }
        throw new ErrorGameEmptyCastePiecesBag();
    }
}

export default CastePiecesBag;