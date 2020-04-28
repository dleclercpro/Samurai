import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import SwitchColorModeButton from './SwitchColorModeButton';
import { loadGameData } from '../actions/ServerActions';
import { setGameId, resetGameId } from '../actions/GameActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppAction } from '../actions';
import SpinnerOverlay from './SpinnerOverlay';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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
}

class Game extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isLoading: true,
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
                    this.hideSpinner();
                })
                .catch(() => {
                    resetGameId();

                    this.hideSpinner();
            
                    history.push(`/samurai/`);
                });
        }
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
    resetGameId: () => dispatch(resetGameId),
    setGameId: (id: number) => dispatch(setGameId(id)),
    loadGameData: () => dispatch(loadGameData()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));