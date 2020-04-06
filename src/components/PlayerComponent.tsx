import React from 'react';
import { PlayerScore, Caste } from '../types/GameTypes';
import './PlayerComponent.scss';
import { ReactComponent as HouseIcon } from '../icons/house.svg';
import { ReactComponent as MonkIcon } from '../icons/monk.svg';
import { ReactComponent as RiceIcon } from '../icons/rice.svg';

interface OwnProps {
    username: string,
    score: PlayerScore,
}

type Props = OwnProps;

const PlayerComponent: React.FC<Props> = (props) => {
    const { username, score } = props;

    return (
        <div className='player'>
            <h3 className='username'>{username}</h3>
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
                        <td><p className='value'>{score.get(Caste.Military)}</p></td>
                        <td><p className='value'>{score.get(Caste.Religion)}</p></td>
                        <td><p className='value'>{score.get(Caste.Commerce)}</p></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PlayerComponent;