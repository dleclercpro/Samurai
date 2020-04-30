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

interface OwnProps {
    routeId: number,
}

interface StateProps {
    id: number,
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
        const { routeId, id, resetGameId, setGameId, loadGameData, history } = this.props;
        
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
            
                    history.push(`/samurai/`);
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

    startPolling = () => {
        const { loadGameData } = this.props;

        // Poll new game data every minute
        this.setState({
            timer: setInterval(() => {
                loadGameData()
                    .catch(() => {
                        this.stopPolling();
                    });
            }, REFRESH_RATE * 100),
        });
    }

    stopPolling = () => {
        const { timer } = this.state;

        if (timer !== undefined) {
            clearInterval(timer);
        }

        this.setState({
            timer: undefined,
        });
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
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    resetGameId: () => dispatch(resetGameId),
    setGameId: (id: number) => dispatch(setGameId(id)),
    loadGameData: () => dispatch(loadGameData()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));