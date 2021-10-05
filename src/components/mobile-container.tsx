import { DefaultButton, TextField } from "@fluentui/react";
import React from "react";
import { inputStyles } from "../app-consts/input-consts";

export class MobileContainerComponent extends React.Component {
    state = {
        isSubmitted: false,
        isValid: false,
        email: String(),
        city: String()
    }
    joinWaitlistForm = React.createRef();
    constructor(props: any) {
        super(props);
        this.onFinished = this.onFinished.bind(this);
        this.validate = this.validate.bind(this);
    }
    onFinished(event: any) {
        this.setState({ isSubmitted: true })
        event.preventDefault();
    }

    validate() {
        this.setState({ isValid: this.state.city && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.state.email) })
    }

    handleEmailChange() {
        this.validate()
    }

    render() {

        const description = false ? "Hey there! Just a heads up, we haven’t launched yet. But feel free to join the waitlist and we’ll send you a message as soon as we’re live!" :
            "Hey! Just a heads up, we haven’t launched yet, but enter your email and the city you live in below, and we’ll send you an invite as soon as we’re live!";
        return <>
            <div className="mobile-container">
                <h4 className="app-title">The Purple Swing</h4>
                <span className="description">{description}</span>

                <>
                    <form id="joinWaitlistForm" onSubmit={this.onFinished} autoComplete="off">
                        <TextField name="email" autoComplete="off" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" required={true} placeholder="Email" styles={inputStyles}
                            onChange={(email) => { this.setState({ email: email.currentTarget.value }, () => { this.validate(); }) }} />
                        <TextField name="city" autoComplete="off" pattern="^[A-Za-z -]+$" required={true} placeholder="City" styles={inputStyles}
                            onChange={(city) => { this.setState({ city: city.currentTarget.value }, () => { this.validate(); }) }} />

                        {this.state.isSubmitted ? <label className="dialog-label">
                            Awesome, you’re on the list! 🥳
                        </label> : <><div className="mobile-button-div">
                            {this.state.isValid ?
                                <DefaultButton type="submit" text="Join waitlist" allowDisabledFocus onClick={() => this.setState({ joinWaitlist: true })} />
                                :
                                <DefaultButton type="button" className="join-button">Join waitlist </DefaultButton>
                            }
                        </div></>}
                    </form>
                </>
            </div>
            {/* {this.state.joinWaitlist ?   : <div className="mobile-button-div">
                        <DefaultButton text="Join waitlist" allowDisabledFocus onClick={() => this.setState({ joinWaitlist: true })} />
                    </div>} */}
        </>
    }
}