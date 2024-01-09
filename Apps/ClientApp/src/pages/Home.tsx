import React from 'react';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';
import { DialogType } from '../types/DialogTypes';
import { connect } from 'react-redux';
import './Home.scss';
import { AppState } from '../types/StateTypes';
import { signOut } from '../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import Button from '../components/buttons/Button';
import i18n from '../i18n';
import DashLanguage from '../components/buttons/DashLanguage';
import { useHistory } from 'react-router-dom';

interface StateProps {
    isAuthenticated: boolean,
    language: i18n,
}

interface DispatchProps {
    logout: () => Promise<void>,
    openSignUpDialog: () => void,
    openSignInDialog: () => void,
    openPlayGameDialog: () => void,
    openCreateGameDialog: () => void,
}

type Props = StateProps & DispatchProps;

const Home: React.FC<Props> = (props) => {
    const history = useHistory();
    const { isAuthenticated, language, logout, openSignInDialog, openSignUpDialog, openPlayGameDialog, openCreateGameDialog } = props;

    const redirectToRules = () => {
        history.push('/rules');

        return Promise.resolve();
    }

    return (
        <div id='home' className='page'>
            <DashLanguage />

            <div className='buttons'>
                {!isAuthenticated &&
                    <React.Fragment>
                        <Button
                            id='button-home-sign-in'
                            action={openSignInDialog}
                            isActive
                        >
                            {language.getText('SIGN_IN')}
                        </Button>
                        <Button
                            id='button-home-sign-up'
                            action={openSignUpDialog}
                            isActive
                        >
                            {language.getText('SIGN_UP')}
                        </Button>
                    </React.Fragment>
                }
                {isAuthenticated &&
                    <React.Fragment>
                        <Button
                            id='button-home-sign-out'
                            action={logout}
                            isActive
                        >
                            {language.getText('SIGN_OUT')}
                        </Button>
                        <Button
                            id='button-home-play-game'
                            action={openPlayGameDialog}
                            isActive
                        >
                            {language.getText('PLAY_GAME')}
                        </Button>
                        <Button
                            id='button-home-create-game'
                            action={openCreateGameDialog}
                            isActive
                        >
                            {language.getText('CREATE_GAME')}
                        </Button>
                    </React.Fragment>
                }
                <Button
                    id='button-home-rules'
                    action={redirectToRules}
                    isActive
                >
                    {language.getText('GAME_RULES')}
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    const { isAuthenticated } = state.user;
    const { language } = state.settings;
    
    return {
        isAuthenticated,
        language,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    logout: () => dispatch(signOut()),
    openSignUpDialog: () => dispatch(openDialog(DialogType.SignUp)),
    openSignInDialog: () => dispatch(openDialog(DialogType.SignIn)),
    openPlayGameDialog: () => dispatch(openDialog(DialogType.PlayGame)),
    openCreateGameDialog: () => dispatch(openDialog(DialogType.CreateGame)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);