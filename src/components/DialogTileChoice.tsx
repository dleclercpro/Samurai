import React from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from './Hand';

const DialogTileChoice: React.FC = (props) => (
    <Dialog type='player-tile-choice' headline='Player Tile Choice'>
        <section className='text'>
            <p>This is a test.</p>
        </section>
        <section className='tiles'>
            <Hand />
        </section>
    </Dialog>
);

export default DialogTileChoice;