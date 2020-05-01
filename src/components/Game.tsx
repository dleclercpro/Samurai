import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { loadGameData } from '../actions/ServerActions';
import { setGameId, resetGameId } from '../actions/GameActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppAction } from '../actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import SpinnerOverlay from './overlays/SpinnerOverlay';
import Dash from './buttons/Dash';
import { REFRESH_RATE } from '../config';
import { isGameOver } from '../selectors';

interface OwnProps {
    routeId: number,
}

interface StateProps {
    id: number,
    isOver: boolean,
}

interface DispatchProps {
    resetGameId: () => void,
    setGameId: (id: number) => void,
    loadGameData: () => Promise<void>,
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps;

interface State {
    isLoading: boolean,
    timer: NodeJS.Timeout | undefined,
}

class Game extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isLoading: true,
            timer: undefined,
        };
    }

    componentDidMount() {
        const { routeId, id, resetGameId, setGameId, loadGameData } = this.props;
        
        // Game IDs mismatch: reload
        if (routeId !== id) {
            this.showSpinner();

            setGameId(routeId);

            loadGameData()
                .then(() => {
                    this.startPolling();
                })
                .catch(() => {
                    resetGameId();
                })
                .finally(() => {
                    this.hideSpinner();
                });
        } else {
            this.hideSpinner();
        }
    }

    componentWillUnmount() {
        this.stopPolling();
    }

    poll = () => {
        const { loadGameData } = this.props;
 
        loadGameData()
            .catch(() => {
                this.stopPolling();
            });
    }

    startPolling = () => {
        this.setState({
            timer: setInterval(() => {
                const { isOver } = this.props;

                // No need to poll data from server once the game is over
                if (isOver) {
                    this.stopPolling();
                    return;
                }

                this.poll();
            }, REFRESH_RATE),
        });

        console.log('Started polling.');
    }

    stopPolling = () => {
        const { timer } = this.state;

        if (timer !== undefined) {
            clearInterval(timer);
        }

        this.setState({
            timer: undefined,
        });

        console.log('Stopped polling.');        
    }

    showSpinner = () => {
        this.setState({
            isLoading: true,
        });
    }

    hideSpinner = () => {
        this.setState({
            isLoading: false,
        });
    }

    render() {
        const { isLoading } = this.state;

        return (
            <React.Fragment>
                {isLoading && <SpinnerOverlay />}
                <Dash />
                <Grid />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    id: state.game.id,
    isOver: isGameOver(state.players),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    resetGameId: () => dispatch(resetGameId),
    setGameId: (id: number) => dispatch(setGameId(id)),
    loadGameData: () => dispatch(loadGameData()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));