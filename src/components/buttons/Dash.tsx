import React from 'react';
import './Dash.scss';
import HomeButton from './HomeButton';
import SwitchColorModeButton from './SwitchColorModeButton';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';

interface OwnProps {
    onlyHome?: boolean,
}

interface StateProps {
    name: string,
}

type Props = OwnProps & StateProps;

const Dash: React.FC<Props> = (props) => {
    const { name, onlyHome } = props;

    return (
        <div id='dash'>
            <HomeButton />
            {!onlyHome &&
                <React.Fragment>
                    <SwitchColorModeButton />
                    <p className='game-name'>{name}</p>
                </React.Fragment>
            }
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    const { name } = state.game;

    return {
        name,
    };
};

export default connect(mapStateToProps)(Dash);