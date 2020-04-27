import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { GameStep, Caste, CasteSwitchStep } from '../types/GameTypes';
import './CasteComponent.scss';
import { AppAction } from '../actions';
import { selectCasteFromForSwitch, selectCasteToForSwitch, deselectCasteFromForSwitch, deselectCasteToForSwitch } from '../actions/GameActions';
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
    selectCasteFromForSwitch: (caste: Caste) => void,
    selectCasteToForSwitch: (caste: Caste) => void,
    deselectCasteFromForSwitch: () => void,
    deselectCasteToForSwitch: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class CasteComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { step, caste, isPlayable, isSelected, selectCasteFromForSwitch, selectCasteToForSwitch, deselectCasteFromForSwitch, deselectCasteToForSwitch } = this.props;
        
        e.stopPropagation();

        if (isPlayable) {
            switch (step) {
                case CasteSwitchStep.ChooseCasteFrom:
                    selectCasteFromForSwitch(caste);
                    return;
                case CasteSwitchStep.ChooseFromDone:
                    isSelected ? deselectCasteFromForSwitch() : selectCasteFromForSwitch(caste);
                    return;
                case CasteSwitchStep.ChooseCasteTo:
                    selectCasteToForSwitch(caste);
                    return;
                case CasteSwitchStep.ChooseToDone:
                    isSelected ? deselectCasteToForSwitch() : selectCasteToForSwitch(caste);
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
    const { to, from } = selection.switch;

    const isChoosingFrom = step === CasteSwitchStep.ChooseCasteFrom;
    const isChoosingTo = step === CasteSwitchStep.ChooseCasteTo;
    const hasChosenFrom = step === CasteSwitchStep.ChooseFromDone;
    const hasChosenTo = step === CasteSwitchStep.ChooseToDone;

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
        selectCasteFromForSwitch: () => dispatch(selectCasteFromForSwitch(caste)),
        selectCasteToForSwitch: () => dispatch(selectCasteToForSwitch(caste)),
        deselectCasteFromForSwitch: () => dispatch(deselectCasteFromForSwitch),
        deselectCasteToForSwitch: () => dispatch(deselectCasteToForSwitch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CasteComponent);