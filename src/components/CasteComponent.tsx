import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { GameStep, Caste, CasteSwapStep } from '../types/GameTypes';
import './CasteComponent.scss';
import { AppAction } from '../actions';
import { selectCasteFromForSwap, selectCasteToForSwap, deselectCasteFromForSwap, deselectCasteToForSwap } from '../actions/GameActions';
import { ReactComponent as HouseIcon } from '../icons/house.svg';
import { ReactComponent as MonkIcon } from '../icons/monk.svg';
import { ReactComponent as RiceIcon } from '../icons/rice.svg';

interface OwnProps {
    caste: Caste,
}

interface StateProps {
    step: GameStep,
    isSelected: boolean,
    isPlayable: boolean,
}

interface DispatchProps {
    selectCasteFromForSwap: (caste: Caste) => void,
    selectCasteToForSwap: (caste: Caste) => void,
    deselectCasteFromForSwap: () => void,
    deselectCasteToForSwap: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class CasteComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { step, caste, isPlayable, isSelected, selectCasteFromForSwap, selectCasteToForSwap, deselectCasteFromForSwap, deselectCasteToForSwap } = this.props;
        
        e.stopPropagation();

        if (isPlayable) {
            switch (step) {
                case CasteSwapStep.ChooseCasteFrom:
                    selectCasteFromForSwap(caste);
                    return;
                case CasteSwapStep.ChooseFromDone:
                    isSelected ? deselectCasteFromForSwap() : selectCasteFromForSwap(caste);
                    return;
                case CasteSwapStep.ChooseCasteTo:
                    selectCasteToForSwap(caste);
                    return;
                case CasteSwapStep.ChooseToDone:
                    isSelected ? deselectCasteToForSwap() : selectCasteToForSwap(caste);
                    return;
            }
        }
    }

    render() {
        const { caste, isSelected, isPlayable } = this.props;

        const iconProps = {
            onClick: this.handleClick,
            className: `
                caste-component
                ${isPlayable ? 'is-playable' : ''}
                ${isSelected ? 'is-selected' : ''}
            `,
        };

        switch (caste) {
            case Caste.Military:
                return (<HouseIcon { ...iconProps } />);
            case Caste.Religion:
                return (<MonkIcon { ...iconProps } />);
            case Caste.Commerce:
                return (<RiceIcon { ...iconProps } />);
        }
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const { caste } = ownProps;
    const { self } = state.players;
    const { step, selection } = state.game;
    const { to, from } = selection.swap;

    const isChoosingFrom = step === CasteSwapStep.ChooseCasteFrom;
    const isChoosingTo = step === CasteSwapStep.ChooseCasteTo;
    const hasChosenFrom = step === CasteSwapStep.ChooseFromDone;
    const hasChosenTo = step === CasteSwapStep.ChooseToDone;

    const isSelected = (hasChosenFrom && caste === from.caste) || (hasChosenTo && caste === to.caste);    
    const isPlayable = self.isPlaying && (isChoosingFrom || hasChosenFrom || isChoosingTo || hasChosenTo);

    return {
        step,
        isSelected,
        isPlayable,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>, ownProps: OwnProps) => {
    const { caste } = ownProps;
    
    return {
        selectCasteFromForSwap: () => dispatch(selectCasteFromForSwap(caste)),
        selectCasteToForSwap: () => dispatch(selectCasteToForSwap(caste)),
        deselectCasteFromForSwap: () => dispatch(deselectCasteFromForSwap),
        deselectCasteToForSwap: () => dispatch(deselectCasteToForSwap),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CasteComponent);