import React from 'react';

export class OnlyLogoLayout extends React.Component {
	constructor(props) {
		super(props);
		this.openDialog = this.openDialog.bind(this);
	}
	dialogRef = React.createRef(); // Ref for dialog component.

	/**
	 * Open modal dialog.
	 */
	openDialog() {
		this.dialogRef?.current.openDialog();
	}

	render() {
		return (
			<div className="app-logo-only-header-main">
				<div className="sticky-header">
					<div className="app-header d-flex justify-content-between">
						<a href="/" className="app-title">
							The Purple Swing
						</a>
					</div>
				</div>
			</div>
		);
	}
}
