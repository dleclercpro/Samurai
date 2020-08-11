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
                        Nacheinander setzen die Spieler ihre Spielsteine auf die Felder des Spielbrettes und versuchen, die
                        Kastenfiguren, die in verschiedenen Städten verteilt sind, zu erobern. Das Spiel endet erst, wenn
                        alle Figuren gewonnen bzw. aus dem Spielbrett entfernt worden sind.
                    </p>
                    
                    <p className='text'>
                        Jeder Spielzug erfolgt in 3 Schritten, die wie folgt zusammengefasst werden können:
                    </p>
                    <ol className='list'>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Spielstein auf ein Feld setzen</h3>
                                <p className='text'>
                                    Der aktive Spieler wählt ein freies Feld auf dem Spielbrett aus, auf das
                                    er einen Spielstein setzen will. Er darf überall spielen, nur nicht auf
                                    Felder, die Städte sind. Um dies zu tun, muss der Spieler auf besagtes freies Feld
                                    klicken, dann einen Spielstein in seiner Hand auswählen. Bitte beachten: es dürfen
                                    nur Spielsteine, die ein Schiff darstellen, auf Wasserfelder gesetzt werden.
                                </p>
                                <p className='text'>
                                    Es gibt allerdings zwei Spielsteine, die Ausnahmen dieser Regeln sind: es sind
                                    die <strong>Versetzen-</strong> und <strong>Umtausch-Spielsteine</strong>. Diese
                                    werden gespielt, indem man direkt auf sie (in der Hand des Spielers) klickt. Mehr
                                    Details zu diesen speziellen Spielsteinen gibt es im
                                    Abschnitt <strong>Aktion-Spielsteine</strong>.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Erwerben der Kastenfiguren</h3>
                                <p className='text'>
                                    Wenn alle <strong>Grundfelder</strong> um eine Stadt von Spielsteinen besetzt sind,
                                    dann gilt diese als geschlossen, und die Kastenfiguren, die auf besagter Stadt stehen,
                                    werden verteilt bzw. erworben. Die Felder, die eine Stadt umgeben und vom Typ Wasser
                                    sind, <strong>können</strong> besetzt sein. Sie müssen es dennoch <strong>nicht</strong> unbedingt
                                    sein, damit die Nachbarstadt als geschlossen betrachtet wird.
                                </p>
                                <p className='text'>
                                    Wenn eine Stadt geschlossen wird, werden ihre Kastenfiguren zwischen den Spielern verteilt, sowie die Punktzahlen
                                    deren Gewinner aktualisiert (jede Figur entspricht einem Punkt ihrer Kaste). Um zu bestimmen, wer welche Kastenfiguren
                                    erwirbt, muss der <strong>Influenzwert pro Kaste</strong> aller Spielsteine, die auf ein Nachbarfeld dieser Stadt
                                    gesetzt wurden, für jeden Spieler addiert werden. Derjenige, der den <strong>höchsten</strong> Influenzwert
                                    für eine gewisse Kaste hat, gewinnt alle Figuren dieser Kaste.
                                </p>
                                <p className='text'>
                                    <strong>Bitte beachten:</strong> der Influenzwert der <strong>Joker-Spielsteine</strong> zählt für alle Kasten!
                                    Mehr Details zu diesem Spielsteintypen im entsprechenden Abschnitt.
                                </p>
                                <p className='text'>
                                    <strong>Achtung:</strong> wenn mehrere Spieler denselben Influenzwert für eine Kaste haben, und dieser der grösste
                                    ist, dann gewinnt <strong>keiner</strong> die Figuren dieser Kaste. Diese werden einfach abgeworfen.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Auffüllen der Hand des Spielers</h3>
                                <p className='text'>
                                    Jeder Spieler fängt das Spiel an mit dem selben Spielsteinstapel. Dieser wird allerdings gemischt, und
                                    besagter Spieler darf zu jedem Zeitpunkt nur 5 Spielsteine sehen. Diese stellen seine <strong>Hand</strong> dar.
                                    Wenn ein Spieler einen Stein auf das Brett setzt, wird seine Hand immer automatisch aufgefüllt: es wird einen
                                    Spielstein, den der Spieler noch nicht gespielt hat, zufällig ausgewählt und in seine Hand hinzugefügt.
                                </p>
                            </section>
                        </li>
                    </ol>
                </section>

                <section id='rules--tiles' className='section'>
                    <h2 className='title title--section'>Spielsteintypen</h2>
                    <p className='text'>
                        Der Spielsteinstapel, mit dem jeder Spieler beginnt, enthält <strong>20</strong> Steine insgesamt.
                        Jeder Spielstein des Stapels eines Spielers ist gleich gefärbt, zwar mit der Farbe, die beim Erstellen des Spieles
                        dem besagten Spieler zugewiesen wurde. Die nachstehenden Angaben beschreiben alle Typen Spielsteine, die man in seinem
                        Stapel finden kann:
                    </p>
                    
                    <ul className='list'>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Kastenspezifische Spielsteine</h3>
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
                                <h3 className='title title--sub-section'>Aktion-Spielsteine</h3>
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
                                            <h4 className='title title--sub-sub-section'>Versetzen-Spielstein</h4>
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
                                            <h4 className='title title--sub-sub-section'>Umtausch-Spielstein</h4>
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
                        Die Spielsteine, über die jeder Spieler am Anfang eines Spieles verfügt (ohwohl er zu jedem Zeitpunkt
                        nur bis 5 Steine sehen darf), sind folgende:
                    </p>
                    <ul className='list'>
                        <li className='item'>
                            <p className='text'>
                                1 kastenspezifischer Spielstein, dessen Influenzwert gleich <strong>4</strong> ist, für <strong>jede</strong> Kaste
                                (Militär, Religion, Wirtschaft)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 kastenspezifischer Spielstein, dessen Influenzwert gleich <strong>3</strong> ist, für <strong>jede</strong> Kaste
                                (Militär, Religion, Wirtschaft)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 kastenspezifischer Spielstein, dessen Influenzwert gleich <strong>2</strong> ist, für <strong>jede</strong> Kaste
                                (Militär, Religion, Wirtschaft)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 Joker-Spielstein vom Typ <strong>Pferd</strong>, dessen Influenzwert gleich <strong>3</strong> ist
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 Joker-Spielstein vom Typ <strong>Pferd</strong>, dessen Influenzwert gleich <strong>2</strong> ist
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 Joker-Spielstein vom Typ <strong>Pferd</strong>, dessen Influenzwert gleich <strong>1</strong> ist
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 Joker-Spielstein vom Typ <strong>Pferd</strong>, dessen Influenzwert gleich <strong>1</strong> ist, und
                                dem Spieler erlaubt, gleich <strong>noch einmal</strong> zu spielen
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 Joker-Spielstein vom Typ <strong>Schiff</strong>, dessen Influenzwert gleich <strong>2</strong> ist, und
                                dem Spieler erlaubt, gleich <strong>noch einmal</strong> zu spielen
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 Joker-Spielstein vom Typ <strong>Schiff</strong>, dessen Influenzwert gleich <strong>1</strong> ist, und
                                dem Spieler erlaubt, gleich <strong>noch einmal</strong> zu spielen
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 Aktion Spielstein vom Typ <strong>„Spielstein Versetzen“</strong> (ohne Influenzwert)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 Aktion Spielstein vom Typ <strong>„Kastenfiguren Tauschen“</strong> (ohne Influenzwert), der dem Spieler erlaubt,
                                gleich <strong>noch einmal</strong> zu spielen
                            </p>
                        </li>
                    </ul>
                </section>

                <section id='rules--winning' className='section'>
                    <h2 className='title title--section'>Spielende</h2>
                    <p className='text'>
                        Das Spiel endet, wenn es keine Kastenfiguren mehr auf dem Spielbrett gibt.
                        Zu diesem Zeitpunkt muss der Spieler Leiter der <strong>meisten</strong> Kasten sein, um das
                        Spiel zu gewinnen. Wenn jemand, zum Beispiel, die größte Anzahl an Häuschen und Buddhas gesammelt
                        hat, dann ist er Leiter von 2 der 3 Kasten. So gewinnt er das Spiel.
                    </p>
                    <p className='text'>
                        Es kann vorkommen, dass am Ende des Spieles mehrere Spieler Leiter einer einzigen
                        (unterschiedlichen) Kaste sind. Wenn dies der Fall ist, gewinnt dann derjenige,
                        dessen <strong>Gesamtanzahl</strong> an gesammlten Figuren die größte ist.
                    </p>
                    <p className='text'>
                        <strong>Achtung:</strong> wenn mehrere Spieler dieselbe größte Anzahl Figuren einer gewissen
                        Kaste gesammelt haben, dann wird <strong>keiner</strong> von denen zum Leiter besagter Kaste!
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