import { ActionButton, Dropdown, DropdownMenuItemType, FontIcon, IDropdownOption, IDropdownStyles } from "@fluentui/react";
import React, { useState } from "react";
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { FaEnvelope, FaGoogle, FaFacebook } from 'react-icons/fa';
// import OtpInput from 'react-otp-input';

const options0: IDropdownOption[] = [
    { key: 'CA', text: 'CA' },
    { key: 'IN', text: 'IN' },
    { key: 'US', text: 'US' },
    { key: 'AUS', text: 'AUS' },
];

const options: IDropdownOption[] = [
    { key: 'single female', text: 'single female' },
    { key: 'single male', text: 'single male' },
    { key: 'female/male couple', text: 'female/male couple' },
    { key: 'female/female couple', text: 'female/female couple' },
    { key: 'male/male couple', text: 'male/male couple' },
    // { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    // { key: 'apple', text: 'Apple' },
    // { key: 'banana', text: 'Banana' },
    // { key: 'orange', text: 'Orange', disabled: true },
    // { key: 'grape', text: 'Grape' },
    // { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    // { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    // { key: 'broccoli', text: 'Broccoli' },
    // { key: 'carrot', text: 'Carrot' },
    // { key: 'lettuce', text: 'Lettuce' },
];
const lookingForOptions: IDropdownOption[] = [
    { key: 'single female', text: 'single female' },
    { key: 'single male', text: 'single male' },
    { key: 'female/male couple', text: 'female/male couple' },
    { key: 'female/female couple', text: 'female/female couple' },
    { key: 'male/male couple', text: 'male/male couple' },
    { key: 'anyone', text: 'anyone' },// (if this is chosen in on of the ‘add more’ boxes, delete all the other boxes
];
const countryOptions: IDropdownOption[] = [
    { key: 'India', text: 'India' },
];
const selectOptions: IDropdownOption[] = [
    { key: 'slect', text: 'select' },
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

export class RegistrationComponent extends React.Component<any, any>     {
    state: {
        step: number, 
        step_4Values: {
            dbdy: any,
            ibdy: any
        },
        step_3Values: any,
        step_2Values: {
            emailBtn: any,
        },
        step_1Values: any,
        step0Values: any,
        step1Values: any,
        step2Values: any,
        step3Values: {
            person1: any,
            person2: any
        },
        step4Values: {
            ebdy: any,
            tbdy: any
        },
        step5Values: any,
        step6Values: any,
        step7Values: any,
        step8Values: any,
    };
    
    constructor(props: any) {
        super(props);
        this.state = {
            step: -4,
            step_4Values: {
                dbdy: null,
                ibdy: null,
            },
            step_3Values: null,
            step_2Values: {
                emailBtn: null,
            },
            step_1Values: null,
            step0Values: null,
            step1Values: null,
            step2Values: null,
            step3Values: {
                person1: null,
                person2: null,
            },
            step4Values: {
                ebdy: null,
                tbdy: null,
            },
            step5Values: null,
            step6Values: null,
            step7Values: null,
            step8Values: null,
        }
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.validate = this.validate.bind(this)
    }
    validate() {
        if (this.state.step == -4)
            if (this.state.step_4Values
                // && this.state.step_4Values.dbdy) return true;
                && this.state.step_4Values.dbdy && this.state.step_4Values.ibdy && this.state.step_4Values.ibdy.length==10) return true ;
        if (this.state.step == -3 ) if (this.state.step_3Values) return true;
        // if (this.state.step == -2) if (this.state.step_2Values && this.state.step_2Values.emailBtn) return true;
        if (this.state.step == -2) if (this.state.step_2Values && this.state.step_2Values.emailBtn){
            let step = this.state.step
            return this.setState({ step: step + 1 })
        }
        if (this.state.step == -1 && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.state.step_1Values)) if (this.state.step_1Values) return true;
        if (this.state.step == 0) if (this.state.step0Values) return true;
        if (this.state.step == 1) if (this.state.step1Values) return true;
        if (this.state.step == 2) if (this.state.step2Values) return true;
        if (this.state.step == 5) if (this.state.step5Values) return true;
        if (this.state.step == 3)
            if (this.state.step3Values && this.state.step3Values.person1
                && this.state.step3Values.person2) return true;
        if (this.state.step == 4)
            if (this.state.step4Values
                && this.state.step4Values.ebdy && this.state.step4Values.tbdy) return true;
        if (this.state.step == 6) if (this.state.step6Values) return true;
        if (this.state.step == 7) if (this.state.step7Values && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.state.step7Values)) return true;
        if (this.state.step == 8) if (this.state.step8Values) return true;
        else return false;
    }
    next() {
        let step = this.state.step
        this.setState({ step: step + 1 })
    }
    previous() {
        let step = this.state.step
        this.setState({ step: step - 1 })
    }

    render() {
        const opacity = this.state.step == -4 || this.state.step > 8 ? "opac" : "";
        const nextOpct = this.state.step > 8 ? "opac" : "";
        const blurOpac = this.validate() ? "": "blurOpac"


        return <>
            <div className="registration-form d-flex justify-content-between align-items-center">
                <ActionButton onClick={this.previous} disabled={this.state.step == -4} className={"step-button " + opacity}><FontIcon aria-label="Compass" iconName="ChevronLeftSmall" className={iconClass} />back</ActionButton>
                {this.state.step == -4 ? <>
                    <p className="step-number">1/13</p>
                    <div className="d-flex flex-column text-center form-group phone-num">
                        <span className="reg-label"> Enter your mobile phone number and we'll send you a text message with a verification code</span>
                        <div className="d-sm-flex country-code">
                            <Dropdown
                                options={options0}
                                styles={dropdownStyles}
                                onChange={(e) => {
                                    this.setState({ step_4Values: {
                                        dbdy: e,
                                        ibdy:  this.state.step_4Values.ibdy} 
                                    })
                                }}
                            />
                            <input placeholder="" type="number" onChange={(e) => {
                                this.setState({
                                    step_4Values: {
                                        ibdy: e.currentTarget.value,
                                        dbdy:  this.state.step_4Values.dbdy}
                                })
                            }} />
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == -3 ? <>
                    <p className="step-number">2/13</p>
                    <div className="">

                        <div className="d-flex flex-column text-center form-group phone-otp">
                            <span className="reg-label"> Enter the code that was just sent to your mobile phone</span>
                            <input placeholder="" onChange={(e) => {
                                    this.setState({
                                        step_3Values: e.currentTarget.value
                                    })
                                }} />
                        </div>

                        <p className="text-center send-again-link"><a href='#'>Send again</a></p>
                    </div>
                </> : <></>}
                {this.state.step == -2 ? <>
                    <p className="step-number">3/13</p>
                    <div className="">

                        <div className="d-flex flex-column form-group">
                            {/* <span className="reg-label"> step_2Values:</span> */}
                            <button className="btn reg-link" value="email" onClick={(e) => {this.setState({ step_2Values:{emailBtn: e} }) }}> <FaEnvelope /> Containue with Email</button>
                            <button className="btn reg-link" value="google" onClick={(e) => {this.setState({ step_2Values:{googleBtn: e} }) }}><FaGoogle /> Containue with Google</button>
                            <button className="btn reg-link" value="facebook" onClick={(e) => {this.setState({ step_2Values:{facebookBtn: e} }) }}><FaFacebook /> Containue with Facebook</button>
                            {/* <p className="reg-link"><a href="/">Containue with Email</a></p>
                            <p className="reg-link"><a href="/">Containue with Google</a></p>
                            <p className="reg-link"><a href="/">Containue with Facebook</a></p> */}
                            {/* <Dropdown
                                options={options0}
                                styles={dropdownStyles}
                                onChange={(e) => {
                                    this.setState({ step_2Values: e })
                                }}
                            /> */}
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == -1 ? <>
                    <p className="step-number">4/13</p>
                    <div className="">

                        <div className="d-flex flex-column text-center form-group email-id">
                            <span className="reg-label"> Enter your email</span>
                            <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={(e) => { this.setState({ step_1Values: e.currentTarget.value }) }} />
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == 0 ? <>
                    <p className="step-number">5/13</p>
                    <div className="">

                        <div className="d-flex flex-column text-center form-group email-otp">
                            <span className="reg-label"> Enter the code that was just sent to your email</span>
                            <input placeholder="" onChange={(e) => {
                                this.setState({
                                    step0Values: e.currentTarget.value
                                })
                            }} />
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == 1 ? <>
                    <p className="step-number">6/13</p>
                    <div className="first-step">
                        {/* ChevronLeftIcon
                        ChevronLeftMedIcon
                        ChevronLeftSmallIcon

                        ChevronRightIcon
                        ChevronRightMedIcon
                        ChevronRightSmallIcon */}

                        <div className="d-flex form-group">
                            <span className="reg-label"> I am / we are:</span>
                            <Dropdown
                                options={options}
                                styles={dropdownStyles}
                                onChange={(e) => {
                                    this.setState({ step1Values: e })
                                }}
                            />
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == 2 ? <>
                    <p className="step-number">7/13</p>
                    <div className="d-flex form-group">
                        <span className="reg-label"> I am / we are looking for:</span>
                        <div className="add-more-div">
                            <Dropdown
                                options={lookingForOptions}
                                styles={dropdownStyles}
                                onChange={(e) => { this.setState({ step2Values: e }) }}
                            />
                            <p><a href="#">Add more</a></p>
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == 3 ? <>
                    <p className="step-number">8/13</p>
                    <div>
                        <div className="d-flex form-group" style={{ marginBottom: "31px" }}>
                            <span className="reg-label"> First name:</span>
                            <input placeholder="person 1" onChange={(e) => {
                                this.setState({
                                    step3Values: {
                                        person1: e.currentTarget.value,
                                        person2: this.state.step3Values.person2
                                    }
                                })
                            }} />
                        </div>
                        <div className="d-flex form-group">
                            <span className="reg-label"> First name:</span>
                            <input placeholder="person 2" onChange={(e) => {
                                this.setState({
                                    step3Values: {
                                        person1: this.state.step3Values.person1,
                                        person2: e.currentTarget.value
                                    }
                                })
                            }} />
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == 4 ? <>
                    <p className="step-number">9/13</p>
                    <div>
                        <div className="d-flex form-group" style={{ marginBottom: "31px" }}>
                            <div className="bdy">
                                <span className="reg-label"> {this.state.step3Values.person1}’s birthday:</span>
                            </div>
                            <Dropdown
                                options={selectOptions}
                                styles={dropdownStyles}
                                onChange={(e) => {
                                    this.setState({
                                        step4Values: {
                                            ebdy: e,
                                            tbdy: this.state.step4Values.tbdy
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="d-flex form-group">
                            <div className="bdy">
                                <span className="reg-label"> {this.state.step3Values.person2}’s birthday:</span>
                            </div>
                            <Dropdown
                                options={selectOptions}
                                styles={dropdownStyles}
                                onChange={(e) => {
                                    this.setState({
                                        step4Values: {
                                            tbdy: e,
                                            ebdy: this.state.step4Values.ebdy
                                        }
                                    })
                                }}
                            />
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == 5 ? <>
                    <p className="step-number">10/13</p>
                    <div className="d-flex form-group">
                        <span className="reg-label"> Country:</span>
                        <Dropdown
                            options={countryOptions}
                            styles={dropdownStyles}
                            onChange={(e) => { this.setState({ step5Values: e }) }}
                        />
                    </div>
                </> : <></>}
                {this.state.step == 6 ? <>
                    <p className="step-number">11/13</p>
                    <div>
                        <div className="d-flex form-group">
                            <span className="reg-label"> City:</span>
                            <input onChange={(e) => { this.setState({ step6Values: e.currentTarget.value }) }} />
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == 7 ? <>
                    <p className="step-number">12/13</p>
                    <div>
                        <div className="d-flex form-group">
                            <span className="reg-label"> Email:</span>
                            <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={(e) => { this.setState({ step7Values: e.currentTarget.value }) }} />
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == 8 ? <>
                    <p className="step-number">13/13</p>
                    <div>
                        <div className="d-flex form-group">
                            <span className="reg-label"> Password:</span>
                            <input type="password" onChange={(e) => { this.setState({ step8Values: e.currentTarget.value }) }} />
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == 9 ? <>
                    <div>
                        <div className="awe-final"> 
                            Awesome, you’ve created your profile! 🥳
                            <br />
                            <br />
                            After you’ve checked out the platform and gotten a sense of it, you can complete your profile (upload some photos, write your description, etc) in the <a href="javscript:;" className="prof-setting">Profile/Settings</a> section. (Don’t worry, we’ll show you exactly how to do it!)
                        </div>
                        <div className="alignRight take-me">
                            <ActionButton className={"step-button "}>take me to the show  <FontIcon aria-label="Compass" iconName="ChevronRightSmall" className={iconClass} /></ActionButton>
                        </div>
                    </div>
                </> : <></>}
                {this.state.step == 10 ? <>
                    <div className="choose-pictures d-flex">
                        <div></div>
                    </div>
                </> : <></>}

                <ActionButton disabled={!this.validate()} onClick={this.next} className={"step-button " + nextOpct + " " + blurOpac}>next <FontIcon aria-label="Compass" iconName="ChevronRightSmall" className={iconClass} /></ActionButton>
            </div>
        </>
    }
}