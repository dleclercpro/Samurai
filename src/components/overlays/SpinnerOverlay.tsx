import React from 'react';
import './SpinnerOverlay.scss';
import Overlay from './Overlay';
import Spinner from '../Spinner';

const SpinnerOverlay: React.FC = () => (
    <Overlay id='spinner'>
        <Spinner />
    </Overlay>
);

export default SpinnerOverlay;