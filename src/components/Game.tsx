import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import SwitchColorModeButton from './SwitchColorModeButton';
import { loadGameData } from '../actions/ServerActions';
import { setGameId } from '../actions/GameActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppAction } from '../actions';
import SpinnerOverlay from './SpinnerOverlay';

interface OwnProps {
    routeId: number,
}

interface StateProps {
    id: number,
}

interface DispatchProps {
    loadGameData: () => Promise<void>,
    setGameId: (id: number) => void,
}

type Props = OwnProps & StateProps & DispatchProps;

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
        const { routeId, id, setGameId, loadGameData } = this.props;
        
        // Game IDs mismatch: reload
        if (routeId !== id) {
            this.setState({
                isLoaded: false,
            });

            setGameId(routeId);

            loadGameData().then(() => {
                this.setState({
                    isLoaded: true,
                });
            });
        }
    }

    render() {
        const { isLoaded } = this.state;

        return (
            <React.Fragment>
                {!isLoaded && <SpinnerOverlay />}
                <Grid />
                <SwitchColorModeButton />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    id: state.game.id,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    setGameId: (id: number) => dispatch(setGameId(id)),
    loadGameData: () => dispatch(loadGameData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);