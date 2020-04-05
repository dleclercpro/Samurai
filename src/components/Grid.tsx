import React from 'react';
import './Grid.scss';
import Board from './Board';

const Grid: React.FC<{}> = () => (
    <div id='grid'>
        <section id='top'>

        </section>
        <section id='left'>

        </section>
        <section id='center'>
            <Board />
        </section>
        <section id='right'>

        </section>
        <section id='bottom'>

        </section>
    </div>
);

export default Grid;