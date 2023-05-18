import React from 'react';
import './HomeButton.scss';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import Button from './Button';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type Props = RouteComponentProps;

const HomeButton: React.FC<Props> = (props) => (
    <Button
        id='home-button'
        action={() => { props.history.push('/') }}
        isActive
    >
        <HomeIcon className='icon' />
    </Button>
);

export default withRouter(HomeButton);