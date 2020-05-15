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
                    <h2 className='title title--section'>Einführung</h2>
                    <p className='text'>
                        Es sind schwere Zeiten in feudalem Japan: der Krieg tobt und damals starke
                        Allianzen scheinen nun zerbrechlich zu sein. Reiche Feudalherrn streiten sich
                        zusammen um die Kontrolle über drei wichtige Ressourcen: die Unterstützung
                        anderer weniger mächtigen Feudalherrn, vor allem dessen Militär, die größten
                        Reisproduktionen des Landes und, schließlich, die Religion des Volkes.
                    </p>
                    <p className='text'>
                        Das Jahr ist 1336. Der zweite Versuch des Königs, durch die Kemmu-Restauration
                        seine Herrschaft festzustellen, ist kläglich gescheitert. Die königliche Familie hat
                        ihre Autorität verloren und nimmt an keine für das Land bedeutungsvolle Entscheidungen
                        mehr teil. Im ganzen Land werden immer mehr mächtige Feudalherrn, auch Daimyo genannt,
                        lauter: es will jeder die Macht über die Ressourcen des japanischen Kaiserreiches haben.
                        Als deren Einfluss auf die Nation wächst, versuchen Daimyo die Samurai zu überzeugen,
                        sich an ihrem Kampf zu beteiligen. Allerdings war es bisher niemandem gelungen, die Samurai
                        zu vereinigen, geschweige denn ganz Japan.
                    </p>
                    <p className='text'>
                        Das Spiel <i>Samurai</i> erlaubt dir die Rolle eines Daimyo anzunehmen, als er seinen Aufstieg
                        zur absoluten Macht beginnt. Begebe dich in einem vom Krieg zerrissenen Japan, in dem machtdurstige
                        Clans und deren Kriegsherren versuchen, ihre Dominanz auf das ganze Territorium zu etablieren.
                        Zeige, dass du über genug Weisheit verfügst, um den Respekt der Samurai zu gewinnen. Nur so wirst
                        du es schaffen, das Land der aufgehenden Sonne zu vereinigen.
                    </p>
                </section>

                <section id='rules--overview' className='section'>
                    <h2 className='title title--section'>Spielübersicht</h2>
                    <p className='text'>
                        Während eines Spieles <i>Samurai</i> begegnen sich die Spieler um die Kontrolle der drei sozialen
                        Kasten in feudalem Japan: die Religion (mit einem <strong>Buddha</strong> dargestellt), die
                        Wirtschaft (mit einer <strong>Reizpflanze</strong> dargestellt), und das Militär (mit
                        einem <strong>Häuschen</strong> dargestellt). Die Spieler setzen ihre Spielsteine auf das
                        Brett um ihre Influenz auf die verschiedenen Kolonien (auch Städte genannt) festzustellen, und
                        dadurch deren Kastenfiguren zu gewinnen. Der Spieler, dem es gelingt, die größte Anzahl an Figuren
                        einer gewissen Kaste zu gewinnen, wird zum Leiter dieser Kaste. Am Ende des Spieles gewinnt der Spieler,
                        der zum Leiter der <strong>meisten</strong> Kasten geworden ist.
                    </p>
                </section>

                <section id='rules--playing' className='section'>
                    <h2 className='title title--section'>Spielverlauf</h2>
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
                                    Lorsqu'une ville est entourée, chaque pion de caste y siégeant est remis au joueur l'ayant capturé, et les points
                                    de ce dernier sont respectivement mis à jour (chaque pion d'une caste donnée vaut un point pour cette même caste).
                                    Afin de déterminer qui capture chacun des pions, on additionne, pour chacun des joueurs, la
                                    valeur d'<strong>influence</strong> de toutes les tuiles posées sur la plaque de jeu et qui remplissent les
                                    conditions suivantes:
                                </p>
                                <ul className='list'>
                                    <li className='item'>
                                        <p className='text'>
                                            La tuile est adjacente à la ville entourée pour laquelle on détermine à qui revient chacun des pions y étant placés
                                        </p>
                                    </li>
                                    <li className='item'>
                                        <p className='text'>
                                            La tuile a une image correspondant à la caste du pion considéré, ou est de type <strong>joker</strong>.
                                            Davantage de détails sur les tuiles joker se trouvent dans la sous-section correspondante, plus bas dans
                                            cette page.
                                        </p>
                                    </li>
                                </ul>
                                <p className='text'>
                                    Le joueur dont la valeur d'influence totale est la <strong>plus grande</strong> pour une caste donnée est celui qui
                                    remporte tous les pions de cette caste.
                                </p>
                                <p className='text'>
                                    Attention: si plusieurs joueurs ont la même valeur d'influence et que cette même valeur est la plus grande pour une
                                    caste en question, <strong>personne</strong> ne remporte les pions de cette caste et ceux-ci sont simplement
                                    discartés.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Auffüllen der Hand des Spielers</h3>
                                <p className='text'>
                                    Chaque joueur débute la partie avec la même pile de tuiles. Toutefois, celles-ci sont mélangées,
                                    et il ne lui est possible de voir que 5 tuiles à tout moment, dans ce qui est appelé
                                    sa <strong>main</strong>. À chaque fois qu'un joueur place une tuile sur la plaque de jeu,
                                    sa main est automatiquement rafraîchie: l'une des tuiles qu'il n'a pas encore jouées et sélectionnée
                                    au hasard dans sa pile, puis insérée dans sa main.
                                </p>
                            </section>
                        </li>
                    </ol>
                </section>

                <section id='rules--tiles' className='section'>
                    <h2 className='title title--section'>Spielsteintypen</h2>
                    <p className='text'>
                        La pile de tuile avec laquelle chacun des joueurs commence une partie contient un total de <strong>20</strong> tuiles.
                        Chaque tuile de cette pile est de la même couleur, et cette dernière correspond à la couleur ayant été assignée au joueur
                        lors de la création de la partie. Voici une description de tous les types de tuile se retrouvant dans la pile du joueur:
                    </p>
                    
                    <ul className='list'>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Kastespezifische Spielsteine</h3>
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
                                <h3 className='title title--sub-section'>Joker-Spielsteine</h3>
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
                                <h3 className='title title--sub-section'>Aktion Spielsteine</h3>
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
                                <h3 className='title title--sub-section'>Schnelle Spielsteine</h3>
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
                                        canReplay
                                    />
                                </div>
                            </section>
                        </li>
                    </ul>
                </section>

                <section id='rules--hand' className='section'>
                    <h2 className='title title--section'>Spielsteine des Spielers</h2>
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
                                1 tuile d'action de type <strong>déplacement</strong> (sans valeur d'influence)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 tuile d'action de type <strong>échange</strong> (sans valeur d'influence) permettant au joueur
                                de <strong>rejouer</strong>
                            </p>
                        </li>
                    </ul>
                </section>

                <section id='rules--winning' className='section'>
                    <h2 className='title title--section'>Spielende</h2>
                    <p className='text'>
                        Pour gagner la partie, un joueur doit être le leader du <strong>plus grand nombre</strong> de
                        castes. À titre d'exemple, si un joueur arrive à capturer les plus grands nombres de maisons
                        et de buddhas, ce même joueur devient le leader de 2 des 3 castes, ce qui signifie qu'il ou elle
                        remporte la partie.
                    </p>
                    <p className='text'>
                        Néanmoins, comme il arrive souvent que plusieurs joueurs compétitionnent pour devenir le leader
                        d'une même caste, il est possible qu'une fois la plaque de jeu vide (de pions de caste),
                        plusieurs joueurs soient le leader d'une caste donnée (mais différente). Dans ce cas, le ou la
                        gagnante est déterminée entre les leaders par le nombre <strong>total</strong> de pions
                        que tout un chacun a capturés tout au long de la partie, peu importe leur caste.
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

export default connect(mapStateToProps, () => ({}))(Rules);