import React from "react";
import { ActionButton } from '@fluentui/react/lib/Button';

export class FooterComponent extends React.Component {
    render() {
        return <>
            <div className="app-footer">
                <div className="app-mobile-footer">
                    <ActionButton>Contact </ActionButton>
                    <ActionButton>Privacy Policy </ActionButton>
                    <ActionButton>Terms of Use </ActionButton>
                </div>
            </div>
        </>
    }
}