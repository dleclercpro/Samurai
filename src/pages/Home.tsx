import React, { Dispatch } from 'react';
import Button from '../components/Button';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';
import { DialogType } from '../types/DialogTypes';
import { connect } from 'react-redux';
import './Home.scss';

interface DispatchProps {
    openSignUpDialog: () => void,
    openSignInDialog: () => void,
    openPlayGameDialog: () => void,
    openCreateGameDialog: () => void,
}

type Props = DispatchProps;

class Home extends React.Component<Props, {}> {

    render() {
        const { openSignInDialog, openSignUpDialog, openPlayGameDialog, openCreateGameDialog } = this.props;

        return (
            <div id='home' className='page'>
                <div className='buttons'>
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
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    openSignUpDialog: () => dispatch(openDialog(DialogType.SignUp)),
    openSignInDialog: () => dispatch(openDialog(DialogType.SignIn)),
    openPlayGameDialog: () => dispatch(openDialog(DialogType.PlayGame)),
    openCreateGameDialog: () => dispatch(openDialog(DialogType.CreateGame)),
});

export default connect(() => ({}), mapDispatchToProps)(Home);