import React from 'react';
import './RefreshButton.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { ReactComponent as RefreshIcon } from '../../icons/refresh.svg';
import Button from './Button';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../types/StateTypes';
import { getData } from '../../actions/ServerActions';

interface DispatchProps {
    getData: () => Promise<void>,
}

type Props = DispatchProps;

class RefreshButton extends React.Component<Props, {}> {

    handleRefresh = () => {
        const { getData } = this.props;

        // We don't care if refreshing doesn't work
        getData()
            .catch(() => {});
    }

    render() {
        return (
            <Button
                id='refresh-button'
                action={this.handleRefresh}
                isActive
            >
                <RefreshIcon className='icon' />
            </Button>
        );   
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    getData: () => dispatch(getData()),
});

export default connect(() => ({}), mapDispatchToProps)(RefreshButton);