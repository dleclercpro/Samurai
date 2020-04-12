import React from 'react';
import './Grid.scss';
import Board from './Board';
import Hand from './Hand';
import Dash from './Dash';

interface OwnProps {
    isColorblind?: boolean,
}

type Props = OwnProps;

const Grid: React.FC<Props> = (props) => {
    const { isColorblind } = props;

    return (
        <div id='grid' className={`${isColorblind ? 'is-colorblind' : ''}`}>
            <section id='top'>
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
}

export default Grid;