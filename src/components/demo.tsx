import {
	ActionButton,
	Dropdown,
	FontIcon,
	IDropdownOption,
	IDropdownStyles,
	IDatePickerStyles,
} from '@fluentui/react';
import React, { createRef } from 'react';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { FaEnvelope, FaGoogle, FaFacebook } from 'react-icons/fa';
import { apiCall } from '../functions/api';
import { toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import { OnlyLogoLayout } from '../shared/OnlyLogoLayout';

import { BASE_URL, GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from '../app.config';
import axios from 'axios';
// import OtpInput from 'react-otp-input';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from '@doopage/react-facebook-login';
import Loader from './Loader';
import { getYear, MONTHS } from '../functions/dateUtils';

const YEARS = getYear();

const options0 = [
	{ key: 'Canada', text: 'CA', prefix: '+1' },
	{ key: 'India', text: 'IN', prefix: '+91' },
	{ key: 'USA', text: 'US', prefix: '+1' },
	{ key: 'Australia', text: 'AUS', prefix: '+61' },
];

const options = [
	{ key: 'single female', text: 'single female', isSingle: true },
	{ key: 'single male', text: 'single male', isSingle: true },
	{ key: 'female/male couple', text: 'female/male couple', isSingle: false },
	{ key: 'female/female couple', text: 'female/female couple', isSingle: false },
	{ key: 'male/male couple', text: 'male/male couple', isSingle: false },
];

const lookingForDefaultOptions: IDropdownOption[] = [
	{ key: 'single female', text: 'single female' },
	{ key: 'single male', text: 'single male' },
	{ key: 'female/male couple', text: 'female/male couple' },
	{ key: 'female/female couple', text: 'female/female couple' },
	{ key: 'male/male couple', text: 'male/male couple' },
	{ key: 'anyone', text: 'anyone' }, // (if this is chosen in on of the ‘add more’ boxes, delete all the other boxes
];
const dropdownStyles: Partial<IDropdownStyles> = {
	dropdown: { width: 514, height: 60 },
	title: { width: 514, height: 60, fontSize: 30, padding: 12 },
	caretDownWrapper: { top: 15, right: 17, '&& i': { fontSize: 30 } },
};

const iconClass = mergeStyles({
	fontSize: 20,
	height: 20,
	width: 20,
	margin: '-7px 17px 0px 17px',
});

export class Demo extends React.Component<any, any> {
	state: {
		step: number;
		step_4Values: {
			dbdy: any;
			ibdy: any;
		};
		step_3Values: any;
		step_2Values: {
			emailBtn: any;
		};
		step_1Values: any;
		step0Values: any;
		step1Values: any;
		step2Values: any;
		step3Values: {
			person1: any;
			person2: any;
		};
		step4Values: {
			ebdy: any;
			tbdy: any;
		};
		step5Values: any;
		step6Values: any;
		step7Values: any;
		step8Values: any;
		lookingForOptions: any;
		isSingle: any;
		isLoading: any;
		isResendOtpDisabled: any;
		resendOtpTimerSeconds: any;
		resensdOtpTimerMinutes: any;
		password: any;
		password2: any;
		days1: any;
		days2: any;
		images: any;
	};

	constructor(props: any) {
		super(props);
		this.state = {
			step: -4,
			step_4Values: {
				dbdy: 'India',
				ibdy: '+91',
			},
			step_3Values: null,
			step_2Values: {
				emailBtn: null,
			},
			step_1Values: '',
			step0Values: null,
			step1Values: null,
			step2Values: [],
			step3Values: {
				person1: null,
				person2: null,
			},
			step4Values: {
				ebdy: {
					month: null,
					day: null,
					year: null,
				},
				tbdy: {
					month: null,
					day: null,
					year: null,
				},
			},
			step5Values: 'India',
			step6Values: null,
			step7Values: null,
			step8Values: null,
			lookingForOptions: [
				{ key: 'single female', text: 'single female' },
				{ key: 'single male', text: 'single male' },
				{ key: 'female/male couple', text: 'female/male couple' },
				{ key: 'female/female couple', text: 'female/female couple' },
				{ key: 'male/male couple', text: 'male/male couple' },
				{ key: 'anyone', text: 'anyone' }, // (if this is chosen in on of the ‘add more’ boxes, delete all the other boxes
			],
			isSingle: false,
			isLoading: false,
			isResendOtpDisabled: false,
			resendOtpTimerSeconds: 0,
			resensdOtpTimerMinutes: 1,
			password: '',
			password2: '',
			days1: [],
			days2: [],
			images: [],
		};
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.validate = this.validate.bind(this);
		this.resendOtp = this.resendOtp.bind(this);
		this.responseGoogle = this.responseGoogle.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.handlePerson1Change = this.handlePerson1Change.bind(this);
		this.handlePerson2Change = this.handlePerson2Change.bind(this);
		this.setLoading = this.setLoading.bind(this);
		this.startOtpTimer = this.startOtpTimer.bind(this);
		this.setDays1 = this.setDays1.bind(this);
		this.setDays2 = this.setDays2.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.getImageUrl = this.getImageUrl.bind(this);
	}

	imageRef: any = createRef();

	responseGoogle = async ({ profileObj, tokenId }: any) => {
		try {
			let jwt = localStorage.getItem('token');

			let response: any;

			if (tokenId) {
				response = await axios.post(
					`${BASE_URL}/auth/login`,
					{ login_type: 'google', token: tokenId },
					{ headers: { Authorization: `Bearer ${jwt}` } }
				);
			}

			if (response?.status === 200) {
				localStorage.setItem('email', response.data.data.user.Email);
				this.setEmail(response.data.data.user.Email);
				toast.success('Login Successful');
				this.setState((prevState: any) => {
					return { ...prevState, step: 1, step7Values: response.data.data.user.Email };
				});
			}
		} catch (error: any) {
			console.log(error);
			toast.error(error?.data?.message || error.message);
		}
	};

	startOtpTimer() {
		this.setState({ isResendOtpDisabled: true });
		const interval: any = setInterval(() => {
			if (this.state.resendOtpTimerSeconds > 0) {
				this.setState((prev: any) => {
					return { resendOtpTimerSeconds: prev.resendOtpTimerSeconds - 1 };
				});
			}

			if (this.state.resendOtpTimerSeconds === 0) {
				if (this.state.resensdOtpTimerMinutes === 0) {
					this.setState({
						isResendOtpDisabled: false,
						resensdOtpTimerMinutes: 1,
						resendOtpTimerSeconds: 0,
					});
					return clearInterval(interval);
				} else {
					this.setState((prev: any) => {
						return {
							resensdOtpTimerMinutes: prev.resensdOtpTimerMinutes - 1,
							resendOtpTimerSeconds: 59,
						};
					});
				}
			}
		}, 1000);
	}

	handleImageChange(e: any) {
		this.setState((prev: any) => {
			return { images: [...prev.images, e.target.files[0]] };
		});
	}

	removeImage(index: any) {
		const tempState = [...this.state.images];
		tempState.splice(index, 1);
		this.setState({ images: tempState });
	}

	getImageUrl(file: any) {
		return window.URL.createObjectURL(file);
	}

	async resendOtp(e: any) {
		e.preventDefault();
		try {
			let contactNumber = this.state.step_4Values.ibdy;
			const response = await axios.post(`${BASE_URL}/auth/send-otp`, {
				mobile: contactNumber,
			});

			if (response.status === 200) {
				toast.success('OTP resend successfully');
				this.startOtpTimer();
				return { success: true, message: response?.data?.data?.message };
			}
			throw new Error('Something went wrong');
		} catch (error: any) {
			console.log('custom error', error, ' <<===== error');
			toast.error(error?.data?.message || error.message);
		}
	}

	responseFacebook = async (profile: any) => {
		const { accessToken } = profile;
		let jwt = localStorage.getItem('token');

		const response = await axios.post(
			`${BASE_URL}/auth/login`,
			{ login_type: 'facebook', token: accessToken },
			{ headers: { Authorization: `Bearer ${jwt}` } }
		);

		if (response.status === 200) {
			localStorage.setItem('email', response.data.data.user.Email);
			this.setEmail(response.data.data.user.Email);
			toast.success('Login Successful');

			this.setState((prevState: any) => {
				return { ...prevState, step: 1, step7Values: response.data.data.user.Email };
			});
		}
	};

	addMore = (e: any) => {
		this.setState({ step2Values: [...this.state.step2Values, ''] });
	};

	setStep2Value = (e: any, index: any) => {
		if (!this.state.step2Values.includes(e))
			this.setState((state: any) => {
				if (e === 'anyone') {
					state.step2Values = [e];
					// state.lookingForOptions =  [] //lookingForDefaultOptions.filter((op:any) => !state.step2Values.includes(op.key))
				} else {
					state.step2Values[index] = e;
				}
				state.lookingForOptions = lookingForDefaultOptions.filter(
					(op: any) => !state.step2Values.includes(op.key)
				);
				return state;
			});
	};

	validate() {
		if (this.state.step === -4)
			if (
				this.state.step_4Values &&
				// && this.state.step_4Values.dbdy) return true;
				this.state.step_4Values.dbdy &&
				this.state.step_4Values.ibdy &&
				this.state.step_4Values.ibdy.length !== 10
			)
				return true;
		if (this.state.step === -3) if (this.state.step_3Values) return true;
		// if (this.state.step == -2) if (this.state.step_2Values && this.state.step_2Values.emailBtn) return true;
		if (this.state.step === -2)
			if (this.state.step_2Values && this.state.step_2Values.emailBtn) {
				let step = this.state.step;
				return this.setState({ step: step + 1 });
			}
		if (
			this.state.step === -1 &&
			/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.state.step_1Values)
		)
			if (this.state.step_1Values) return true;
		if (this.state.step === 0) if (this.state.step0Values) return true;
		if (this.state.step === 1) if (this.state.step1Values) return true;
		if (this.state.step === 2)
			if (
				Array.isArray(this.state.step2Values) &&
				this.state.step2Values.length > 0 &&
				this.state.step2Values[0]
			)
				return true;
		if (this.state.step === 5) if (this.state.step5Values) return true;
		if (this.state.step === 3) {
			if (this.state.step3Values && this.state.step3Values.person1) return true;
			if (!this.state.isSingle && this.state.step3Values.person2) return true;
		}

		if (this.state.step === 4) {
			if (this.state.step4Values && this.state.step4Values.ebdy) return true;
			if (!this.state.isSingle && this.state.step4Values.tbdy) return true;
		}
		if (this.state.step === 6) if (this.state.step6Values) return true;
		if (this.state.step === 7)
			if (
				this.state.step7Values &&
				/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.state.step7Values)
			)
				return true;
		if (this.state.step === 8)
			if (this.state.step8Values) return true;
			else return false;
	}

	setEmail(email: any) {
		this.setState({ step7Values: email });
	}

	setLoading(type: any) {
		this.setState({ isLoading: type });
	}

	setDays1(month: any) {
		const selectedMonth: any = MONTHS.find((m) => m.key === month);

		let days: any = [];

		for (let i = 1; i <= selectedMonth.days; i++) {
			days = [...days, { key: i, text: i }];
		}

		this.setState({ days1: days });
	}

	setDays2(month: any) {
		const selectedMonth: any = MONTHS.find((m) => m.key === month);

		let days: any = [];

		for (let i = 1; i <= selectedMonth.days; i++) {
			days = [...days, { key: i, text: i }];
		}

		this.setState({ days2: days });
	}

	async next() {
		try {
			let step = this.state.step;
			this.setState((prevState: any) => {
				return { ...prevState, step: step + 1 };
			});
			console.log(this.state);
			return;
			this.setLoading(true);
			const apiResponse: any = await apiCall(this.state.step, this.state, this.setEmail);

			if (apiResponse.success) {
				let step = this.state.step;

				if (this.state.step === -4) {
					this.startOtpTimer();
				}

				this.setState((prevState: any) => {
					return { ...prevState, step: step + 1 };
				});
			}

			this.setLoading(false);
		} catch (error: any) {
			toast.error(error?.data?.message || error.message);
			this.setLoading(false);
		}
	}

	previous() {
		let step = this.state.step;
		this.setState({ step: step - 1 });
	}

	handlePerson1Change(value: any, type: any) {
		if (type === 'day') {
			this.setState((prevState: any) => {
				return {
					step4Values: {
						...prevState.step4Values,
						ebdy: { ...prevState.step4Values.ebdy, day: value },
					},
				};
			});
		}

		if (type === 'month') {
			if (value?.length > 2) return;

			this.setState((prevState: any) => {
				return {
					step4Values: {
						...prevState.step4Values,
						ebdy: { ...prevState.step4Values.ebdy, month: value },
					},
				};
			});
		}

		if (type === 'year') {
			if (value?.length > 4) return;

			this.setState((prevState: any) => {
				return {
					step4Values: {
						...prevState.step4Values,
						ebdy: { ...prevState.step4Values.ebdy, year: value },
					},
				};
			});
		}
	}

	handlePerson2Change(value: any, type: any) {
		if (type === 'day') {
			this.setState((prevState: any) => {
				return {
					step4Values: {
						...prevState.step4Values,
						tbdy: { ...prevState.step4Values.tbdy, day: value },
					},
				};
			});
		}

		if (type === 'month') {
			if (value?.length > 2) return;

			this.setState((prevState: any) => {
				return {
					step4Values: {
						...prevState.step4Values,
						tbdy: { ...prevState.step4Values.tbdy, month: value },
					},
				};
			});
		}

		if (type === 'year') {
			if (value?.length > 4) return;

			this.setState((prevState: any) => {
				return {
					step4Values: {
						...prevState.step4Values,
						tbdy: { ...prevState.step4Values.tbdy, year: value },
					},
				};
			});
		}
	}

	render() {
		const opacity = this.state.step === -4 || this.state.step > 8 ? 'opac' : '';
		const nextOpct = this.state.step > 8 ? 'opac' : '';
		const blurOpac = this.validate() ? '' : 'blurOpac';

		const { lookingForOptions } = this.state;

		return (
			<>
				<OnlyLogoLayout />
				<div
					className={
						'registration-form' + (this.state.step === -4 ? ' home-screen-btn' : '')
					}
				>
					{this.state.step === -4 ? (
						<>
							<div className="common-section-padding">
								<div className="d-flex flex-column text-center form-group phone-num home-screen-part ">
									<span
										className="home-bottom home-screen-label large-label"
										style={{
											fontSize: 16,
											fontFamily: 'ModernEraExtraBold',
											marginBottom: '80px',
											marginTop: '0',
										}}
									>
										Enter your mobile phone number and we'll send you a text
										message with a verification code
									</span>
									<div className="btn-with-dropdown d-flex align-items-center justify-content-center">
										<div className="d-sm-flex country-code">
											{/* <Dropdown
												className="home-country"
												options={options0}
												styles={{
													...dropdownStyles,
													title: {
														...dropdownStyles,
														width: '100px !important',
														height: '26px !important',
														fontSize: '16px !important',
														padding: '6px 28px 0px 8px',
														marginRight: '0 !important',
														fontFamily: 'ModernEraBold',
													},
													caretDownWrapper: {
														fontSize: 14,
														top: '50% !important',
														right: '16px !important',
													},
												}}
												defaultSelectedKey={this.state.step_4Values.dbdy}
												onChange={(e, i: any) => {
													this.setState({
														step_4Values: {
															dbdy: i.key,
															ibdy: i.prefix,
														},
													});
													this.setState({
														step5Values: i.key,
													});
												}}
											/> */}
											<select className='custom-simple-dropdown'>
												<option>IN</option>
												<option>US</option>
											</select>
											<input
												style={{
													fontSize: 16,
													height: 50,
													width: 215,
													fontFamily: 'ModernEraBold',
												}}
												className="home-phone-no"
												placeholder=""
												type="text"
												onKeyPress={(e: any) => {
													if (e.code === 'Enter') {
														this.next();
													}
												}}
												value={this.state.step_4Values.ibdy}
												onChange={(e) => {
													if (
														e.currentTarget.value == '' ||
														e.currentTarget.value == '+' ||
														e.currentTarget.value == '+9' ||
														e.currentTarget.value == '+6'
													) {
														return;
													}
													this.setState({
														step_4Values: {
															ibdy: e.currentTarget.value,
															dbdy: this.state.step_4Values.dbdy,
														},
													});
												}}
											/>
										</div>
										{!this.state.isLoading && (
											<ActionButton
												disabled={!this.validate()}
												onClick={this.next}
												className={
													'step-button next-btn ' +
													nextOpct +
													' ' +
													blurOpac +
													(this.state.step === -4
														? 'class-when-first-screen'
														: 'class-when-other-screens')
												}
											>
												next
												<FontIcon
													aria-label="Compass"
													iconName="ChevronRightSmall"
													className={iconClass}
												/>
											</ActionButton>
										)}
									</div>
									<span
										className="home-bottom home-screen-label small-label"
										style={{ fontSize: 16, fontFamily: 'ModernEraExtraBold' }}
									>
										*Your phone number or email will never be shown or given to
										others users
									</span>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === -3 ? (
						<>
							<div className="common-section-padding">
								<div className="d-flex flex-column text-center form-group phone-otp home-screen-part">
									<span
										className="reg-label home-screen-label"
										style={{ fontSize: 16, fontFamily: 'ModernEraExtraBold' }}
									>
										{' '}
										Enter the code that was just sent to your mobile phone
									</span>
									<div className="btn-with-dropdown d-flex align-items-center justify-content-center">
										<ActionButton
											onClick={this.previous}
											// disabled={this.state.step === -4}
											className={'step-button back-btn' + opacity}
										>
											<FontIcon
												aria-label="Compass"
												iconName="ChevronLeftSmall"
												className={iconClass + ' back '}
											/>
											back
										</ActionButton>
										<div className="field-part">
											<input
												style={{
													fontSize: 16,
													height: 50,
													fontFamily: 'ModernEraBold',
												}}
												className="home-phone-no home-OTP-no"
												placeholder=""
												onKeyPress={(e: any) => {
													if (e.code === 'Enter') {
														this.next();
													}
												}}
												onChange={(e) => {
													this.setState({
														step_3Values: e.currentTarget.value,
													});
												}}
											/>
										</div>
										{!this.state.isLoading && (
											<ActionButton
												// disabled={!this.validate()}
												onClick={this.next}
												className={
													'step-button next-btn ' +
													nextOpct +
													' ' +
													blurOpac
												}
											>
												next
												<FontIcon
													aria-label="Compass"
													iconName="ChevronRightSmall"
													className={iconClass}
												/>
											</ActionButton>
										)}
									</div>
								</div>

								<p className="text-center">
									<button
										className="send-again-link"
										disabled={this.state.isResendOtpDisabled}
										onClick={this.resendOtp}
									>
										Send again
									</button>
								</p>
								{this.state.isResendOtpDisabled && (
									<p className="text-center">
										{this.state.resensdOtpTimerMinutes}:
										{this.state.resendOtpTimerSeconds}
									</p>
								)}
							</div>
						</>
					) : (
						<></>
					)}
					{/* {this.state.step === -2 ? (
						<>
							<div className="common-section-padding home-screen-part ">
								<div className='d-flex field-with-button align-items-center justify-content-center'>
									<ActionButton
												onClick={this.previous}
												// disabled={this.state.step === -4}
												className={'step-button back-btn' + opacity}
												>
												<FontIcon
													aria-label="Compass"
													iconName="ChevronLeftSmall"
													className={iconClass + ' back '}
													
												/>
												back
									</ActionButton>
									<div className="d-flex flex-column form-group ">
										<span className="reg-label"> step_2Values:</span>
										<button
											className="btn reg-link"
											value="email"
											onClick={(e) => {
												this.setState({ step_2Values: { emailBtn: e } });
											}}
										>
											{' '}
											<FaEnvelope /> Continue with Email
										</button>
										<GoogleLogin
											onSuccess={this.responseGoogle}
											onFailure={this.responseGoogle}
											cookiePolicy={'single_host_origin'}
											autoLoad={false}
											buttonText="Login with Google"
											clientId={GOOGLE_CLIENT_ID}
											icon
											render={(renderProps) => (
												<button
													className="btn reg-link"
													onClick={renderProps.onClick}
												>
													<FaGoogle /> Continue with Google
												</button>
											)}
										></GoogleLogin>
										<button
											className="btn reg-link"
											value="google"
											onClick={(e) => {
												this.setState({ step_2Values: { googleBtn: e } });
											}}
										>
											<FaGoogle /> Continue with Google
										</button>

										<FacebookLogin
											appId={FACEBOOK_CLIENT_ID}
											callback={this.responseFacebook}
											fields="name,email,picture"
											scope="public_profile,email"
										>
											{(renderProps: any) => {
												return (
													<button
														className="btn reg-link"
														value="facebook"
														onClick={renderProps.onClick}
													>
														<FaFacebook /> Continue with Facebook
													</button>
												);
											}}
										</FacebookLogin>
									</div>
								{!this.state.isLoading && 
									<ActionButton
											onClick={this.next}
											className={'step-button next-btn ' + nextOpct + ' ' + blurOpac  }
										>
											next
											<FontIcon
												aria-label="Compass"
												iconName="ChevronRightSmall"
												className={iconClass}
											/>
									</ActionButton>
								}
								</div>
								
							</div>
						</>
					) : (
						<></>
					)} */}
					{this.state.step === -2 ? (
						<>
							<div className="home-screen-part common-section-padding">
								<div className="d-flex flex-column text-center form-group email-id">
									<span
										className="reg-label home-screen-label"
										style={{ fontSize: 16, fontFamily: 'ModernEraExtraBold' }}
									>
										{' '}
										Enter your email
									</span>
									<div className="btn-with-dropdown d-flex align-items-center justify-content-center">
										<ActionButton
											onClick={this.previous}
											// disabled={this.state.step === -4}
											className={'step-button back-btn' + opacity}
										>
											<FontIcon
												aria-label="Compass"
												iconName="ChevronLeftSmall"
												className={iconClass + ' back '}
											/>
											back
										</ActionButton>
										<div className="field-part">
											<input
												style={{
													fontSize: 16,
													height: 50,
													width: 280,
													fontFamily: 'ModernEraBold',
												}}
												className="home-phone-no"
												onKeyPress={(e: any) => {
													if (e.code === 'Enter') {
														this.next();
													}
												}}
												pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
												onChange={(e) => {
													this.setState({
														step_1Values: e.currentTarget.value,
													});
												}}
											/>
										</div>
										{!this.state.isLoading && (
											<ActionButton
												// disabled={!this.validate()}
												onClick={this.next}
												className={
													'step-button next-btn ' +
													nextOpct +
													' ' +
													blurOpac
												}
											>
												next
												<FontIcon
													aria-label="Compass"
													iconName="ChevronRightSmall"
													className={iconClass}
												/>
											</ActionButton>
										)}
									</div>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === -1 ? (
						<>
							<div className="home-screen-part common-section-padding">
								<div className="d-flex flex-column text-center form-group email-otp home-screen-part">
									<span
										className="reg-label home-screen-label"
										style={{ fontSize: 16, fontFamily: 'ModernEraExtraBold' }}
									>
										{' '}
										Enter the code that was just sent to your email
									</span>
									<div className="d-flex align-items-center justify-content-center">
										<ActionButton
											onClick={this.previous}
											// disabled={this.state.step === -4}
											className={'step-button back-btn' + opacity}
										>
											<FontIcon
												aria-label="Compass"
												iconName="ChevronLeftSmall"
												className={iconClass + ' back '}
											/>
											back
										</ActionButton>
										<div className="filed-part">
											<input
												style={{
													fontSize: 16,
													height: 50,
													width: 70,
													fontFamily: 'ModernEraBold',
												}}
												className="home-phone-no"
												onKeyPress={(e: any) => {
													if (e.code === 'Enter') {
														this.next();
													}
												}}
												placeholder=""
												onChange={(e) => {
													this.setState({
														step0Values: e.currentTarget.value,
													});
												}}
											/>
										</div>
										{!this.state.isLoading && (
											<ActionButton
												// disabled={!this.validate()}
												onClick={this.next}
												className={
													'step-button next-btn ' +
													nextOpct +
													' ' +
													blurOpac
												}
											>
												next
												<FontIcon
													aria-label="Compass"
													iconName="ChevronRightSmall"
													className={iconClass}
												/>
											</ActionButton>
										)}
									</div>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 0 ? (
						<>
							<div className="common-section-padding ">
								<div className="d-flex align-items-center justify-content-center home-screen-part flex-column">
									<div className="d-flex align-items-center justify-content-center">
										<ActionButton
											onClick={this.previous}
											// disabled={this.state.step === -4}
											className={'step-button back-btn' + opacity}
										>
											<FontIcon
												aria-label="Compass"
												iconName="ChevronLeftSmall"
												className={iconClass + ' back '}
											/>
											back
										</ActionButton>
										<div className="d-flex form-group flex-column align-items-center  justify-content-center">
											<div
												className="d-flex justify-content-center text-center"
												style={{ marginBottom: '50px', width: '100%' }}
											>
												<span
													className="home-bottom home-screen-label small-label text-center"
													style={{
														fontSize: 16,
														fontFamily: 'ModernEraExtraBold',
														width: '100%',
													}}
												>
													Create a password
												</span>
											</div>
											<div
												className="d-flex password-section"
												style={{ marginBottom: '30px' }}
											>
												<span
													className="reg-label home-screen-label same-width-label"
													style={{
														fontSize: 16,
														fontFamily: 'ModernEraExtraBold',
													}}
												>
													Password:
												</span>
												<input
													style={{
														fontSize: 16,
														height: 50,
														width: 288,
														fontFamily: 'ModernEraBold',
													}}
													value={this.state.password}
													className="home-phone-no"
													onKeyPress={(e: any) => {
														if (e.code === 'Enter') {
															this.next();
														}
													}}
													type="password"
													onChange={(e) => {
														this.setState({
															password: e.currentTarget.value,
														});
													}}
												/>
											</div>

											<div className="d-flex password-section">
												<span
													className="reg-label home-screen-label same-width-label"
													style={{
														fontSize: 16,
														fontFamily: 'ModernEraExtraBold',
													}}
												>
													Re-enter password:
												</span>

												<input
													style={{
														fontSize: 16,
														height: 50,
														width: 288,
														fontFamily: 'ModernEraBold',
													}}
													value={this.state.password2}
													className="home-phone-no"
													onKeyPress={(e: any) => {
														if (e.code === 'Enter') {
															this.next();
														}
													}}
													type="password"
													onChange={(e) => {
														this.setState({
															password2: e.currentTarget.value,
														});
													}}
												/>
											</div>
										</div>
										{!this.state.isLoading && (
											<ActionButton
												// disabled={!this.validate()}
												onClick={this.next}
												className={
													'step-button next-btn ' +
													nextOpct +
													' ' +
													blurOpac
												}
											>
												next
												<FontIcon
													aria-label="Compass"
													iconName="ChevronRightSmall"
													className={iconClass}
												/>
											</ActionButton>
										)}
									</div>
								</div>
								<div
									className="d-flex justify-content-center"
									style={{ marginTop: '80px' }}
								>
									<span
										className="home-bottom home-screen-label small-label counrty-part"
										style={{ fontSize: 16, fontFamily: 'ModernEraExtraBold' }}
									>
										- Password must be at least 6 characters
									</span>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 1 ? (
						<>
							<p className="step-number">1/6</p>

							<div className="first-step common-section-padding">
								<div className="d-flex form-group home-screen-part">
									<ActionButton
										onClick={this.previous}
										// disabled={this.state.step === -4}
										className={'step-button back-btn' + opacity}
									>
										<FontIcon
											aria-label="Compass"
											iconName="ChevronLeftSmall"
											className={iconClass + ' back '}
										/>
										back
									</ActionButton>
									<span
										className="reg-label home-screen-label"
										style={{ fontSize: 16, fontFamily: 'ModernEraExtraBold' }}
									>
										{' '}
										I am / we are:
									</span>
									<select className='custom-simple-dropdown large'>
										<option>Single female</option>
										<option>Single male</option>
										<option>female/male couple</option>
										<option>female/female couple</option>
										<option>male/male couple</option>
									</select>
									{/* <Dropdown
										className="down-arrow"
										options={options}
										styles={{
											...dropdownStyles,
											title: {
												...dropdownStyles,
												width: '300px !important',
												height: '26px !important',
												fontSize: '16px !important',
												padding: '6px 28px 0px 8px',
												marginRight: '0 !important',
												fontFamily: 'ModernEraBold',
											},
											caretDownWrapper: {
												fontSize: 14,
												right: '20px !important',
											},
										}}
										onChange={(e, i: any) => {
											this.setState({
												step1Values: i.key,
												isSingle: i.isSingle,
											});
										}}
									/> */}
									{!this.state.isLoading && (
										<ActionButton
											// disabled={!this.validate()}
											onClick={this.next}
											className={
												'step-button next-btn ' + nextOpct + ' ' + blurOpac
											}
										>
											next
											<FontIcon
												aria-label="Compass"
												iconName="ChevronRightSmall"
												className={iconClass}
											/>
										</ActionButton>
									)}
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 2 ? (
						<>
							<p className="step-number">2/6</p>
							<div className="second step common-section-padding">
								<div className="d-flex form-group home-screen-part">
									<div className="button-with-field d-flex align-items-center justify-content-center">
										<ActionButton
											onClick={this.previous}
											// disabled={this.state.step === -4}
											className={'step-button back-btn' + opacity}
										>
											<FontIcon
												aria-label="Compass"
												iconName="ChevronLeftSmall"
												className={iconClass + ' back '}
											/>
											back
										</ActionButton>
										<div className="d-flex align-items-center center-content">
											<span
												className="reg-label home-screen-label"
												style={{
													fontSize: 16,
													fontFamily: 'ModernEraExtraBold',
													marginTop: '-8px',
												}}
											>
												{' '}
												I am / we are looking for:
											</span>
											<div className="add-more-div">
												{(this.state.step2Values &&
												this.state.step2Values.length > 0
													? this.state.step2Values
													: ['']
												).map((val: any, key: any) => {
													if (key === 0) {
														return (
															// <Dropdown
															// 	className="down-arrow"
															// 	defaultSelectedKey={val}
															// 	placeholder={val}
															// 	options={lookingForOptions}
															// 	styles={{
															// 		...dropdownStyles,
															// 		title: {
															// 			...dropdownStyles,
															// 			width: '300px !important',
															// 			height: '26px !important',
															// 			fontSize: '16px !important',
															// 			padding: '6px 28px 0px 8px',
															// 			marginRight: '0 !important',
															// 			fontFamily: 'ModernEraBold',
															// 		},
															// 		caretDownWrapper: {
															// 			fontSize: 14,
															// 			right: '20px !important',
															// 		},
															// 	}}
															// 	onChange={(e) => {
															// 		this.setStep2Value(
															// 			e.currentTarget.textContent,
															// 			key
															// 		);
															// 	}}
															// />
															<select className='custom-simple-dropdown large'>
																<option>Single female</option>
																<option>Single male</option>
																<option>female/male couple</option>
																<option>female/female couple</option>
																<option>male/male couple</option>
															</select>
														);
													}
													return (
														<div className="">
																<select className='custom-simple-dropdown large'>
																	<option>Single female</option>
																	<option>Single male</option>
																	<option>female/male couple</option>
																	<option>female/female couple</option>
																	<option>male/male couple</option>
																</select>
															{/* <Dropdown
																defaultSelectedKey={val}
																placeholder={val}
																options={lookingForOptions}
																styles={{
																	...dropdownStyles,
																	title: {
																		...dropdownStyles,
																		width: '300px !important',
																		height: '26px !important',
																		fontSize: '16px !important',
																		padding: '6px 28px 0px 8px',
																		marginRight: '0 !important',
																		fontFamily: 'ModernEraBold',
																	},
																	caretDownWrapper: {
																		fontSize: 14,
																		right: '20px !important',
																	},
																}}
																onChange={(e) => {
																	this.setStep2Value(
																		e.currentTarget.textContent,
																		key
																	);
																}}
															/> */}
														</div>
													);
												})}
												{(!this.state.step2Values ||
													this.state.step2Values.length < 5) &&
												!this.state.step2Values.includes('anyone') ? (
													<p>
														<a
															onClick={this.addMore}
															style={{
																fontSize: 16,
																fontFamily: 'ModernEraExtraBold',
															}}
														>
															Add more
														</a>
													</p>
												) : (
													<p style={{ opacity: '0' }}>
														<a onClick={(e: any) => e.preventDefault()}>
															hidden
														</a>
													</p>
												)}
											</div>
										</div>
										{!this.state.isLoading && (
											<ActionButton
												// disabled={!this.validate()}
												onClick={this.next}
												className={
													'step-button next-btn ' +
													nextOpct +
													' ' +
													blurOpac
												}
											>
												next
												<FontIcon
													aria-label="Compass"
													iconName="ChevronRightSmall"
													className={iconClass}
												/>
											</ActionButton>
										)}
									</div>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 3 ? (
						<>
							<p className="step-number">3/6</p>
							<div className="common-section-padding">
								<div className="d-flex align-items-center justify-content-center home-screen-part">
									<ActionButton
										onClick={this.previous}
										// disabled={this.state.step === -4}
										className={'step-button back-btn' + opacity}
									>
										<FontIcon
											aria-label="Compass"
											iconName="ChevronLeftSmall"
											className={iconClass + ' back '}
										/>
										back
									</ActionButton>
									<div>
										<div
											className="d-flex form-group "
											style={{ marginBottom: '31px' }}
										>
											<span
												className="reg-label home-screen-label"
												style={{
													fontSize: 16,
													fontFamily: 'ModernEraExtraBold',
												}}
											>
												{' '}
												First name:
											</span>
											<input
												style={{
													fontSize: 16,
													height: 50,
													width: 288,
													fontFamily: 'ModernEraBold',
												}}
												className="home-phone-no"
												onKeyPress={(e: any) => {
													if (e.code === 'Enter') {
														this.next();
													}
												}}
												placeholder="person 1"
												onChange={(e) => {
													this.setState({
														step3Values: {
															person1: e.currentTarget.value,
															person2: this.state.step3Values.person2,
														},
													});
												}}
											/>
										</div>
										{!this.state.isSingle && (
											<div className="d-flex form-group home-screen-part">
												<span
													className="reg-label home-screen-label"
													style={{
														fontSize: 16,
														fontFamily: 'ModernEraExtraBold',
													}}
												>
													{' '}
													First name:
												</span>
												<input
													style={{
														fontSize: 16,
														height: 50,
														width: 288,
														fontFamily: 'ModernEraBold',
													}}
													className="home-phone-no"
													placeholder="person 2"
													onKeyPress={(e: any) => {
														if (e.code === 'Enter') {
															this.next();
														}
													}}
													onChange={(e) => {
														this.setState({
															step3Values: {
																person1:
																	this.state.step3Values.person1,
																person2: e.currentTarget.value,
															},
														});
													}}
												/>
											</div>
										)}
									</div>
									{!this.state.isLoading && (
										<ActionButton
											// disabled={!this.validate()}
											onClick={this.next}
											className={
												'step-button next-btn ' + nextOpct + ' ' + blurOpac
											}
										>
											next
											<FontIcon
												aria-label="Compass"
												iconName="ChevronRightSmall"
												className={iconClass}
											/>
										</ActionButton>
									)}
								</div>

								<p
									className="name-para home-screen-label"
									style={{ fontSize: 16, fontFamily: 'ModernEraExtraBold' }}
								>
									*The name(s) you add above are seen by other users, so if it
									makes you more comfortable, feel free to make them up.
								</p>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 4 ? (
						<>
							<p className="step-number">4/6</p>

							<div className="common-section-padding  home-screen-part">
								<ActionButton
									onClick={this.previous}
									// disabled={this.state.step === -4}
									className={'step-button back-btn' + opacity}
								>
									<FontIcon
										aria-label="Compass"
										iconName="ChevronLeftSmall"
										className={iconClass + ' back '}
									/>
									back
								</ActionButton>
								<div>
									<div
										className="d-flex form-group align-items-center justify-content-center "
										style={{ marginBottom: '31px' }}
									>
										<div className="bdy" style={{ marginBottom: '14px' }}>
											<span
												className="reg-label home-screen-label"
												style={{
													fontSize: 16,
													fontFamily: 'ModernEraExtraBold',
												}}
											>
												{this.state.step3Values.person1}’s birthday:
											</span>
										</div>
										<div className="bday-part d-flex">
											<select className='custom-simple-dropdown'>
												<option>Jan</option>
												<option>Feb</option>
												<option>Mar</option>
												<option>Apr</option>
												<option>May</option>
												<option>Jun</option>
												<option>Jul</option>
												<option>Aug</option>
												<option>Sep</option>
												<option>Oct</option>
												<option>Nov</option>
												<option>Dec</option>
												<option>12</option>
											</select>
											{/* <Dropdown
												options={MONTHS}
												style={{
													fontSize: 16,
													height: 50,
													width: 98,
													fontFamily: 'ModernEraBold',
													marginRight: '23px',
												}}
												defaultSelectedKey={
													this.state.step4Values.ebdy.month
												}
												onChange={(e, i: any) => {
													this.handlePerson1Change(i.key, 'month');
													this.setDays1(i.key);
												}}
											/> */}
											<select className='custom-simple-dropdown'>
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
												<option>6</option>
												<option>7</option>
												<option>8</option>
												<option>9</option>
												<option>10</option>
												<option>11</option>
												<option>12</option>
											</select>
											{/* <Dropdown
												options={this.state.days1}
												style={{
													fontSize: 16,
													height: 50,
													width: 98,
													fontFamily: 'ModernEraBold',
													marginRight: '23px',
												}}
												defaultSelectedKey={this.state.step4Values.ebdy.day}
												onChange={(e, i: any) => {
													this.handlePerson1Change(i.key, 'day');
												}}
											/> */}
											<select className='custom-simple-dropdown'>
												<option>1990</option>
												<option>1992</option>
												<option>1993</option>
												<option>1994</option>
												<option>1995</option>
												<option>1996</option>
												<option>1997</option>
												<option>1998</option>
												<option>1999</option>
												<option>2000</option>
												<option>2001</option>
												<option>2002</option>
											</select>
											
											{/* <Dropdown
												options={YEARS}
												style={{
													fontSize: 16,
													height: 50,
													width: 98,
													fontFamily: 'ModernEraBold',
													marginRight: '23px',
												}}
												defaultSelectedKey={
													this.state.step4Values.ebdy.year
												}
												onChange={(e, i: any) => {
													this.handlePerson1Change(i.key, 'year');
												}}
											/> */}
										</div>
									</div>
									{!this.state.isSingle && (
										<div className="d-flex align-items-center justify-content-center form-group home-screen-part">
											<div className="bdy" style={{ marginBottom: '14px' }}>
												<span
													className="reg-label home-screen-label"
													style={{
														fontSize: 16,
														fontFamily: 'ModernEraExtraBold',
													}}
												>
													{this.state.step3Values.person2}’s birthday:
												</span>
											</div>
											<div className="bday-part d-flex">
											<select className='custom-simple-dropdown'>
												<option>Jan</option>
												<option>Feb</option>
												<option>Mar</option>
												<option>Apr</option>
												<option>May</option>
												<option>Jun</option>
												<option>Jul</option>
												<option>Aug</option>
												<option>Sep</option>
												<option>Oct</option>
												<option>Nov</option>
												<option>Dec</option>
												<option>12</option>
											</select>
											<select className='custom-simple-dropdown'>
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
												<option>6</option>
												<option>7</option>
												<option>8</option>
												<option>9</option>
												<option>10</option>
												<option>11</option>
												<option>12</option>
											</select>
											<select className='custom-simple-dropdown'>
												<option>1990</option>
												<option>1992</option>
												<option>1993</option>
												<option>1994</option>
												<option>1995</option>
												<option>1996</option>
												<option>1997</option>
												<option>1998</option>
												<option>1999</option>
												<option>2000</option>
												<option>2001</option>
												<option>2002</option>
											</select>
											</div>
										</div>
									)}
								</div>
								{!this.state.isLoading && (
									<ActionButton
										// disabled={!this.validate()}
										onClick={this.next}
										className={
											'step-button next-btn ' + nextOpct + ' ' + blurOpac
										}
									>
										next
										<FontIcon
											aria-label="Compass"
											iconName="ChevronRightSmall"
											className={iconClass}
										/>
									</ActionButton>
								)}
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 5 ? (
						<>
							<p className="step-number">5/6</p>
							<div className="common-section-padding home-screen-part">
								<div className="d-flex align-items-center justify-content-center">
									<ActionButton
										onClick={this.previous}
										// disabled={this.state.step === -4}
										className={'step-button back-btn' + opacity}
									>
										<FontIcon
											aria-label="Compass"
											iconName="ChevronLeftSmall"
											className={iconClass + ' back '}
										/>
										back
									</ActionButton>
									<div className="d-flex form-group flex-column">
										<div
											className="drop-down-part d-flex"
											style={{ marginBottom: '30px' }}
										>
											<span
												className="reg-label home-screen-label same-width-label"
												style={{
													fontSize: 16,
													fontFamily: 'ModernEraExtraBold',
												}}
											>
												{' '}
												Country:
											</span>
											<select className='custom-simple-dropdown large'>
												<option>IN</option>
												<option>US</option>
												<option>CA</option>
												<option>AUS</option>
											</select>
											{/* <Dropdown
												className="home-country  "
												options={options0}
												styles={{
													...dropdownStyles,
													title: {
														...dropdownStyles,
														height: '26px !important',
														fontSize: '16px !important',
														padding: '6px 28px 0px 8px',
														marginRight: '0 !important',
														fontFamily: 'ModernEraBold',
													},
													caretDownWrapper: {
														fontSize: 14,
														top: '50% !important',
														right: '16px !important',
													},
												}}
												defaultSelectedKey={this.state.step_4Values.dbdy}
												onChange={(e, i: any) => {
													this.setState({
														step_4Values: {
															dbdy: i.key,
															ibdy: i.prefix,
														},
													});
													this.setState({
														step5Values: i.key,
													});
												}}
											/> */}
										</div>
										<div
											className="drop-down-part d-flex"
											style={{ marginBottom: '30px' }}
										>
											<span
												className="reg-label home-screen-label same-width-label"
												style={{
													fontSize: 16,
													fontFamily: 'ModernEraExtraBold',
												}}
											>
												{' '}
												State/Province:
											</span>
											<select className='custom-simple-dropdown large'>
												<option>IN</option>
												<option>US</option>
												<option>CA</option>
												<option>AUS</option>
											</select>
										</div>
										<div className="drop-down-part d-flex">
											<span
												className="reg-label home-screen-label same-width-label"
												style={{
													fontSize: 16,
													fontFamily: 'ModernEraExtraBold',
												}}
											>
												{' '}
												City:
											</span>
											<select className='custom-simple-dropdown large'>
												<option>IN</option>
												<option>US</option>
												<option>CA</option>
												<option>AUS</option>
											</select>
										</div>
									</div>
									{!this.state.isLoading && (
										<ActionButton
											// disabled={!this.validate()}
											onClick={this.next}
											className={
												'step-button next-btn ' + nextOpct + ' ' + blurOpac
											}
										>
											next
											<FontIcon
												aria-label="Compass"
												iconName="ChevronRightSmall"
												className={iconClass}
											/>
										</ActionButton>
									)}
								</div>
								<div
									className="d-flex justify-content-center"
									style={{ marginTop: '80px' }}
								>
									<span
										className="home-bottom home-screen-label small-label counrty-part"
										style={{ fontSize: 16, fontFamily: 'ModernEraExtraBold' }}
									>
										*If your town/city doesn’t appear in the results, try
										searching for the nearest larger city.{' '}
									</span>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 6 ? (
						<>
							<p className="step-number">6/6</p>
							<div className="common-section-padding  home-screen-part">
								<ActionButton
									onClick={this.previous}
									// disabled={this.state.step === -4}
									className={'step-button back-btn' + opacity}
								>
									<FontIcon
										aria-label="Compass"
										iconName="ChevronLeftSmall"
										className={iconClass + ' back '}
									/>
									back
								</ActionButton>
								<div className="d-flex form-group">
									<span
										className="reg-label home-screen-label"
										style={{ fontSize: 16, fontFamily: 'ModernEraExtraBold' }}
									>
										Add photos
									</span>
								</div>
								<div className="images_container">
									{this.state.images.map((img: any, index: any) => {
										return (
											<div className="image_wrapper" key={index}>
												<div className="image">
													<img
														className="main_image"
														src={this.getImageUrl(img)}
													></img>
													<div
														onClick={() => this.removeImage(index)}
														className="image_close_button"
													>
														X
													</div>
												</div>
											</div>
										);
									})}

									<div
										className="add_image"
										onClick={(e) => this.imageRef.current.click()}
									>
                                        <div className='add_icon' >+</div>
										<input
											accept="image/*"
											className="add_image_input"
											type="file"
											ref={this.imageRef}
											onChange={this.handleImageChange}
										></input>
									</div>
								</div>
								{!this.state.isLoading && (
									<ActionButton
										// disabled={!this.validate()}
										onClick={this.next}
										className={
											'step-button next-btn ' + nextOpct + ' ' + blurOpac
										}
									>
										next
										<FontIcon
											aria-label="Compass"
											iconName="ChevronRightSmall"
											className={iconClass}
										/>
									</ActionButton>
								)}
							</div>
						</>
					) : (
						<></>
					)}

					{this.state.step === 7 ? (
						<>
							<p className="step-number">8/8</p>
							<div style={{ paddingTop: '15rem' }}>
								<div className="awe-final">
									{`Awesome, ${
										localStorage.getItem('email') || 'Anonymous'
									} you’ve created your profile! 🥳`}
									After you’ve checked out the platform and gotten a sense of it,
									you can complete your profile (upload some photos, write your
									description, etc) in the{' '}
									<a href="javscript:;" className="prof-setting">
										Profile/Settings
									</a>{' '}
									section. (Don’t worry, we’ll show you exactly how to do it!)
								</div>
								<div className="alignRight take-me">
									<ActionButton className={'step-button '}>
										take me to the show{' '}
										<FontIcon
											aria-label="Compass"
											iconName="ChevronRightSmall"
											className={iconClass}
										/>
									</ActionButton>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{/* {!this.state.isLoading && (
						<ActionButton
							// disabled={!this.validate()}
							onClick={this.next}
							className={'step-button next-btn ' + nextOpct + ' ' + blurOpac}
						>
							next
							<FontIcon
								aria-label="Compass"
								iconName="ChevronRightSmall"
								className={iconClass}
							/>
						</ActionButton>
					)} */}
				</div>
			</>
		);
	}
}
