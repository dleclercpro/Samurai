import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { getData } from '../actions/ServerActions';
import { setGameId } from '../actions/GameActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppAction } from '../actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import SpinnerOverlay from './overlays/SpinnerOverlay';
import Dash from './buttons/Dash';
import { REFRESH_RATE, MAX_POLL_RETRIES } from '../config';
import { isGameOver } from '../selectors';
import { resetApp, openErrorDialog } from '../actions/AppActions';
import { redirectHome } from '../redirect';
import i18n from '../i18n';
import { log, warn } from '../logger';

interface OwnProps {
    routeId: number,
}

interface StateProps {
    id: number,
    language: i18n,
    isOver: boolean,
}

interface DispatchProps {
    setGameId: (id: number) => void,
    getData: () => Promise<void>,
    resetApp: () => Promise<void>,
    openErrorDialog: (message: string, explanation: string, action: () => Promise<void>) => void,
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps;

interface State {
    isLoading: boolean,
    nPollRetries: number,
    timer: NodeJS.Timeout | undefined,
}

class Game extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isLoading: true,
            nPollRetries: 0,
            timer: undefined,
        };
    }

    componentDidMount() {
        const { id, routeId, setGameId, getData } = this.props;

        // No need to reload game that's already loaded
        if (routeId === id) {
            this.hideSpinner();
            
            return;
        }

        setGameId(routeId);

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
            });
    }

    fail = (error: any) => {
        const { id, language, openErrorDialog } = this.props;

        openErrorDialog(language.getText('GET_DATA_ERROR', { id }), error.message, () => {
            const { resetApp } = this.props;
            
            // Reset app data after redirecting to home, so no weird state
            // changes appear on screen
            return redirectHome()
                .then(() => {
                    return resetApp();
                });
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
    setGameId: (id: number) => dispatch(setGameId(id)),
    getData: () => dispatch(getData()),
    resetApp: () => dispatch(resetApp()),
    openErrorDialog: (message: string, explanation: string, action: () => Promise<void>) => dispatch(openErrorDialog(message, explanation, action)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));