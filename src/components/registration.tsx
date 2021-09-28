import { ActionButton, Dropdown, DropdownMenuItemType, FontIcon, IDropdownOption, IDropdownStyles } from "@fluentui/react";
import React from "react";
import { mergeStyles } from '@fluentui/react/lib/Styling';

const options: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' },
];
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 514, height: 60 },
    title: { width: 514, height: 60, fontSize: 30, padding: 12 },
    caretDownWrapper: { top: 15, right: 17, "&& i": { fontSize: 30 } }
};
const iconClass = mergeStyles({
    fontSize: 20,
    height: 20,
    width: 20,
    margin: '-7px 17px 0px 17px',
});
export class RegistrationComponent extends React.Component {

    next() {

    }
    previous() {

    }

    render() {
        return <>
            <div className="registration-form d-flex justify-content-between align-items-center">
                <ActionButton className="step-button"><FontIcon aria-label="Compass" iconName="ChevronLeftSmall" className={iconClass} />back</ActionButton>
                <div className="first-step">
                    {/* ChevronLeftIcon
                        ChevronLeftMedIcon
                        ChevronLeftSmallIcon

                        ChevronRightIcon
                        ChevronRightMedIcon
                        ChevronRightSmallIcon */}

                    <div className="d-flex form-group">
                        <span> I am / we are:</span>
                        <Dropdown
                            options={options}
                            styles={dropdownStyles}
                        />
                    </div>
                </div>
                <ActionButton className="step-button">next <FontIcon aria-label="Compass" iconName="ChevronRightSmall" className={iconClass} /></ActionButton>
            </div>
        </>
    }
}