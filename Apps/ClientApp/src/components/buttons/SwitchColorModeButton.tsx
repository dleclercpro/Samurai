import React, { Dispatch } from 'react';
import './SwitchColorModeButton.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { ReactComponent as EyeIcon } from '../../icons/eye.svg';
import Button from './Button';
import { switchColorMode } from '../../actions/SettingsActions';

interface DispatchProps {
    switchColorMode: () => void,
}

type Props = DispatchProps;

const SwitchColorModeButton: React.FC<Props> = (props) => {
    const { switchColorMode } = props;

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

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    switchColorMode: () => dispatch(switchColorMode),
});

export default connect(() => ({}), mapDispatchToProps)(SwitchColorModeButton);