import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import SwitchColorModeButton from './SwitchColorModeButton';
import { Redirect } from 'react-router-dom';

interface StateProps {
    isLoaded: boolean,
}

type Props = StateProps;

class Game extends React.Component<Props, {}> {

    render() {
        const { isLoaded } = this.props;

        if (!isLoaded) {
            return <Redirect to='/samurai/' />
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
    isLoaded: state.game.id !== -1,
});

export default connect(mapStateToProps, () => ({}))(Game);