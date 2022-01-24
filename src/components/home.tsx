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
                <div ref={this.howItWorksRef} style={{ marginTop: 0 }}>
                    <label className="home-title mid-section-title">How it works…</label>
                    <div className="preview-section">
                        <Pivot defaultSelectedKey={"1"}>
                            <PivotItem headerText="My Lists" key="1">
                                <img src={previewMyList} alt="My Lists" />
                            </PivotItem>
                            <PivotItem headerText="Feed" key="2">
                                <img src={previewFeed} alt="Feed" />
                            </PivotItem>
                            <PivotItem headerText="Messages" key="3">
                                <img src={previewMessages} alt="Messages" />
                            </PivotItem>
                            <PivotItem headerText="My Profile" key="4">
                                <img src={previewMyProfile} alt="My Profile" />
                            </PivotItem>
                        </Pivot>
                    </div>
                </div>

                <label className="hint-label">
                    *You can click on the different headers in the panel above ⬆ to get a better idea of what the website is like;)
                </label>
                <br />
                <img src={groupImageTwo} className="group-image-two" alt="Group of people" />

                {/**** bottom section ****/}
                <div ref={this.faqRef} className="bottom-section">
                    <label className="questions-form-label">
                        FAQ…
                    </label>
                    <div className="question-form">
                        <p><span className="question-form-span"> How’s it different?</span> We’re not trying to reinvent the wheel. We really just want to give the swinger community a much better product than everything currently out there by combining our experience in swinging lifestyle with human-centric design and software engineering. </p>
                        <p><span className="question-form-span">Can non-members see my profile?</span> No, only members can.</p>
                        <p><span className="question-form-span">Is it totally free?</span> Yes, for now. We don’t think it’s fair to be asking anyone who does us a favour by using our platform in the early days to pay. So thank you to everyone who signs up for your support. We’re excited to grow this community with you! </p>
                        <p><span className="question-form-span">Where are you located?</span> We’re based in Vancouver, Canada, but the platform is open to everyone across the world. </p>
                        <p><span className="question-form-span">How do you deal with the problem of scammers/bots/‘time wasters’/dishonest users?</span> Two-factor authentication. Combining various metrics to help sort your feed, so the most sincere/serious users show up at the top. Encouraging users to report anything suspicious, harmful, etc.</p>
                        <p><span className="question-form-span">Do you require real names or facial pictures?</span> No, we don’t require either. We’re open to to whatever level of transparency you’re open to. If you want to use your real name or add photos of your face to your profile, that’s cool. And if not, that’s cool too. And yes, you can absolutely add naked photos to your profile.</p>
                        <p><span className="question-form-span">Is there an app?</span> Not yet, but there will be in hopefully not too long!</p>
                    </div>
                </div>
            </div>


            <FooterComponent />
        </>
    }
}