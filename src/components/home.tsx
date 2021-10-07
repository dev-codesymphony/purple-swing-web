import React from "react";
import { FooterComponent } from "../shared/footer";
import { HeaderComponent } from "../shared/header";
import { Pivot, PivotItem } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import groupImageOne from "../assets/images/group-image-one.svg";
import groupImageTwo from "../assets/images/group-image-two.svg";
import previewFeed from "../assets/images/preview-feed.svg";
import previewMessages from "../assets/images/preview-messages.svg";
import previewMyList from "../assets/images/preview-my-list.svg";
import previewMyProfile from "../assets/images/preview-my-profile.svg";
import { MobileContainerComponent } from "./mobile-container";

export class HomeComponent extends React.Component {
    howItWorksRef: any;
    faqRef: any;
    constructor(props: any) {
        super(props);
        this.openDialog = this.openDialog.bind(this);
        this.howItWorksRef = React.createRef();
        this.faqRef = React.createRef();
    }
    headerRef: any = React.createRef<HeaderComponent>(); // Ref for header component.

    /**
     * Open modal dialog.
     */
    openDialog() {
        this.headerRef?.current.openDialog();
    }
    render() {
        return <>
            <HeaderComponent ref={this.headerRef} howItWorksRef={this.howItWorksRef} faqRef={this.faqRef} />

            <MobileContainerComponent />

            <div className="container-fluid app-container">
                {/**** top section ****/}
                <div className="first-section">
                    <h1 className="home-title">
                        The Purple Swing is a website
                        <span className="title-highlight"> where swingers meet.</span> It’s
                        free to use.</h1>
                    <div className="image-container">
                        <img src={groupImageOne} className="group-image-one" alt="Group of people" />
                    </div>
                    <DefaultButton className="join-waitlist" text="Join waitlist" onClick={this.openDialog} allowDisabledFocus />
                </div>

                {/**** mid section ****/}
                <div ref={this.howItWorksRef} style={{ marginTop: 122 }}>
                    <label className="home-title mid-section-title">How it works…</label>
                    <div className="preview-section">
                        <Pivot>
                            <PivotItem headerText="My Lists">
                                <img src={previewMyList} alt="My Lists" />
                            </PivotItem>
                            <PivotItem headerText="Feed">
                                <img src={previewFeed} alt="Feed" />
                            </PivotItem>
                            <PivotItem headerText="Messages">
                                <img src={previewMessages} alt="Messages" />
                            </PivotItem>
                            <PivotItem headerText="My Profile">
                                <img src={previewMyProfile} alt="My Profile" />
                            </PivotItem>
                        </Pivot>
                    </div>
                </div>

                <label className="hint-label">
                    *You can click on the different headers in the little screen above ⬆ to get a better idea of what the website is like;)
                </label>
                <br />
                <img src={groupImageTwo} className="group-image-two" alt="Group of people" />

                {/**** bottom section ****/}
                <div ref={this.faqRef} className="bottom-section">
                    <label className="questions-form-label">
                        FAQ…
                    </label>
                    <div className="question-form">
                        <p>What is it? — It’s a website where you can meet other swingers.</p>
                        <p>Is it totally free?  — Yes</p>
                        <p>What about privacy? Do you require face pictures? — No, we don’t. We’re open to to whatever level of transparency you’re open to. If you want to add photos of your face to your profile, that’s cool. And if not, that’s cool too. And yes, you can absolutely upload naked photos to your profile, a lot people do.</p>
                        <p>Are most people on here couples or singles?</p>
                        <p>Is there an app?</p>
                    </div>
                </div>
            </div>

            <FooterComponent />
        </>
    }
}