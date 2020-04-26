import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { setGameId } from '../actions/GameActions';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import { refreshGame } from '../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../types/StateTypes';
import SwitchColorModeButton from './SwitchColorModeButton';

interface OwnProps {
    id: number,
}

interface DispatchProps {
    setGameId: (id: number) => void,
    refreshGame: () => Promise<void>,
}

type Props = OwnProps & DispatchProps;

interface State {
    isLoaded: boolean,
}

class Game extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isLoaded: false,
        };
    }

    componentDidMount() {
        const { id, setGameId, refreshGame } = this.props;

        setGameId(id);

        refreshGame().then(() => {
            this.setState({
                isLoaded: true,
            });
        });
    }

    render() {
        const { isLoaded } = this.state;

        return isLoaded && (
            <React.Fragment>
                <Grid />
                <SwitchColorModeButton />
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    setGameId: (id: number) => dispatch(setGameId(id)),
    refreshGame: () => dispatch(refreshGame()),
});

export default connect(() => ({}), mapDispatchToProps)(Game);