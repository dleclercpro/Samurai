import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { getData } from '../actions/ServerActions';
import { setGameId, setGameVersion } from '../actions/GameActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppAction } from '../actions';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import SpinnerOverlay from './overlays/SpinnerOverlay';
import Dash from './buttons/Dash';
import { POLL_RATE, MAX_POLL_RETRIES } from '../config';
import { isGameOver } from '../selectors';
import { openErrorDialog } from '../actions/AppActions';
import i18n from '../i18n';
import { log, warn } from '../logger';

interface OwnProps {
    routeId: string,
}

interface StateProps {
    id: string,
    language: i18n,
    isOver: boolean,
}

interface DispatchProps {
    setGameId: (id: string) => void,
    setGameVersion: (version: number) => void,
    getData: () => Promise<void>,
    openErrorDialog: (message: string, explanation: string, action: () => Promise<void>) => void,
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps;

interface State {
    isLoading: boolean,
    isPolling: boolean,
    nPollRetries: number,
    timer: NodeJS.Timeout | undefined,
}

class Game extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isLoading: true,
            isPolling: false,
            nPollRetries: 0,
            timer: undefined,
        };
    }

    componentDidMount() {
        const { id, routeId, setGameId, setGameVersion, getData } = this.props;

        // No need to reload game that's already loaded
        if (routeId === id) {
            this.hideSpinner();
            this.startPolling();
            
            return;
        }

        setGameId(routeId);
        setGameVersion(-1);

        getData()
            .catch((error: any) => {

                // Game data loading can't fail on first time!
                this.fail(error);
            })
            .finally(() => {
                this.hideSpinner();
                this.startPolling();
            });
    }

    componentWillUnmount() {
        this.stopPolling();
    }

    poll = () => {
        const { getData } = this.props;
        
        this.setState({
            isPolling: true,
        });
        
        getData()
            .then(() => {
                this.resetPollRetryCount();
            })
            .catch((error: any) => {
                const { nPollRetries } = this.state;

                if (nPollRetries === MAX_POLL_RETRIES) {
                    this.stopPolling();
                    this.fail(error);

                    return;
                }

                this.increaseRetryCount();
            })
            .finally(() => {
                this.setState({
                    isPolling: false,
                });
            });
    }

    fail = (error: any) => {
        const history = useHistory();
        const { id, language, openErrorDialog } = this.props;

        openErrorDialog(language.getText('GET_DATA_ERROR', { id }), error.message, () => {
            history.push('/');

            return Promise.resolve();
        });
    }

    startPolling = () => {
        this.setState({
            timer: setInterval(() => {
                const { isOver } = this.props;
                const { isPolling } = this.state;

                // No need to poll data from server once the game is over
                if (isOver) {
                    this.stopPolling();
                    return;
                }

                // Do not poll again if already waiting for an answer from the server
                if (!isPolling) {
                    this.poll();
                }
            }, POLL_RATE),
        });

        log('Started polling.');
    }

    stopPolling = () => {
        const { timer } = this.state;

        if (timer !== undefined) {
            clearInterval(timer);
        }

        this.setState({
            timer: undefined,
        });

        log('Stopped polling.');        
    }

    resetPollRetryCount = () => {
        this.setState({
            nPollRetries: 0,
        });
    }

    increaseRetryCount = () => {
        const { nPollRetries } = this.state;

        warn(`Poll retries: ${nPollRetries + 1}/${MAX_POLL_RETRIES}`);

        this.setState({
            nPollRetries: nPollRetries + 1,
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

const mapStateToProps = (state: AppState) => {
    const { id } = state.game;
    const { language } = state.settings;

    const isOver = isGameOver(state.players);

    return {
        id,
        language,
        isOver,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    setGameId: (id: string) => dispatch(setGameId(id)),
    setGameVersion: (version: number) => dispatch(setGameVersion(version)),
    getData: () => dispatch(getData()),
    openErrorDialog: (message: string, explanation: string, action: () => Promise<void>) => dispatch(openErrorDialog(message, explanation, action)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));