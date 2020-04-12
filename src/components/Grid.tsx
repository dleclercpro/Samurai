import React from 'react';
import './Grid.scss';
import Board from './Board';
import Hand from './Hand';
import Dash from './Dash';
import SwitchColorButton from './SwitchColorButton';

const Grid: React.FC<{}> = () => (
    <div id='grid'>
        <section id='top'>
            <SwitchColorButton />
        </section>
        <section id='center'>
            <Board />
        </section>
        <section id='bottom'>
            <Hand />
            <Dash />
        </section>
    </div>
);

export default Grid;