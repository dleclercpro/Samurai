import React from 'react';
import './LoadingOverlay.scss';
import Overlay from './Overlay';
import { AppState } from '../types/StateTypes';
import { connect } from 'react-redux';
import Spinner from './Spinner';

interface StateProps {
    isOpen: boolean,
}

type Props = StateProps;

class LoadingOverlay extends React.Component<Props, {}> {

    render() {
        const { isOpen } = this.props;

        if (!isOpen) {
            return null;
        }
    
        return (
            <Overlay id='loading'>
                <Spinner />
            </Overlay>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isOpen: state.overlay.loading.isOpen,
});

export default connect(mapStateToProps, () => ({}))(LoadingOverlay);