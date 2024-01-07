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
                        La guerre fait rage et les alliances se sont effritées au Japon féodal. De riches
                        seigneurs s'affrontent aux quatre coins de la nation dans le but de prendre
                        le contrôle de trois précieuses commodités: l'appui d'autres seigneurs
                        moins puissants, mais surtout celui de leurs armées, les terres hébergeant les
                        plus grandes productions de riz au pays, et, finalement, la religion du peuple.
                    </p>
                    <p className='text'>
                        Nous sommes en 1336. La dernière tentative de l'empereur visant à reprendre le pouvoir
                        via la restauration de Kenmu s'est avérée un échec lamentable. La famille royale a perdu
                        toute authorité et son pouvoir décisionnel a été réduit à néant. À travers tout le
                        pays, de puissants seigneurs, appelés daimyo, se sont levés et ont commencé à réclamer
                        leur part de pouvoir sur le territoire et les ressources de l'empire. Tandis que ceux-ci
                        gagnent en puissance, ils tentent, tant bien que mal, de réunir les samurais à leur cause.
                        Néanmoins, aucun daimyo n'a jamais réussi à unifier les samurais et, avec eux, le Japon
                        tout entier.
                    </p>
                    <p className='text'>
                        Le jeu <i>Samurai</i> te donne la chance de devenir un daimyo au début de son ascension
                        vers le pouvoir absolu. Revisite un Japon déchiré par des guerres de clans assoiffés de pouvoir.
                        Prouve que tu es doté d'une sagesse digne du respect des samurais, et tu parviendras à unifier
                        la nation du soleil levant.
                    </p>
                </section>

                <section id='rules--overview' className='section'>
                    <h2 className='title title--section'>Résumé du jeu</h2>
                    <p className='text'>
                        Lors d'une partie de <i>Samurai</i>, les joueurs s'affrontent pour le contrôle
                        des trois castes sociales au Japon seigneurial: la religion (représentée par
                        un <strong>buddha</strong>), le commerce (représenté par un plant
                        de <strong>riz</strong>), et l'armée (représentée par une <strong>maison</strong>).
                        Ils placent leurs tuiles sur le plateau de jeu afin d'établir leur influence
                        sur les diverses colonies (aussi appelées villes) et ainsi réclamer les pions de
                        caste qu'elles continennent. Le joueur qui réussit à capturer le plus de pions
                        d'une caste donnée devient le leader de cette caste. À la fin de la partie, le joueur
                        étant le leader du plus grand <strong>nombre</strong> de castes est déclaré vainqueur.
                    </p>
                </section>

                <section id='rules--playing' className='section'>
                    <h2 className='title title--section'>Déroulement d'une partie</h2>
                    <p className='text'>
                        À tour de rôle, les joueurs placent leurs tuiles sur le plateau de jeu et tentent
                        de capturer les pions de caste regroupés au sein des multiples villes. Lorsque
                        tous les pions ont été remportés (ou discartés), la partie prend fin.
                    </p>
                    
                    <p className='text'>
                        Le tour d'un joueur peut être résumé en trois étapes et ayant lieu dans l'ordre suivant:
                    </p>
                    <ol className='list'>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Jouer une tuile</h3>
                                <p className='text'>
                                    Le joueur actif choisit une tuile dans sa main ainsi qu'un emplacement libre
                                    sur la plaque de jeu où placer ladite tuile. Il peut s'agir d'un emplacement
                                    sur la terre ou sur l'eau, mais ça ne doit pas être une ville. Pour y arriver,
                                    le joueur clique sur l'emplacement en question, puis sélectionne la tuile désirée.
                                    À noter que seules les tuiles portrayant bateau peuvent être placées sur l'eau.
                                </p>
                                <p className='text'>
                                    Cela dit, deux tuiles spéciales font exception à la règle: il s'agit des
                                    tuiles <strong>déplacement</strong> et <strong>échange</strong>. Celles-ci peuvent
                                    être jouées en cliquant directement dessus depuis la main du joueur. Ces tuiles
                                    spéciales sont décrites dans plus amples détails plus bas dans cette page, dans la
                                    sous-section <strong>Tuiles d'action</strong>.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Capturer les pions de caste</h3>
                                <p className='text'>
                                    Si tous les espaces de <strong>terre</strong> adjacents à une ville donnée sont occupés par
                                    une tuile placée par l'une ou l'un des joueurs, cette ville est entourée et ses pions de caste
                                    capturés. Les espaces qui touchent à cette même ville et qui sont de type eau <strong>peuvent</strong> être 
                                    occupés par des tuiles. Cependant, il n'est <strong>pas</strong> nécessaire qu'ils le soient pour que la
                                    ville en question soit considérée comme étant entourée.
                                </p>
                                <p className='text'>
                                    Lorsqu'une ville est entourée, ses pions de caste sont distribués parmi les joueurs, et le pointage
                                    de ces derniers est mis à jour (chaque pion d'une caste donnée vaut un point pour cette même caste).
                                    Afin de déterminer qui capture chacun des pions, on additionne, pour chacun des joueurs, la
                                    valeur d'<strong>influence par caste</strong> des tuiles qu'il ou elle a posées autour de la ville
                                    en question. Le joueur dont la valeur d'influence totale est la <strong>plus grande</strong> pour
                                    une caste donnée est celui qui remporte tous les pions de cette caste.
                                </p>
                                <p className='text'>
                                    <strong>À noter:</strong> la valeur d'influence des tuiles de type <strong>joker</strong> est
                                    comptabilisée pour <strong>chacune</strong> des castes! Davantage de détails sur les tuiles joker se
                                    trouvent dans la sous-section correspondante, plus bas dans cette page.
                                </p>
                                <p className='text'>
                                    <strong>Attention:</strong> si plusieurs joueurs ont la même valeur d'influence et que cette même valeur est
                                    la plus grande pour une caste en question, <strong>personne</strong> ne remporte les pions de cette caste et
                                    ceux-ci sont simplement discartés.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Rafraîchissement de la main du joueur</h3>
                                <p className='text'>
                                    Chaque joueur débute la partie avec la même pile de tuiles. Toutefois, celles-ci sont mélangées,
                                    et il ne lui est possible de voir que 5 tuiles à tout moment, dans ce qui est appelé
                                    sa <strong>main</strong>. À chaque fois qu'un joueur place une tuile sur la plaque de jeu,
                                    sa main est automatiquement rafraîchie: l'une des tuiles qu'il n'a pas encore jouées est sélectionnée
                                    au hasard dans sa pile, puis insérée dans sa main.
                                </p>
                            </section>
                        </li>
                    </ol>
                </section>

                <section id='rules--tiles' className='section'>
                    <h2 className='title title--section'>Types de tuiles</h2>
                    <p className='text'>
                        La pile de tuile avec laquelle chacun des joueurs commence une partie contient un total de <strong>20</strong> tuiles.
                        Chaque tuile de cette pile est de la même couleur, et cette dernière correspond à la couleur ayant été assignée au joueur
                        lors de la création de la partie. Voici une description de tous les types de tuile se retrouvant dans la pile du joueur:
                    </p>
                    
                    <ul className='list'>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Tuiles de caste spécifique</h3>
                                <p className='text'>
                                    Ces tuiles ont une valeur d'influence qui ne s'applique qu'à la caste qu'elles représentent. Les castes pouvant être
                                    représentées sur ces tuiles correspondent aux trois castes sociales du jeu: l'<strong>armée</strong>,
                                    la <strong>religion</strong> et le <strong>commerce</strong>. Voici un exemple de ce genre de tuiles pour chacune des
                                    castes:
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
                                    La première tuile représente la caste de l'<strong>armée</strong> et a une valeur d'influence
                                    égale à 4. La seconde représente la caste de la <strong>religion</strong> et a une valeur
                                    d'influence égale à 3. La troisième représente la caste du <strong>commerce</strong> et a
                                    une valeur d'influence égale à 1. Elles sont toute de couleur mauve, car elles appartiennent
                                    toutes au joueur dont la couleur assignée au début de la partie est le mauve.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Tuiles de type joker</h3>
                                <p className='text'>
                                    Les tuiles joker sont spéciales, car leur valeur d'influence compte pour <strong>toutes</strong> les
                                    castes à la fois. Elles sont représentées par une image de <strong>cheval</strong> ou de <strong>bateau</strong>.
                                    Voici un exemple des deux types de tuiles joker pouvant être rencontrés en jeu:
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
                                    La première tuile a une valeur d'influence égale à 1 et compte pour <strong>toutes</strong> les castes,
                                    qu'il s'agisse de l'armée, de la religion et/ou du commerce. La deuxième a une valeur d'influence égale à 2
                                    et compte également pour toutes les castes. Ces deux tuiles appartiennent au joueur auquel la couleur orange
                                    a été assignée. À noter que seul le bateau est coloré à l'intérieur des tuiles de type eau: le reste de la
                                    tuile est bleu pour rappeler au joueur qu'elle ne peut être jouée que sur un espace d'eau de la plaque de jeu.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Tuiles d'action</h3>
                                <p className='text'>
                                    Certaines tuiles n'ont aucune valeur d'influence, mais permettent tout de même au joueur de poser
                                    certaines <strong>actions</strong> pouvant se révéler fort utiles pour celui ou celle-ci. Ce sont les tuiles
                                    d'<strong>action</strong>. Il n'y a que <strong>deux</strong> tuiles d'action dans la pile de tuiles dont
                                    dispose chaque joueur, et celles-ci sont <strong>noires</strong>. Voici une description plus détaillée
                                    de ces tuiles:
                                </p>
                                <ul className='list'>
                                    <li className='item'>
                                        <section className='sub-sub-section'>
                                            <h4 className='title title--sub-sub-section'>Tuile de déplacement</h4>
                                            <p className='text'>
                                                La première tuile d'action est la tuile de <strong>déplacement</strong>. Elle est noire et
                                                comporte le chiffre zéro. Elle permet au joueur de déplacer l'une des tuiles qu'il ou elle
                                                a <strong>déjà</strong> joué à un autre endroit (toujours <strong>libre</strong>) sur la plaque
                                                de jeu. Voici un exemple de la tuile de déplacement (qui appartiendrait au joueur orange,
                                                dans ce cas-ci):
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
                                            <h4 className='title title--sub-sub-section'>Tuile d'échange</h4>
                                            <p className='text'>
                                                La seconde tuile d'action est la tuile d'<strong>échange</strong>. Elle est noire et
                                                comporte le symbole de chacune des trois castes sociales du jeu. Elle permet au joueur
                                                d'échanger deux pions de caste situés dans deux villes <strong>différentes</strong>.
                                                Il s'agit d'un échange <strong>« un pour un »</strong>. Cela signifie qu'un joueur
                                                ne peut <strong>pas</strong> échanger tout le contenu d'une ville pour celui d'une autre:
                                                cette tuile permet l'échange de deux pions <strong>distincts</strong>.
                                            </p>
                                            <p className='text'>
                                                Attention: une fois capturé par un joueur, un pion de caste ne peut <strong>jamais</strong> revenir
                                                en jeu. Un échange peut avoir lieu sur la plaque de jeu, mais pas entre des pions déjà remportés
                                                par les joueurs.
                                            </p>
                                            <p className='text'>
                                                Voici un exemple de la tuile d'échange (qui appartiendrait au joueur orange, dans ce cas-ci):
                                            </p>
                                            <div className='images'>
                                                <HandTileComponent
                                                    id={-1}
                                                    color={PlayerColor.Orange}
                                                    type={Action.Swap}
                                                    strength={0}
                                                    replay
                                                />
                                            </div>
                                        </section>
                                    </li>
                                </ul>                                
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Tuiles rapides</h3>
                                <p className='text'>
                                    Certaines tuiles comportent un petit symbole japonais (un <strong>kanji</strong>, pour être exact)
                                    dans leur partie inférieure. Après avoir joué l'une de ces tuiles, un <strong>nouveau</strong> tour
                                    est immédiatement octroyé au joueur. Voici un exemple de tuile rapide, permettant au joueur de rejouer
                                    (dans ce cas-ci, le joueur vert):
                                </p>
                                <div className='images'>
                                    <HandTileComponent
                                        id={-1}
                                        color={PlayerColor.Green}
                                        type={Figure.Samurai}
                                        strength={2}
                                        replay
                                    />
                                </div>
                            </section>
                        </li>
                    </ul>
                </section>

                <section id='rules--hand' className='section'>
                    <h2 className='title title--section'>Tuiles du joueur</h2>
                    <p className='text'>
                        La pile de tuile dont dispose le joueur pour la partie (malgré qu'il ou elle ne puisse accéder qu'aux 5 tuiles
                        de sa main en tout temps) est composé des tuiles suivantes:
                    </p>
                    <ul className='list'>
                        <li className='item'>
                            <p className='text'>
                                1 tuile de caste spécifique, dont la valeur d'influence est égale à <strong>4</strong> pour <strong>chacune</strong> des
                                castes (armée, religion, commerce)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 tuile de caste spécifique, dont la valeur d'influence est égale à <strong>3</strong> pour <strong>chacune</strong> des
                                castes (armée, religion, commerce)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 tuile de caste spécifique, dont la valeur d'influence est égale à <strong>2</strong> pour <strong>chacune</strong> des
                                castes (armée, religion, commerce)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 tuile joker de type <strong>cheval</strong>, dont la valeur d'influence est égale à <strong>3</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 tuiles joker de type <strong>cheval</strong>, dont la valeur d'influence est égale à <strong>2</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 tuiles joker de type <strong>cheval</strong>, dont la valeur d'influence est égale à <strong>1</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 tuile joker de type <strong>cheval</strong>, dont la valeur d'influence est égale à <strong>1</strong>,
                                et permettant au joueur de <strong>rejouer</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 tuile joker de type <strong>bateau</strong>, dont la valeur d'influence est égale à <strong>2</strong>,
                                et permettant au joueur de <strong>rejouer</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 tuiles joker de type <strong>bateau</strong>, dont la valeur d'influence est égale à <strong>1</strong>,
                                et permettant au joueur de <strong>rejouer</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 tuile d'action <strong>« Tuile de déplacement »</strong> (sans valeur d'influence)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 tuile d'action <strong>« Tuile d'échange »</strong> (sans valeur d'influence) permettant au joueur
                                de <strong>rejouer</strong>
                            </p>
                        </li>
                    </ul>
                </section>

                <section id='rules--winning' className='section'>
                    <h2 className='title title--section'>Gagner la partie</h2>
                    <p className='text'>
                        La partie prend fin lorsqu'il ne reste plus aucun pion de caste sur le plaque de jeu.
                        À ce moment-là, un joueur doit être le leader du <strong>plus grand nombre</strong> de
                        castes pour gagner. À titre d'exemple, si un joueur arrive à capturer les plus grands
                        nombres de maisons et de buddhas, ce même joueur devient le leader de 2 des 3 castes,
                        ce qui signifie qu'il ou elle remporte la partie.
                    </p>
                    <p className='text'>
                        Néanmoins, comme il arrive souvent que plusieurs joueurs compétitionnent pour devenir le leader
                        d'une même caste, il est possible qu'une fois la partie terminée, plusieurs joueurs soient le
                        leader d'une caste donnée (mais différente). Dans ce cas, le ou la gagnante est déterminée entre
                        les leaders par le nombre <strong>total</strong> de pions que tout un chacun a capturés tout au
                        long de la partie, peu importe leur caste.
                    </p>
                    <p className='text'>
                        <strong>Attention:</strong> lorsque plusieurs joueurs ramassent le même plus grand nombre de
                        pions d'une caste donnée, <strong>aucun</strong> d'entre eux ne devient le leader de cette
                        caste!
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