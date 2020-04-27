import React from 'react';
import Button from '../components/Button';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';
import { DialogType } from '../types/DialogTypes';
import { connect } from 'react-redux';
import './Home.scss';
import { AppState } from '../types/StateTypes';
import { logout } from '../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';

interface StateProps {
    isSignedIn: boolean,
}

interface DispatchProps {
    signOut: () => Promise<void>,
    openSignUpDialog: () => void,
    openSignInDialog: () => void,
    openPlayGameDialog: () => void,
    openCreateGameDialog: () => void,
}

type Props = StateProps & DispatchProps;

class Home extends React.Component<Props, {}> {

    render() {
        const { isSignedIn, signOut, openSignInDialog, openSignUpDialog, openPlayGameDialog, openCreateGameDialog } = this.props;

        return (
            <div id='home' className='page'>
                <div className='buttons'>
                    {!isSignedIn &&
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
                    {isSignedIn &&
                        <React.Fragment>
                            <Button
                                id='button-home-sign-out'
                                action={signOut}
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
    isSignedIn: state.user.isSignedIn,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    signOut: () => dispatch(logout()),
    openSignUpDialog: () => dispatch(openDialog(DialogType.SignUp)),
    openSignInDialog: () => dispatch(openDialog(DialogType.SignIn)),
    openPlayGameDialog: () => dispatch(openDialog(DialogType.PlayGame)),
    openCreateGameDialog: () => dispatch(openDialog(DialogType.CreateGame)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);