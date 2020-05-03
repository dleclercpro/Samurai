import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { getData } from '../actions/ServerActions';
import { setGameId, resetGameId, resetGameVersion } from '../actions/GameActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppAction } from '../actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import SpinnerOverlay from './overlays/SpinnerOverlay';
import Dash from './buttons/Dash';
import { REFRESH_RATE } from '../config';
import { isGameOver } from '../selectors';

interface OwnProps {
    id: number,
}

interface StateProps {
    isOver: boolean,
}

interface DispatchProps {
    setGameId: (id: number) => void,
    resetGameId: () => void,
    resetGameVersion: () => void,
    getData: () => Promise<void>,
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
        const { id, setGameId, resetGameId, resetGameVersion, getData } = this.props;

        this.showSpinner();

        setGameId(id);

        getData()
            .then(() => {
                this.startPolling();
            })
            .catch(() => {
                resetGameId();
                resetGameVersion();
            })
            .finally(() => {
                this.hideSpinner();
            });
    }

    componentWillUnmount() {
        const { resetGameId, resetGameVersion } = this.props;

        this.stopPolling();

        resetGameId();
        resetGameVersion();
    }

    poll = () => {
        const { getData } = this.props;
        
        getData()
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
    isOver: isGameOver(state.players),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    setGameId: (id: number) => dispatch(setGameId(id)),
    resetGameId: () => dispatch(resetGameId),
    resetGameVersion: () => dispatch(resetGameVersion),
    getData: () => dispatch(getData()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));