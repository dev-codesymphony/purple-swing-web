import React from "react";
import { ActionButton } from '@fluentui/react/lib/Button';

export class FooterComponent extends React.Component {
    render() {
        return <>
            <div className="app-footer">
                <div className="app-mobile-footer">
                    {/* <ActionButton><a href="mailto:jesse@thepurpleswing.com">Contact </a></ActionButton> */}
                    <ActionButton onClick={(e) => {e.preventDefault();window.location.href='mailto:jesse@thepurpleswing.com';}}>Contact </ActionButton>
                    <ActionButton onClick={(e) => {e.preventDefault();window.location.href='https://getterms.io/view/idtbg/privacy/en-us';}}>Privacy Policy </ActionButton>
                    <ActionButton onClick={(e) => {e.preventDefault();window.location.href='https://getterms.io/view/idtbg/cookie/en-us';}}>Cookie Policy </ActionButton>
                    <ActionButton onClick={(e) => {e.preventDefault();window.location.href='https://getterms.io/view/idtbg/aup/en-us';}}>Acceptable Use Policy</ActionButton>
                    <ActionButton onClick={(e) => {e.preventDefault();window.location.href='https://getterms.io/view/idtbg/tos/en-us';}}>Terms of Use </ActionButton>
                </div>
            </div>
        </>
    }
}