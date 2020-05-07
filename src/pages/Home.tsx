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
import DashHome from '../components/buttons/DashHome';

interface StateProps {
    isAuthenticated: boolean,
    language: i18n,
}

interface DispatchProps {
    resetUser: () => Promise<void>,
    openSignUpDialog: () => void,
    openSignInDialog: () => void,
    openPlayGameDialog: () => void,
    openCreateGameDialog: () => void,
}

type Props = StateProps & DispatchProps;

class Home extends React.Component<Props, {}> {

    render() {
        const { isAuthenticated, language, resetUser, openSignInDialog, openSignUpDialog, openPlayGameDialog, openCreateGameDialog } = this.props;

        return (
            <div id='home' className='page'>
                <DashHome />

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
                                action={resetUser}
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { isAuthenticated, language } = state.user;
    
    return {
        isAuthenticated,
        language,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    resetUser: () => dispatch(signOut()),
    openSignUpDialog: () => dispatch(openDialog(DialogType.SignUp)),
    openSignInDialog: () => dispatch(openDialog(DialogType.SignIn)),
    openPlayGameDialog: () => dispatch(openDialog(DialogType.PlayGame)),
    openCreateGameDialog: () => dispatch(openDialog(DialogType.CreateGame)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);