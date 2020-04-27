import React from 'react';
import Button from '../components/Button';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';
import { DialogType } from '../types/DialogTypes';
import { connect } from 'react-redux';
import './Home.scss';
import { AppState } from '../types/StateTypes';
import { signOut } from '../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';

interface StateProps {
    isAuthenticated: boolean,
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
        const { isAuthenticated, resetUser, openSignInDialog, openSignUpDialog, openPlayGameDialog, openCreateGameDialog } = this.props;

        return (
            <div id='home' className='page'>
                <div className='buttons'>
                    {!isAuthenticated &&
                        <React.Fragment>
                            <Button
                                id='button-home-sign-in'
                                action={openSignInDialog}
                                isActive
                            >
                                Sign in
                            </Button>
                            <Button
                                id='button-home-sign-up'
                                action={openSignUpDialog}
                                isActive
                            >
                                Sign up
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
                                Sign out
                            </Button>
                            <Button
                                id='button-home-play-game'
                                action={openPlayGameDialog}
                                isActive
                            >
                                Play game
                            </Button>
                            <Button
                                id='button-home-create-game'
                                action={openCreateGameDialog}
                                isActive
                            >
                                Create game
                            </Button>
                        </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    resetUser: () => dispatch(signOut()),
    openSignUpDialog: () => dispatch(openDialog(DialogType.SignUp)),
    openSignInDialog: () => dispatch(openDialog(DialogType.SetUser)),
    openPlayGameDialog: () => dispatch(openDialog(DialogType.PlayGame)),
    openCreateGameDialog: () => dispatch(openDialog(DialogType.CreateGame)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);