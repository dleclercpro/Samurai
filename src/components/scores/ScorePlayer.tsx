import React from 'react';
import { PlayerScore, Caste } from '../../types/GameTypes';
import './ScorePlayer.scss';
import { ReactComponent as HouseIcon } from '../../icons/house.svg';
import { ReactComponent as MonkIcon } from '../../icons/monk.svg';
import { ReactComponent as RiceIcon } from '../../icons/rice.svg';

interface OwnProps {
    username: string,
    score: PlayerScore,
    highestScores: PlayerScore,
    isPlaying: boolean,
}

type Props = OwnProps;

const ScorePlayer: React.FC<Props> = (props) => {
    const { username, score, highestScores, isPlaying } = props;

    return (
        <div
            className={`
                score-player
                ${isPlaying ? 'is-playing' : ''}
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
                        {[Caste.Military, Caste.Religion, Caste.Commerce].map((caste: Caste) => {
                            const hasHighest = highestScores.get(caste) === score.get(caste);
                            
                            return (
                                <td>
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