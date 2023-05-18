import React from 'react';
import './App.scss';
import DialogTileChoice from './dialogs/DialogTileChoice';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import FULL_HAND from '../data/FullHand.json';
import DialogGameOver from './dialogs/DialogGameOver';
import DialogCasteSwapStart from './dialogs/DialogCasteSwapStart';
import DialogCasteChoice from './dialogs/DialogCasteChoice';
import DialogCasteSwapEnd from './dialogs/DialogCasteSwapEnd';
import DialogTileMoveStart from './dialogs/DialogTileMoveStart';
import DialogTileMoveEnd from './dialogs/DialogTileMoveEnd';
import { AppState } from '../types/StateTypes';
import { ColorMode, Language } from '../types/GameTypes';
import DialogSuccess from './dialogs/DialogSuccess';
import DialogError from './dialogs/DialogError';
import { ThunkDispatch } from 'redux-thunk';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Game from './Game';
import { HandTileJSON } from '../types/ServerTypes';
import FormSignIn from './forms/FormSignIn';
import FormSignUp from './forms/FormSignUp';
import FormPlayGame from './forms/FormPlayGame';
import FormCreateGame from './forms/FormCreateGame';
import { verifyAuthentication } from '../actions/ServerActions';
import DialogNewTurn from './dialogs/DialogNewTurn';
import i18n from '../i18n';
import RulesEN from '../pages/rules/Rules-EN';
import RulesDE from '../pages/rules/Rules-DE';
import RulesFR from '../pages/rules/Rules-FR';
import { setFullHand } from '../actions/HandActions';

interface StateProps {
    language: i18n,
    isColorblind: boolean,
}

interface DispatchProps {
    verifyAuthentication: () => Promise<void>,
    setFullHand: (data: HandTileJSON[]) => void,
}

type Props = StateProps & DispatchProps;

class App extends React.Component<Props, {}> {
    
    componentDidMount() {
        const { verifyAuthentication, setFullHand } = this.props;

        verifyAuthentication();

        setFullHand(FULL_HAND);
    }

    render() {
        const { language, isColorblind } = this.props;
        const isEN = language.getLanguage() === Language.EN;
        const isDE = language.getLanguage() === Language.DE;
        const isFR = language.getLanguage() === Language.FR;

        return (
            <div id='app' className={`${isColorblind ? 'is-colorblind' : ''}`}>           
                <main id='main'>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/rules/'>
                            {isEN && <RulesEN />}
                            {isDE && <RulesDE />}
                            {isFR && <RulesFR />}
                        </Route>
                        <Route exact path='/game/:id/' render={({ match }) => (
                            <Game routeId={match.params.id} />
                        )}/>
                        <Route>
                            <Redirect to='/' />
                        </Route>
                    </Switch>
                </main>

                <section id='dialogs'>
                    <DialogSuccess />
                    <DialogError />
                    <DialogGameOver />
                    <DialogNewTurn />
                    <DialogTileChoice />
                    <DialogCasteChoice />
                    <DialogTileMoveStart />
                    <DialogTileMoveEnd />
                    <DialogCasteSwapStart />
                    <DialogCasteSwapEnd />
                </section>

                <section id='forms'>
                    <FormSignIn />
                    <FormSignUp />
                    <FormPlayGame />
                    <FormCreateGame />
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { language, colors } = state.settings;
    
    return {
        language,
        isColorblind: colors === ColorMode.Blind,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    verifyAuthentication: () => dispatch(verifyAuthentication()),
    setFullHand: (data: HandTileJSON[]) => dispatch(setFullHand(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);