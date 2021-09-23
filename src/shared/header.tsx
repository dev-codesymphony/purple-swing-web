import React from "react";
import { Dialog } from '@fluentui/react/lib/Dialog';
import { TextField } from '@fluentui/react/lib/TextField';
import { ActionButton, DefaultButton } from '@fluentui/react/lib/Button';
import { inputStyles } from "../app-consts/input-consts";
import { dialogContentProps, modalProps } from "../app-consts/modal-consts";

const initialState = {
    hideDialog: true,
    email: String(),
    city: String(),
    isSubmitted: false
}

export class HeaderComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onFinished = this.onFinished.bind(this);
        this.state = initialState; // Initialize state
    }

    /**
     * Open modal dialog.
     */
    openDialog() {
        this.setState({ hideDialog: false });
    }

    /**
    * Close modal dialog.
    */
    closeDialog() { this.setState(initialState) }

    /**
     * Submit form.
     * @param event 
     */
    onFinished(event: any) {
        this.setState({ isSubmitted: true })
        event.preventDefault();
    }

    render() {
        return <>
            <div className="app-header-main">
                <div className="app-header d-flex justify-content-between">
                    <h4 className="app-title">The Purple Swing</h4>
                    <div className="button-panel">
                        <ActionButton>How it works</ActionButton>
                        <ActionButton>FAQ</ActionButton>
                        <DefaultButton text="Join waitlist" onClick={this.openDialog} allowDisabledFocus />
                    </div>
                </div>
            </div>

            {/**** Join waitlist dialog. ****/}
            <Dialog
                hidden={this.state.hideDialog}
                onDismiss={this.closeDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}
                className="join-waitlist-dialog"
            >
                <label className="dialog-title">
                    We’re planning to launch sometime in late 2021. Enter your email and the city you live in below, and we’ll send you an invite as soon as we’re live!
                </label><br />

                <form onSubmit={this.onFinished}>
                    <TextField pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" required={true} placeholder="Email" styles={inputStyles} onChange={(email) => { this.setState({ email: email.currentTarget.value }) }} />
                    <TextField pattern="^[A-Za-z -]+$" required={true} placeholder="City" styles={inputStyles} onChange={(city) => { this.setState({ city: city.currentTarget.value }) }} />
                    <ActionButton hidden={this.state.isSubmitted} type="submit" className="join-button">Join waitlist </ActionButton>
                </form>

                {this.state.isSubmitted ? <label className="dialog-label">
                    Awesome, you’re on the list! 🥳<br />
                    <a href="/"><u>And here’s a link if you want to refer a friend.</u></a>
                </label> : <></>}
            </Dialog>
        </>
    }
}