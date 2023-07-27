import React from 'react';
import { PlayerScore, Caste, PlayerColor } from '../../types/GameTypes';
import './ScorePlayer.scss';
import { ReactComponent as HouseIcon } from '../../icons/house.svg';
import { ReactComponent as MonkIcon } from '../../icons/monk.svg';
import { ReactComponent as RiceIcon } from '../../icons/rice.svg';
import { getColor } from '../../lib';
import { CASTES } from '../../constants';

interface OwnProps {
    username: string,
    score: PlayerScore,
    highestScores: PlayerScore,
    color: PlayerColor,
    isPlaying: boolean,
}

type Props = OwnProps;

const ScorePlayer: React.FC<Props> = (props) => {
    const { username, score, highestScores, color, isPlaying } = props;

    return (
        <div
            className={`
                score-player
                ${isPlaying ? 'is-playing' : ''}
                ${getColor(color)}
            `}
        >
            <h3 className='username'>
                {username}
            </h3>
            <table className='score'>
                <thead>
                    <tr>
                        <td><HouseIcon className='icon' /></td>
                        <td><MonkIcon className='icon' /></td>
                        <td><RiceIcon className='icon' /></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {CASTES.map((caste: Caste, index: number) => {
                            const hasHighest = highestScores.get(caste) === score.get(caste);
                            
                            return (
                                <td key={`score-player-cell-${index}`}>
                                    <p className={`value ${hasHighest ? 'is-highest' : ''}`}>
                                        {score.get(caste)}
                                    </p>
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ScorePlayer;