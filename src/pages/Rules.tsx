import React from 'react';
import { connect } from 'react-redux';
import './Rules.scss';
import { AppState } from '../types/StateTypes';
import i18n from '../i18n';
import DashLanguage from '../components/buttons/DashLanguage';

interface StateProps {
    language: i18n,
}

type Props = StateProps;

const Rules: React.FC<Props> = (props) => {
    const { language } = props;

    return (
        <div id='rules' className='page'>
            <DashLanguage />

            <div className='wrapper'>
                <h1 className='head'>{language.getText('RULES')}</h1>
                
                <h2 className='section'>Introduction</h2>
                <p className='text'>
                    It is a time of constant war and shifting loyalties in feudal Japan.
                    Lords across the nation fight for control of three precious commodities:
                    the loyalty of lesser lords, the land's primary sources of rice, and the
                    very religion of the people.
                </p>
                <p className='text'>
                    The year is 1336. The emperor's attempt at regaining power through the Kenmu
                    Restoration has failed. The royal family has lost all authority and has been
                    relegated to nothing more than figureheads. Across the country, powerful lords,
                    called daimyo, have risen up and begun to claim dominion over the land and its
                    resources. As these lords grow in power, they draw samurai to their cause.
                    However, no one daimyo has ever managed to unify the samurai and, with them,
                    Japan.
                </p>

                <p className='text'>
                    The game <strong>Samurai</strong> allows you to take the role of a daimyo just
                    beginning ascent to power. Travel back to a Japan being torn asunder by warring clans.
                    Prove you have the wisdom to garner the esteem of the samurai, and you will unite a
                    nation.
                </p>

                <h2 className='section'>Overview</h2>
                <p className='text'>
                    During a game of <strong>Samurai</strong>, players compete over the three societal
                    castes of Japan: religion (represented by <strong>buddhas</strong>), commerce (represented
                    by <strong>rice</strong>), and military (represented by <strong>houses</strong>). Players place
                    tiles on the game board to influence settlement spaces (also called <strong>cities</strong>)
                    and capture the various caste pieces on those spaces. The player capturing the most pieces
                    of a particular caste becomes the leader of that caste. At the end of the game,
                    the player who is the leader of the most castes wins the game.
                </p>

                <h2 className='section'>Playing</h2>
                <p className='text'>
                    During a game, players take turns placing tiles on the game board and capturing caste pieces.
                    When all caste pieces have been captured, the game ends.
                </p>
                
                <h3 className='subsection'>Turn Sequence</h3>
                <ol>
                    <li>
                        <h4 className='title'>Play Tile:</h4>
                        <p className='text'>
                            The player chooses one tile from his hand and places it on an empty land or sea space
                            (not a city) on the game board.
                        </p>
                    </li>
                    <li>
                        <h4 className='title'>Capture:</h4>
                        <p className='text'>
                            If all land spaces adjacent to a city contain tiles, that city's caste pieces become
                            captured (keep reading for more details about the resolution of captures).
                        </p>
                    </li>
                    <li>
                        <h4 className='title'>Refresh Hand:</h4>
                        <p className='text'>
                            After a player has played one of the tiles in his hand, the latter is randomly refreshed
                            with one of the remaining tiles from the original stack.
                        </p>
                    </li>
                </ol>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    const { language } = state.settings;
    
    return {
        language,
    };
}

export default connect(mapStateToProps, () => ({}))(Rules);