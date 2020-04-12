import React, { Dispatch } from 'react';
import './SwitchColorButton.scss';
import { connect } from 'react-redux';
import { AppAction } from '../actions';
import { ReactComponent as EyeIcon } from '../icons/eye.svg';
import { switchColors } from '../actions/GameActions';
import Button from './Button';

interface DispatchProps {
    switchColors: () => void,
}

type Props = DispatchProps;

class SwitchColorButton extends React.Component<Props, {}> {

    render() {
        const { switchColors } = this.props;

        return (
            <Button
                id='switch-color-button'
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

export default connect(() => ({}), mapDispatchToProps)(SwitchColorButton);