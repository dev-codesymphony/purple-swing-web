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
			step_1Values: null,
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
	}

	person1DayRef: any = createRef();
	person1YearRef: any = createRef();
	person2DayRef: any = createRef();
	person2YearRef: any = createRef();

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
			console.log('custom error', error, ' <<===== error')
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
		if (this.state.step === 2) if (Array.isArray(this.state.step2Values) && this.state.step2Values.length > 0 && this.state.step2Values[0]) return true;
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

	async next() {
		try {
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
			if (value?.length > 2) return;

			this.setState((prevState: any) => {
				return {
					step4Values: {
						...prevState.step4Values,
						ebdy: { ...prevState.step4Values.ebdy, day: value },
					},
				};
			});

			if (value?.length >= 2) {
				return this.person1YearRef.current.focus();
			}
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

			if (value?.length >= 2) {
				return this.person1DayRef.current.focus();
			}
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
			if (value?.length > 2) return;

			this.setState((prevState: any) => {
				return {
					step4Values: {
						...prevState.step4Values,
						tbdy: { ...prevState.step4Values.tbdy, day: value },
					},
				};
			});

			if (value?.length >= 2) {
				return this.person2YearRef.current.focus();
			}
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

			if (value?.length >= 2) {
				return this.person2DayRef.current.focus();
			}
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
				<div className="registration-form d-flex justify-content-between align-items-center">
					<ActionButton
						onClick={this.previous}
						disabled={this.state.step === -4}
						className={'step-button ' + opacity}
					>
						<FontIcon
							aria-label="Compass"
							iconName="ChevronLeftSmall"
							className={iconClass}
						/>
						back
					</ActionButton>
					{this.state.step === -4 ? (
						<>
							<div className="d-flex flex-column text-center form-group phone-num">
								<span className="reg-label" style={{ fontSize: 16 }}>
									Enter your mobile phone number and we'll send you a text message
									with a verification code
								</span>
								<div className="d-sm-flex country-code">
									<Dropdown
										options={options0}
										styles={{
											...dropdownStyles, 
											title: { 
												...dropdownStyles,
												width: '100px !important', 
												height: '50px !important', 
												fontSize:'16px !important', 
												padding: '6px 28px 0px 8px',
												marginRight: '0 !important' 
											},
											caretDownWrapper: { 
												fontSize: 14,
												right: '40px !important'
											}
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
									/>
									<input
										style={{ fontSize: 16, height: 50, width: 300}}
										placeholder=""
										type="text"
										onKeyPress={(e: any) => {
											if (e.code === 'Enter') {
												this.next();
											}
										}}
										value={this.state.step_4Values.ibdy}
										onChange={(e) => {
											this.setState({
												step_4Values: {
													ibdy: e.currentTarget.value,
													dbdy: this.state.step_4Values.dbdy,
												},
											});
										}}
									/>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === -3 ? (
						<>
							<div className="">
								<div className="d-flex flex-column text-center form-group phone-otp">
									<span className="reg-label">
										{' '}
										Enter the code that was just sent to your mobile phone
									</span>
									<input
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
					{this.state.step === -2 ? (
						<>
							<div className="">
								<div className="d-flex flex-column form-group">
									{/* <span className="reg-label"> step_2Values:</span> */}
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
									{/* <button
										className="btn reg-link"
										value="google"
										onClick={(e) => {
											this.setState({ step_2Values: { googleBtn: e } });
										}}
									>
										<FaGoogle /> Continue with Google
									</button> */}

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
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === -1 ? (
						<>
							<div className="">
								<div className="d-flex flex-column text-center form-group email-id">
									<span className="reg-label"> Enter your email</span>
									<input
										onKeyPress={(e: any) => {
											if (e.code === 'Enter') {
												this.next();
											}
										}}
										pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
										onChange={(e) => {
											this.setState({ step_1Values: e.currentTarget.value });
										}}
									/>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 0 ? (
						<>
							<div className="">
								<div className="d-flex flex-column text-center form-group email-otp">
									<span className="reg-label">
										{' '}
										Enter the code that was just sent to your email
									</span>
									<input
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
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 1 ? (
						<>
							<p className="step-number">1/8</p>
							<div className="first-step">
								{/* ChevronLeftIcon
                        ChevronLeftMedIcon
                        ChevronLeftSmallIcon

                        ChevronRightIcon
                        ChevronRightMedIcon
                        ChevronRightSmallIcon */}

								<div className="d-flex form-group">
									<span className="reg-label"> I am / we are:</span>
									<Dropdown
										options={options}
										styles={dropdownStyles}
										onChange={(e, i: any) => {
											this.setState({
												step1Values: i.key,
												isSingle: i.isSingle,
											});
										}}
									/>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 2 ? (
						<>
							<p className="step-number">2/8</p>
							<div className="d-flex form-group">
								<span className="reg-label"> I am / we are looking for:</span>
								<div className="add-more-div">
									{(this.state.step2Values && this.state.step2Values.length > 0
										? this.state.step2Values
										: ['']
									).map((val: any, key: any) => {
										if (key === 0) {
											return (
												<Dropdown
													defaultSelectedKey={val}
													placeholder={val}
													options={lookingForOptions}
													styles={dropdownStyles}
													onChange={(e) => {
														this.setStep2Value(
															e.currentTarget.textContent,
															key
														);
													}}
												/>
											);
										}
										return (
											<div className="mt-3">
												<Dropdown
													defaultSelectedKey={val}
													placeholder={val}
													options={lookingForOptions}
													styles={dropdownStyles}
													onChange={(e) => {
														this.setStep2Value(
															e.currentTarget.textContent,
															key
														);
													}}
												/>
											</div>
										);
									})}
									{(!this.state.step2Values ||
										this.state.step2Values.length < 5) &&
									!this.state.step2Values.includes('anyone') ? (
										<p>
											<a onClick={this.addMore}>Add more</a>
										</p>
									) : (
										<p style={{ opacity: '0' }}>
											<a onClick={(e: any) => e.preventDefault()}>hidden</a>
										</p>
									)}
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 3 ? (
						<>
							<p className="step-number">3/8</p>
							<div>
								<div className="d-flex form-group" style={{ marginBottom: '31px' }}>
									<span className="reg-label"> First name:</span>
									<input
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
									<div className="d-flex form-group">
										<span className="reg-label"> First name:</span>
										<input
											placeholder="person 2"
											onKeyPress={(e: any) => {
												if (e.code === 'Enter') {
													this.next();
												}
											}}
											onChange={(e) => {
												this.setState({
													step3Values: {
														person1: this.state.step3Values.person1,
														person2: e.currentTarget.value,
													},
												});
											}}
										/>
									</div>
								)}

								<p className="name-para">
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
							<p className="step-number">4/8</p>
							<div>
								<div className="d-flex form-group" style={{ marginBottom: '31px' }}>
									<div className="bdy">
										<span className="reg-label">
											{this.state.step3Values.person1}’s birthday:
										</span>
									</div>
									<input
										style={{ width: '6rem', marginRight: '.5rem' }}
										placeholder="MM"
										type="text"
										value={this.state.step4Values.ebdy.month}
										onChange={(e) =>
											this.handlePerson1Change(e.target.value, 'month')
										}
									/>
									<input
										style={{ width: '6rem', marginRight: '.5rem' }}
										placeholder="DD"
										type="text"
										value={this.state.step4Values.ebdy.day}
										onChange={(e) =>
											this.handlePerson1Change(e.target.value, 'day')
										}
										ref={this.person1DayRef}
									/>
									<input
										style={{ width: '7rem' }}
										placeholder="YYYY"
										type="text"
										value={this.state.step4Values.ebdy.year}
										onKeyPress={(e: any) => {
											if (e.code === 'Enter') {
												this.next();
											}
										}}
										onChange={(e) =>
											this.handlePerson1Change(e.target.value, 'year')
										}
										ref={this.person1YearRef}
									/>
								</div>
								{!this.state.isSingle && (
									<div className="d-flex form-group">
										<div className="bdy">
											<span className="reg-label">
												{this.state.step3Values.person2}’s birthday:
											</span>
										</div>

										<input
											style={{ width: '6rem', marginRight: '.5rem' }}
											placeholder="MM"
											type="text"
											value={this.state.step4Values.tbdy.month}
											onChange={(e) =>
												this.handlePerson2Change(e.target.value, 'month')
											}
										/>
										<input
											style={{ width: '6rem', marginRight: '.5rem' }}
											placeholder="DD"
											type="text"
											value={this.state.step4Values.tbdy.day}
											onChange={(e) =>
												this.handlePerson2Change(e.target.value, 'day')
											}
											ref={this.person2DayRef}
										/>
										<input
											style={{ width: '7rem' }}
											placeholder="YYYY"
											type="text"
											value={this.state.step4Values.tbdy.year}
											onKeyPress={(e: any) => {
												if (e.code === 'Enter') {
													this.next();
												}
											}}
											onChange={(e) =>
												this.handlePerson2Change(e.target.value, 'year')
											}
											ref={this.person2YearRef}
										/>
									</div>
								)}
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 5 ? (
						<>
							<p className="step-number">5/8</p>
							<div className="d-flex form-group">
								<span className="reg-label"> Country:</span>
								<input
									onKeyPress={(e: any) => {
										if (e.code === 'Enter') {
											this.next();
										}
									}}
									value={this.state.step5Values}
									type="text"
									onChange={(e: any) => {
										this.setState({ step5Values: e.target.value });
									}}
								/>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 6 ? (
						<>
							<p className="step-number">6/8</p>
							<div>
								<div className="d-flex form-group">
									<span className="reg-label"> City:</span>
									<input
										onKeyPress={(e: any) => {
											if (e.code === 'Enter') {
												this.next();
											}
										}}
										onChange={(e) => {
											this.setState({ step6Values: e.currentTarget.value });
										}}
									/>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 7 ? (
						<>
							<p className="step-number">7/8</p>
							<div>
								<div className="d-flex form-group">
									<span className="reg-label"> Email:</span>
									<input
										value={this.state.step7Values || ''}
										onKeyPress={(e: any) => {
											if (e.code === 'Enter') {
												this.next();
											}
										}}
										pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
										onChange={(e) => {
											this.setState({ step7Values: e.target.value });
										}}
									/>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 8 ? (
						<>
							<div>
								<div className="d-flex form-group">
									<span className="reg-label"> Password:</span>
									<input
										onKeyPress={(e: any) => {
											if (e.code === 'Enter') {
												this.next();
											}
										}}
										type="password"
										onChange={(e) => {
											this.setState({ step8Values: e.currentTarget.value });
										}}
									/>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{this.state.step === 9 ? (
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

					{/* {this.state.step === 8 ? ()} */}

					{this.state.isLoading ? (
						<Loader />
					) : (
						<ActionButton
							disabled={!this.validate()}
							onClick={this.next}
							className={'step-button ' + nextOpct + ' ' + blurOpac}
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
		);
	}
}
