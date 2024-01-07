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
                        Es ist eine Zeit ständigen Krieges und wechselnder Loyalitäten im feudalen 
                        Japan. Herrscher im ganzen Land kämpfen um die Kontrolle über drei kostbare 
                        Güter: die Loyalität niedrigerer Herren, die primären Reisquellen des Landes 
                        und die Religion des Volkes.
                    </p>
                    <p className='text'>
                        Das Jahr ist 1336. Der Versuch des Kaisers, die Macht durch die Kenmu-
                        Restauration zurückzugewinnen, ist gescheitert. Die königliche Familie hat 
                        jegliche Autorität verloren und wurde zu nichts weiteres als Marionetten 
                        degradiert. Im ganzen Land sind mächtige Herren, die Daimyos, aufgestiegen 
                        und haben begonnen, Herrschaft über das Land und seine Ressourcen zu 
                        beanspruchen. Während diese Herren an Macht gewinnen, ziehen sie Samurai zu 
                        ihrer Sache hinzu. Allerdings hat es noch kein Daimyo geschafft, die Samurai 
                        zu vereinen und mit ihnen ganz Japan.
                    </p>
                    <p className='text'>
                        Das Spiel <i>Samurai</i> ermöglicht es dir, die Rolle eines Daimyos zu 
                        übernehmen, der gerade erst anfängt, an Macht zu gewinnen. Reise zurück in 
                        ein von kriegführenden Clans zerrissenes Japan. Beweise, dass du die Weisheit 
                        besitzt, die Achtung der Samurai zu erlangen, und du wirst eine Nation 
                        vereinen.
                    </p>
                </section>

                <section id='rules--overview' className='section'>
                    <h2 className='title title--section'>Übersicht</h2>
                    <p className='text'>
                        Während eines Spiels <i>Samurai</i> konkurrieren die Spieler um die drei 
                        gesellschaftlichen Kasten Japans: Religion (dargestellt durch einen 
                        <strong>Buddha</strong>), Handel (dargestellt durch <strong>Reis</strong>) und Militär 
                        (dargestellt durch ein <strong>Haus</strong>). Spieler setzen Plättchen auf das 
                        Spielbrett, um Siedlungen (auch Städte genannt) zu beeinflussen und die 
                        verschiedenen Kastenfiguren auf diesen Räumen zu erobern. Der Spieler, der die 
                        meisten Figuren einer bestimmten Kaste erobert, wird der Anführer dieser Kaste. 
                        Am Ende des Spiels gewinnt der Spieler, der der Anführer der 
                        <strong>meisten</strong> Kasten ist.
                    </p>
                </section>

                <section id='rules--playing' className='section'>
                    <h2 className='title title--section'>Spielen</h2>
                    <p className='text'>
                        Im Verlauf des Spiels setzen die Spieler abwechselnd Plättchen auf das 
                        Spielbrett und erobern Kastenfiguren. Wenn alle Kastenfiguren erobert wurden,
                        endet das Spiel.
                    </p>
                    
                    <p className='text'>
                        Jeder Spielerzug kann in drei Hauptphasen zusammengefasst werden, die in der
                        folgenden Reihenfolge stattfinden:
                    </p>
                    <ol className='list'>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Setzen eines Plättchens</h3>
                                <p className='text'>
                                    Zuerst wählt der Spieler ein Plättchen aus seiner Hand und setzt
                                    es auf ein leeres Land- oder Seefeld (nicht eine Stadt) auf dem 
                                    Spielbrett. Dies erfolgt durch Anklicken des leeren Felds seiner Wahl,
                                    dann Auswahl des Plättchens, das auf besagtes Feld gesetzt werden soll.
                                    Beachte, dass nur Schiffe auf Wasserfelder gesetzt werden dürfen.
                                </p>
                                <p className='text'>
                                    Zwei spezielle Plättchen bilden eine Ausnahme:
                                    die <strong>Bewegungs-</strong> und <strong>Tauschplättchen</strong>. Diese werden gespielt,
                                    indem direkt auf sie in der Hand des Spielers geklickt wird. Diese
                                    beiden speziellen Plättchen werden weiter unten im Abschnitt 
                                    <strong>Aktionsplättchen</strong> genauer besprochen.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Kastenfiguren erobern</h3>
                                <p className='text'>
                                    Wenn alle <strong>Land</strong>felder, die an eine Stadt angrenzen, mit Plättchen
                                    belegt sind, wird die Stadt umzingelt und ihre Kastenfiguren erobert.
                                    Angrenzende Seefelder <strong>können</strong> mit Plättchen belegt sein, müssen aber 
                                    <strong>nicht</strong>, damit eine benachbarte Stadt als umzingelt gilt.
                                </p>                                
                                <p className='text'>
                                    Sobald eine Stadt umzingelt ist, werden ihre Kastenfiguren unter den 
                                    Spielern verteilt, und ihre Punktzahlen entsprechend aktualisiert. 
                                    Um zu bestimmen, wer welche Kastenfiguren erobert, wird der 
                                    <strong>Kasteneinfluss</strong>wert der Plättchen, die neben der Stadt gesetzt 
                                    wurden, für jeden Spieler addiert. Der Spieler mit dem 
                                    <strong>höchsten</strong> Einfluss in einer gegebenen Kaste gewinnt alle Figuren 
                                    dieser Kaste.
                                </p>
                                <p className='text'>
                                    <strong>Hinweis:</strong> Der Einflusswert von <strong>Joker</strong>plättchen zählt für 
                                    <strong>jede</strong> Kaste! Weitere Details über die Jokerplättchen findest du in ihrem 
                                    entsprechenden Unterabschnitt weiter unten auf dieser Seite.
                                </p>
                                <p className='text'>
                                    <strong>Achtung:</strong> Wenn zwei oder mehr Spieler den gleichen 
                                    Einfluss (der auch der höchste ist) in einer gegebenen Kaste haben, 
                                    gewinnt <strong>keiner</strong> von ihnen die entsprechenden Figuren!
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Auffrischung der Hand des Spielers</h3>
                                <p className='text'>
                                    Jeder Spieler beginnt das Spiel mit dem gleichen Plättchenstapel. 
                                    Die Plättchen sind jedoch anfangs gemischt, und die Spieler dürfen 
                                    jeweils nur 5 von ihnen gleichzeitig in ihrer <strong>Hand</strong> sehen. 
                                    Jedes Mal, wenn ein Spieler ein Plättchen auf das Brett setzt, wird 
                                    seine Hand automatisch aufgefrischt: eines der Plättchen, die er 
                                    noch nicht gespielt hat, wird zufällig aus seinem Stapel ausgewählt 
                                    und in seine Hand eingefügt.
                                </p>
                            </section>
                        </li>
                    </ol>
                </section>





                <section id='rules--tiles' className='section'>
                    <h2 className='title title--section'>Plättchen</h2>
                    <p className='text'>
                        Jeder Spieler erhält zu Beginn des Spiels den gleichen Plättchenstapel 
                        (der insgesamt <strong>20</strong> Plättchen enthält). Jedes Plättchen in diesem Stapel 
                        hat die gleiche Farbe, die der dem Spieler zugewiesenen Farbe entspricht, und 
                        kann wie folgt kategorisiert werden:
                    </p>
                    
                    <ul className='list'>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Kastenspezifische Plättchen</h3>
                                <p className='text'>
                                    Diese Plättchen haben einen Einflusswert, der nur für die auf ihnen 
                                    dargestellte Kaste gilt. Die möglichen Kasten für diese Plättchen 
                                    sind die drei sozialen Kasten im Spiel: <strong>Militär</strong>, 
                                    <strong>Religion</strong> und <strong>Handel</strong>. Hier ist ein Beispiel 
                                    für diese Art von Plättchen für jede Kaste:
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
                                    Das erste Plättchen stellt die Kaste <strong>Militär</strong> dar und hat einen 
                                    Einflusswert von 4. Das zweite repräsentiert die Kaste <strong>Religion</strong> 
                                    mit einem Einflusswert von 3. Das dritte steht für die Kaste 
                                    <strong>Handel</strong> mit einem Einflusswert von 1. Sie sind alle lila, weil 
                                    sie dem Spieler gehören, dem beim Spielstart die Farbe Lila zugewiesen wurde.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Jokerplättchen</h3>
                                <p className='text'>
                                    Jokerplättchen sind besonders, da ihr Einflusswert für <strong>jede</strong> 
                                    Kaste zur <strong>gleichen</strong> Zeit zählt. Sie werden durch ein Bild eines 
                                    <strong>Pferdes</strong> oder eines <strong>Schiffes</strong> dargestellt. Hier ist 
                                    ein Beispiel für die beiden Arten von Jokerplättchen:
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
                                    Das erste Plättchen hat einen Einflusswert von 1 und zählt für 
                                    <strong>jede</strong> Kaste: Militär, Religion und/oder Handel. Das zweite hat 
                                    einen Einflusswert von 2 und zählt ebenfalls für alle möglichen Kasten. Beide 
                                    Plättchen gehören dem Spieler, dem die Farbe Rot zugewiesen wurde. Beachte, dass 
                                    nur das Schiff in Plättchen vom Wassertyp gefärbt ist: der Rest besagtes Plättchens ist
                                    blau, um den Spieler daran zu erinnern, dass diese Plättchen nur auf Seefelder gesetzt
                                    werden dürfen.
                                </p>
                            </section>
                        </li>
                        <li className='item'>
                            <section className='sub-section'>
                                <h3 className='title title--sub-section'>Aktionsplättchen</h3>
                                <p className='text'>
                                    Einige Plättchen haben keinen Einflusswert, ermöglichen es dem Spieler jedoch, 
                                    bestimmte <strong>Aktionen</strong> durchzuführen, die von strategischem Wert 
                                    sein können. Das sind die Aktionsplättchen. Davon gibt es nur 
                                    <strong>zwei</strong> in jedem Stapel eines Spielers, und beide sind 
                                    <strong>schwarz</strong>. Hier ist eine Beschreibung dieser Aktionsplättchen:
                                </p>
                                <ul className='list'>
                                    <li className='item'>
                                        <section className='sub-sub-section'>
                                            <h4 className='title title--sub-sub-section'>Bewegungsplättchen</h4>
                                            <p className='text'>
                                                Das erste Aktionsplättchen ist das <strong>Bewegungs</strong>plättchen. Es ist schwarz und 
                                                hat eine Null darauf. Es erlaubt dem Spieler, eines der Plättchen, die 
                                                <strong>er</strong> (und nur er) <strong>zuvor</strong> auf dem Brett gesetzt hat, auf ein 
                                                anderes <strong>noch freies</strong> Feld zu versetzen. Hier ist ein Beispiel für das 
                                                Bewegungsplättchen (das in diesem Fall dem orangen Spieler gehören würde):
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
                                            <h4 className='title title--sub-sub-section'>Tauschplättchen</h4>
                                            <p className='text'>
                                                Das zweite Aktionsplättchen ist das <strong>Tausch</strong>plättchen. Es ist schwarz und zeigt alle 3 
                                                verschiedenen Kasten darauf. Es erlaubt dem Spieler, zwei Kastenfiguren von 
                                                zwei <strong>verschiedenen</strong> Städten miteinander zu tauschen. Es handelt sich um einen 
                                                <strong>Eins-zu-eins</strong>-Austausch. Das bedeutet, ein Spieler <strong>kann</strong> nicht den 
                                                gesamten Inhalt einer Stadt gegen einen anderen austauschen: dieses Plättchen 
                                                erlaubt nur den Austausch von <strong>einzelnen</strong> Kastenfiguren.
                                            </p>
                                            <p className='text'>
                                                Achtung: Sobald eine Kastenfigur von einem Spieler gewonnen wurde, kann sie 
                                                <strong>niemals</strong> wieder ins Spiel kommen. Ein Kastenfigurentausch kann nur auf dem Brett 
                                                stattfinden, niemals zwischen Figuren, die bereits von Spielern erobert wurden.
                                            </p>
                                            <p className='text'>
                                                Hier ist ein Beispiel für das Tauschplättchen (das in diesem Fall dem orangen Spieler gehören würde):
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
                                <h3 className='title title--sub-section'>Schnellplättchen</h3>
                                <p className='text'>
                                    Einige Plättchen haben ein kleines japanisches Symbol (ein <strong>Kanji</strong>, um genauer zu sein) an ihrem unteren Teil.
                                    Nachdem eines davon gespielt wurde, darf der Spieler sofort <strong>einen weiteren</strong> Zug machen. Hier 
                                    ist ein Beispiel für ein Plättchen, das dem Spieler erlaubt, erneut zu spielen (in diesem Fall der grüne Spieler):
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
                    <h2 className='title title--section'>Plättchenstapel</h2>
                    <p className='text'>
                        Der Plättchenstapel, den jeder Spieler zu Beginn des Spiels erhält 
                        (obwohl sie jeweils nur eine sichtbare Hand von 5 Plättchen haben dürfen), 
                        setzt sich aus den folgenden Plättchen zusammen:
                    </p>
                    <ul className='list'>
                        <li className='item'>
                            <p className='text'>
                                1 kastenspezifisches Plättchen mit einem Einflusswert von <strong>4</strong> 
                                für <strong>jede</strong> Kaste (Militär, Religion, Handel)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 kastenspezifisches Plättchen mit einem Einflusswert von <strong>3</strong> 
                                für <strong>jede</strong> Kaste (Militär, Religion, Handel)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 kastenspezifisches Plättchen mit einem Einflusswert von <strong>2</strong> 
                                für <strong>jede</strong> Kaste (Militär, Religion, Handel)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 Jokerplättchen vom Typ <strong>Pferd</strong> mit einem Einflusswert von 
                                <strong>3</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 Jokerplättchen vom Typ <strong>Pferd</strong> mit einem Einflusswert von 
                                <strong>2</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 Jokerplättchen vom Typ <strong>Pferd</strong> mit einem Einflusswert von 
                                <strong>1</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 Jokerplättchen vom Typ <strong>Pferd</strong> mit einem Einflusswert von 
                                <strong>1</strong>, welches dem Spieler erlaubt, <strong>erneut zu spielen</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 Jokerplättchen vom Typ <strong>Schiff</strong> mit einem Einflusswert von 
                                <strong>2</strong>, welches dem Spieler erlaubt, <strong>erneut zu spielen</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                2 Jokerplättchen vom Typ <strong>Schiff</strong> mit einem Einflusswert von 
                                <strong>1</strong>, die dem Spieler erlauben, <strong>erneut zu spielen</strong>
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 Aktionsplättchen <strong>„Bewegungsplättchen“</strong> (ohne Einflusswert)
                            </p>
                        </li>
                        <li className='item'>
                            <p className='text'>
                                1 Aktionsplättchen <strong>„Tauschplättchen“</strong> (ohne Einflusswert), 
                                welches dem Spieler erlaubt, <strong>erneut zu spielen</strong>
                            </p>
                        </li>
                    </ul>
                </section>

                <section id='rules--winning' className='section'>
                    <h2 className='title title--section'>Gewinnen</h2>
                    <p className='text'>
                        Das Spiel endet, wenn keine Kastenfigur mehr auf dem Brett ist. Zu diesem Zeitpunkt 
                        muss man der Anführer der <strong>meisten</strong> Kasten sein, um zu gewinnen. 
                        Wenn beispielsweise ein Spieler die meisten Häuser sowie die meisten Buddhas gewinnt, 
                        wird er zum Anführer in 2 von 3 Kasten, was bedeutet, dass er das Spiel gewinnt.
                    </p>
                    <p className='text'>
                        Da jedoch mehrere Spieler oft um die gleichen Kasten kämpfen, ist es möglich, dass 
                        am Ende des Spiels viele Spieler Anführer in einer bestimmten (aber unterschiedlichen) 
                        Kaste sind. In diesem Fall wird der Gewinner unter diesen Anführern ausgewählt und 
                        nach der <strong>gesamten</strong> Anzahl der eroberten Figuren bestimmt, 
                        unabhängig von der Kaste.
                    </p>
                    <p className='text'>
                        <strong>Achtung:</strong> Wenn mehrere Spieler die gleiche höchste Anzahl 
                        von Figuren für eine bestimmte Kaste gesammelt haben, wird <strong>keiner</strong> 
                        von ihnen zum Anführer dieser Kaste!
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