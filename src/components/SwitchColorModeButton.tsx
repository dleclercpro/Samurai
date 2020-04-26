import React, { Dispatch } from 'react';
import './SwitchColorModeButton.scss';
import { connect } from 'react-redux';
import { AppAction } from '../actions';
import { ReactComponent as EyeIcon } from '../icons/eye.svg';
import { switchColors } from '../actions/GameActions';
import Button from './Button';

interface DispatchProps {
    switchColors: () => void,
}

type Props = DispatchProps;

class SwitchColorModeButton extends React.Component<Props, {}> {

    render() {
        const { switchColors } = this.props;

        return (
            <Button
                id='switch-color-mode-button'
                action={switchColors}
                isActive
            >
                <EyeIcon className='icon-eye' />
            </Button>
        );   
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    switchColors: () => dispatch(switchColors),
});

export default connect(() => ({}), mapDispatchToProps)(SwitchColorModeButton);