import React, { Dispatch } from 'react';
import './SwitchColorModeButton.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { ReactComponent as EyeIcon } from '../../icons/eye.svg';
import { switchColorMode } from '../../actions/GameActions';
import Button from './Button';

interface DispatchProps {
    switchColorMode: () => void,
}

type Props = DispatchProps;

class SwitchColorModeButton extends React.Component<Props, {}> {

    render() {
        const { switchColorMode } = this.props;

        return (
            <Button
                id='switch-color-mode-button'
                action={switchColorMode}
                isActive
            >
                <EyeIcon className='icon' />
            </Button>
        );   
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    switchColorMode: () => dispatch(switchColorMode),
});

export default connect(() => ({}), mapDispatchToProps)(SwitchColorModeButton);