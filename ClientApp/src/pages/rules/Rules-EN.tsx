import React from 'react';
import { connect } from 'react-redux';
import Dash from '../../components/buttons/Dash';
import HandTileComponent from '../../components/tiles/HandTileComponent';
import { PlayerColor, Caste, Figure, Action } from '../../types/GameTypes';
import { AppState } from '../../types/StateTypes';
import i18n from '../../i18n';
import './Rules.scss';

interface StateProps {
    language: i18n,
}

type Props = StateProps;

const Rules: React.FC<Props> = (props) => {
    const { language } = props;

    return (
        <div id='rules' className='page'>            
            <div className='wrapper'>
                <Dash onlyHome />

                <h1 className='head'>{language.getText('GAME_RULES')}</h1>
                
                <section id='rules--introduction' className='section'>
                    <h2 className='title title--section'>Introduction</h2>
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
                        The game <i>Samurai</i> allows you to take the role of a daimyo just
                        beginning ascent to power. Travel back to a Japan being torn asunder by warring clans.
                        Prove you have the wisdom to garner the esteem of the samurai, and you will unite a
                        nation.
                    </p>
                </section>

                <section id='rules--overview' className='section'>
                    <h2 className='title title--section'>Overview</h2>
                    <p className='text'>
                        During a game of <i>Samurai</i>, players compete over the three societal
                        castes of Japan: religion (represented by a <strong>buddha</strong>), commerce (represented
                        by <strong>rice</strong>), and military (represented by a <strong>house</strong>). Players
                        place tiles on the game board to influence settlement spaces (also called cities)
                        and capture the various caste pieces on those spaces. The player capturing the most pieces
                        of a particular caste becomes the leader of that caste. At the end of the game,
                        the player who is the leader of the <strong>most</strong> castes wins the game.
                    </p>
                </section>

                <section id='rules--playing' className='section'>
                    <h2 className='title title--section'>Playing</h2>
                    <p className='text'>
                        During a game, players take turns placing tiles on the game board and capturing caste pieces.
                        When all caste pieces have been captured, the game ends.
                    </p>
                    
                    <p className='text'>
                        Each player's turn can be summarized in three main steps, which happen in the following order:
                    </p>
                    <ol className='list'>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Playing a Tile</h3>
                                <p className='text'>
                                    First, the player chooses one tile from their hand and places it on an empty land or sea
                                    space (not a city) on the game board. They do so by clicking on the empty space of their
                                    choice, then selecting the tile they want to put on that space. Note that only ships can
                                    be placed onto water spaces.
                                </p>
                                <p className='text'>
                                    Two special tiles make an exception to this:
                                    the <strong>move</strong> and <strong>swap</strong> tiles. These are played by clicking
                                    directly on them in the player's hand. Those two special tiles are discussed in more
                                    details further down below, in the <strong>Action Tiles</strong> sub-section.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Capturing Caste Pieces</h3>
                                <p className='text'>
                                    If all <strong>land</strong> spaces adjacent to a city contain tiles, that city
                                    is surrounded and its caste pieces become captured. Adjacent sea spaces <strong>may</strong> be
                                    occupied by tiles, by they do <strong>not</strong> need to in order for a neighboring city
                                    to be considered surrounded.
                                </p>                                
                                <p className='text'>
                                    Once a city is surrounded, its caste pieces are distributed among the players, and their scores
                                    correspondingly updated (each caste piece amounts to a point in that caste). To determine who captures
                                    which caste piece, the <strong>caste influence</strong> value of the tiles which were set next to said
                                    city are added up for each player. The player who has the <strong>highest</strong> influence in a
                                    given caste wins all pieces of this caste.
                                </p>
                                <p className='text'>
                                    <strong>Note:</strong> the influence value of <strong>joker</strong> tiles counts for <strong>every</strong> caste!
                                    You'll find more details about the joker tiles in their corresponding sub-section further down this page.
                                </p>
                                <p className='text'>
                                    <strong>Watch out:</strong> if two or more players have an equal influence (which also happens to be the highest)
                                    in a given caste, <strong>none</strong> of them wins the corresponding pieces! 
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Refreshing the Player's Hand</h3>
                                <p className='text'>
                                    Each player starts the game with the same tile stack. However, the tiles are initially mixed, and
                                    the players are only allowed to see 5 of them at a time in what is refered to as
                                    their <strong>hand</strong>. Every time a player places a tile on the board, their hand
                                    is automatically refreshed: one of the tiles they haven't played yet is randomly picked from
                                    their stack, and inserted into their hand.
                                </p>
                            </section>
                        </li>
                    </ol>
                </section>

                <section id='rules--tiles' className='section'>
                    <h2 className='title title--section'>Tiles</h2>
                    <p className='text'>
                        Every player is given the same tile stack (which contains a total of <strong>20</strong> tiles) at the beginning of a game. Every tile
                        in this stack has the same color, which corresponds to the color assigned to the player, and can be categorized as follows:
                    </p>
                    
                    <ul className='list'>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Caste-specific Tiles</h3>
                                <p className='text'>
                                    Those tiles have an influence value that only applies to the caste depicted on them. The possible castes
                                    for these tiles are the three social castes in the game: <strong>military</strong>, <strong>religion</strong>,
                                    and <strong>commerce</strong>. Here is an example of this kind of tile for every caste:
                                </p>
                                <div className='images'>
                                    <HandTileComponent
                                        id={-1}
                                        color={PlayerColor.Purple}
                                        type={Caste.Military}
                                        strength={4}
                                    />
                                    <HandTileComponent
                                        id={-1}
                                        color={PlayerColor.Purple}
                                        type={Caste.Religion}
                                        strength={3}
                                    />
                                    <HandTileComponent
                                        id={-1}
                                        color={PlayerColor.Purple}
                                        type={Caste.Commerce}
                                        strength={1}
                                    />
                                </div>
                                <p className='text'>
                                    The first tile represents the <strong>military</strong> caste, and has an influence value
                                    of 4. The second one represents the <strong>religion</strong> caste, and has an influence
                                    value of 3. The third one represents the <strong>commerce</strong> caste, and has an
                                    influence value of 1. They are all purple because they belong to the player to which the
                                    color purple was assigned when the game was created.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Joker Tiles</h3>
                                <p className='text'>
                                    Joker tiles are special, because their influence value counts for <strong>every</strong> caste
                                    at the <strong>same</strong> time. They are represented by an image of a <strong>horse</strong> or
                                    a <strong>ship</strong>. Here is an example of the two types of joker tiles:
                                </p>
                                <div className='images'>
                                    <HandTileComponent
                                        id={-1}
                                        color={PlayerColor.Red}
                                        type={Figure.Samurai}
                                        strength={1}
                                    />
                                    <HandTileComponent
                                        id={-1}
                                        color={PlayerColor.Red}
                                        type={Figure.Ship}
                                        strength={2}
                                    />
                                </div>
                                <p className='text'>
                                    The first tile has an influence value of 1, and counts for <strong>every</strong> caste: military, religion,
                                    and/or commerce. The second one has an influence value of 2, an also counts for all possible castes. Both
                                    tiles belong to the player to which the color red has been assigned. Note that only the ship is colored
                                    in water tiles: the rest is blue to remind the player that those tiles can only be played onto sea spaces.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Action Tiles</h3>
                                <p className='text'>
                                    Some tiles have no influence value, yet allow the player to do specific <strong>actions</strong>, which might hold
                                    strategic value. Those are the action tiles. There is only <strong>two</strong> of those in each player's stack, and
                                    both are <strong>black</strong>. Here is a description of said action tiles:
                                </p>
                                <ul className='list'>
                                    <li className='item'>
                                        <section className='sub-sub-section'>
                                            <h4 className='title title--sub-sub-section'>Move Tile</h4>
                                            <p className='text'>
                                                The first action tile is the <strong>move</strong> tile. It is black, and has
                                                a zero on it. It allows the player to move one of the tiles that <strong>they</strong> (and
                                                only they) have <strong>previously</strong> placed on the board to a different space
                                                that's <strong>still</strong> free. Here is an example of the move tile (that would, in this
                                                case, belong to the orange player):
                                            </p>
                                            <div className='images'>
                                                <HandTileComponent
                                                    id={-1}
                                                    color={PlayerColor.Orange}
                                                    type={Action.Move}
                                                    strength={0}
                                                />
                                            </div>
                                        </section>
                                    </li>                                
                                    <li className='item'>
                                        <section className='sub-sub-section'>
                                            <h4 className='title title--sub-sub-section'>Swap Tile</h4>
                                            <p className='text'>
                                                The second action tile is the <strong>swap</strong> tile. It is black, and has all 3
                                                different castes on it. It allows the player to swap two caste pieces together from
                                                two <strong>different</strong> cities. It is a <strong>one-for-one</strong> exchange.
                                                This means a player <strong>cannot</strong> switch the entire content of a given city
                                                for another one: this tile only allows the exchange of <strong>single</strong> caste
                                                pieces.
                                            </p>
                                            <p className='text'>
                                                Watch out: once a caste piece has been won by a player, it can <strong>never</strong> come back into
                                                the game. A caste piece swap can only happen on the board, never between pieces that have already
                                                been captured by players.
                                            </p>
                                            <p className='text'>
                                                Here is an example of the swap tile (that would, in this case, belong to the orange player):
                                            </p>
                                            <div className='images'>
                                                <HandTileComponent
                                                    id={-1}
                                                    color={PlayerColor.Orange}
                                                    type={Action.Swap}
                                                    strength={0}
                                                    canReplay
                                                />
                                            </div>
                                        </section>
                                    </li>
                                </ul>                                
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Fast Tiles</h3>
                                <p className='text'>
                                    Some tiles have a little japanese symbol (a <strong>kanji</strong>, to be precise) on their bottom part.
                                    After having played one of those, the player is immediately allowed <strong>another</strong> turn. Here
                                    is an example of a tile that allows the player to replay (in this case, the green player):
                                </p>
                                <div className='images'>
                                    <HandTileComponent
                                        id={-1}
                                        color={PlayerColor.Green}
                                        type={Figure.Samurai}
                                        strength={2}
                                        canReplay
                                    />
                                </div>
                            </section>
                        </li>
                    </ul>
                </section>

                <section id='rules--hand' className='section'>
                    <h2 className='title title--section'>Tile Stack</h2>
                    <p className='text'>
                        The tile stack every player is given at the beginning of the game (although they're only
                        allowed a visible hand of 5 tiles at a time) is composed of the following tiles:
                    </p>
                    <ul className='list'>
                        <li className='item'>
                            <p className='text'>
                                1 caste-specific tile of influence value equal to <strong>4</strong> for <strong>every</strong> caste
                                (military, religion, commerce)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 caste-specific tile of influence value equal to <strong>3</strong> for <strong>every</strong> caste
                                (military, religion, commerce)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 caste-specific tile of influence value equal to <strong>2</strong> for <strong>every</strong> caste
                                (military, religion, commerce)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 joker tile of type <strong>horse</strong> and influence value equal
                                to <strong>3</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 joker tiles of type <strong>horse</strong> and influence value equal
                                to <strong>2</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 joker tiles of type <strong>horse</strong> and influence value equal
                                to <strong>1</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 joker tile of type <strong>horse</strong> and influence value equal
                                to <strong>1</strong>, which allows the player to <strong>replay</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 joker tile of type <strong>ship</strong> and influence value equal
                                to <strong>2</strong>, which allows the player to <strong>replay</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 joker tiles of type <strong>ship</strong> and influence value equal
                                to <strong>1</strong>, which allow the player to <strong>replay</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 action tile of type <strong>"tile move"</strong> (no influence value)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 action tile of type <strong>"caste figure swap"</strong> (no influence value), which
                                allows the player to <strong>replay</strong>
                            </p>
                        </li>
                    </ul>
                </section>

                <section id='rules--winning' className='section'>
                    <h2 className='title title--section'>Winning</h2>
                    <p className='text'>
                        The game ends when there is no caste figure left on the board. At this point, one
                        must be the leader of the <strong>most</strong> castes in order to win. For
                        instance, if a player manages to win the most houses as well as the most buddhas,
                        they become the leader in 2 out of 3 castes, which means they win the game.
                    </p>
                    <p className='text'>
                        However, since multiple players often fight over the same castes, it is possible, once
                        the game is over, that many players end up being the leader in one given (but different)
                        caste. In that case, the winner is picked between those leaders, and determined by
                        the <strong>total</strong> number of captured pieces, no matter the caste.
                    </p>
                    <p className='text'>
                        <strong>Warning:</strong> when multiple players have collected the same highest number
                        of figures for a given caste, <strong>none</strong> of them becomes its leader!
                    </p>
                </section>
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

export default connect(mapStateToProps)(Rules);