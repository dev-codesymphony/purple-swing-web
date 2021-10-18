import React from "react";
import { Dialog } from '@fluentui/react/lib/Dialog';
import { TextField } from '@fluentui/react/lib/TextField';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { inputStyles } from "../app-consts/input-consts";
import { dialogContentProps, modalProps } from "../app-consts/modal-consts";
import { ToastContainer, toast } from 'react-toastify';

const initialState = {
    hideDialog: true,
    email: String(),
    city: String(),
    isSubmitted: false,
    isValid: false
}

export class JoinWaitlistDialogComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onFinished = this.onFinished.bind(this);
        this.validate = this.validate.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.fallbackCopyTextToClipboard = this.fallbackCopyTextToClipboard.bind(this);
        this.state = initialState; // Initialize state
    }

    /**
     * Open modal dialog.
     */
    openDialog() {
        this.setState({ hideDialog: false });
        document.getElementById("root")?.classList?.add("is-dialog-open");
    }

    /**
    * Close modal dialog.
    */
    closeDialog() {
        this.setState(initialState)
        document.getElementById("root")?.classList?.remove("is-dialog-open");
    }

    /**
     * Submit form.
     * @param event 
     */
    onFinished(event: any) {
        this.setState({ isSubmitted: true })
        event.preventDefault();
    }

    validate() {
        this.setState({ isValid: this.state.city && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.state.email) })
    }

    copyToClipboard() {
        if (navigator.clipboard) navigator.clipboard.writeText("http://thepurpleswing.com");
        else this.fallbackCopyTextToClipboard()
        toast.success("Copied to clipboard!");
    }
    fallbackCopyTextToClipboard() {
        var textArea = document.createElement("textarea");
        textArea.value = "http://thepurpleswing.com";

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand('copy');
        document.body.removeChild(textArea);
    }


    render() {
        return <>
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

                <form onSubmit={this.onFinished} autoComplete="off">
                    <TextField autoComplete="off" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" required={true} placeholder="Email" styles={inputStyles} onChange={(email) => { this.setState({ email: email.currentTarget.value }, () => { this.validate(); }) }} />
                    <TextField autoComplete="off" pattern="^[A-Za-z -]+$" required={true} placeholder="City" styles={inputStyles} onChange={(city) => { this.setState({ city: city.currentTarget.value }, () => { this.validate(); }) }} />
                    <DefaultButton hidden={this.state.isSubmitted} type="submit" className={"join-button " + (this.state.isValid ? "isvalid" : "")}>Join waitlist </DefaultButton>
                </form>

                {this.state.isSubmitted ? <label className="dialog-label">
                    Awesome, you’re on the list! 🥳<br />
                    <a href="javascript:;" onClick={this.copyToClipboard}><u>And here’s a link if you want to refer a friend.</u></a>
                </label> : <></>}
                <ToastContainer />
            </Dialog>
        </>
    }
}