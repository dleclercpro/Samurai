import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import SwitchColorModeButton from './SwitchColorModeButton';
import { refreshGame } from '../actions/ServerActions';
import { setGameId } from '../actions/GameActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppAction } from '../actions';

interface OwnProps {
    routeId: number,
}

interface StateProps {
    id: number,
}

interface DispatchProps {
    refreshGame: () => Promise<void>,
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
            isLoaded: props.id === props.routeId,
        };
    }

    componentDidMount() {
        const { routeId, setGameId, refreshGame } = this.props;
        const { isLoaded } = this.state;

        if (!isLoaded) {
            setGameId(routeId);

            refreshGame().then(() => {
                this.setState({
                    isLoaded: true,
                });
            });
        }
    }

    render() {
        const { isLoaded } = this.state;
        
        if (!isLoaded) {
            return null;
        }

        return (
            <React.Fragment>
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
    refreshGame: () => dispatch(refreshGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);