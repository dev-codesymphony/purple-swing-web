import React from "react";
import { FooterComponent } from "../shared/footer";
import { HeaderComponent } from "../shared/header";
import { Pivot, PivotItem } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import groupImageOne from "../assets/images/group-image-one.png";
import groupImageTwo from "../assets/images/group-image-two.png";
import previewFeed from "../assets/images/preview-feed.png";
import previewMessages from "../assets/images/preview-messages.png";
import previewMyList from "../assets/images/preview-my-list.png";
import previewMyProfile from "../assets/images/preview-my-profile.png";

export class HomeComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.openDialog = this.openDialog.bind(this);
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
            <HeaderComponent ref={this.headerRef} />

            <div className="mobile-container">
                <h4 className="app-title">The Purple Swing</h4>
                <span className="description">Hey there! Just a heads up, we haven’t launched yet. But feel free to join the waitlist and we’ll send you a message as soon as we’re live!</span>
                <div className="mobile-button-div">
                    <DefaultButton text="Join waitlist" onClick={this.openDialog} allowDisabledFocus />
                </div>
            </div>

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
                <h1 className="home-title mid-section-title">It looks like this…</h1>
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

                <label className="hint-label">
                    *You can click on the different headers in the little screen above ⬆️ to get a better idea of what the website is like;)
                </label>
                <br />
                <img src={groupImageTwo} className="group-image-two" alt="Group of people" />

                {/**** bottom section ****/}
                <div className="bottom-section">
                    <label className="questions-form-label">
                        Questions you might have…
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