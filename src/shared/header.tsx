import React from "react";
import { ActionButton, DefaultButton } from '@fluentui/react/lib/Button';
import { JoinWaitlistDialogComponent } from "../components/join-waitlist-dialog";
import { Link } from "react-router-dom";

export class HeaderComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.openDialog = this.openDialog.bind(this);
    }
    dialogRef: any = React.createRef<JoinWaitlistDialogComponent>(); // Ref for dialog component.

    /**
     * Open modal dialog.
     */
    openDialog() {
        this.dialogRef?.current.openDialog();
    }

    render() {
        return <>
            <div className="app-header-main">
                <div className="sticky-header">
                    <div className="app-header d-flex justify-content-between">
                        <a href="#" className="app-title">The Purple Swing</a>
                        <div className="button-panel">
                            <ActionButton onClick={() => { this.props?.howItWorksRef?.current?.scrollIntoView() }}>How it works</ActionButton>
                            <ActionButton onClick={() => { this.props?.faqRef?.current?.scrollIntoView() }}>FAQ</ActionButton>
                            <DefaultButton text="Join waitlist" onClick={this.openDialog} allowDisabledFocus />
                            <DefaultButton className="register-btn"><Link to={"/registration"}>Registration</Link></DefaultButton>
                        </div>
                    </div>
                </div>
            </div>

            <JoinWaitlistDialogComponent ref={this.dialogRef} />
        </>
    }
}