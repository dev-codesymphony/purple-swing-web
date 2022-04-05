import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../app.config';

async function apiCall(value, body, setEmail) {
	try {
		switch (value) {
			case -4:
				let contactNumber = `${body.numberPrefix}${body.step_4Values.ibdy}`;
				if (!body.step_4Values.ibdy) {
					throw new Error('Please enter a valid mobile number');
				}
				const response = await axios.post(`${BASE_URL}/auth/send-otp`, {
					mobile: contactNumber,
				});

				if (response.status === 200) {
					toast.success('OTP sent successfully');
					return { success: true, message: response?.data?.data?.message };
				}

				throw new Error('Something went wrong');
			case -3:
				let otp = body.step_3Values;
				let mobile = `${body.numberPrefix}${body.step_4Values.ibdy}`;
				if (!otp) {
					throw new Error('Please enter a valid OTP.');
				}
				const otpResponse = await axios.post(`${BASE_URL}/auth/verify-otp`, {
					otp,
					mobile,
				});

				if (otpResponse.status === 200) {
					toast.success('OTP verified successfully');
					localStorage.setItem('token', otpResponse?.data?.data?.data?.jwt);
					return { success: true, message: otpResponse?.data?.data?.message };
				}

				throw new Error('Something went wrong');

			case -2:
				const email = body.step_1Values;
				const password1 = body.password;
				const password2 = body.password2;
				const token = localStorage.getItem('token');

				if (password1 !== password2) {
					throw new Error('Password does not match!');
				}

				if (!email) {
					throw new Error('Please enter a valid email address');
				}
				const emailResponse = await axios.post(
					`${BASE_URL}/auth/login`,
					{
						login_type: 'purple_swing',
						email,
					},
					{ headers: { Authorization: `Bearer ${token}` } }
				);

				if (emailResponse.status === 200) {
					toast.success('An OTP has been sent to your email');
					return { success: true, message: 'Success' };
				}

				throw new Error('Something went wrong');
			// break;
			case -1:
				const emailOtp = body.step0Values;
				const verifiedEmail = body.step_1Values;
				const jwt = localStorage.getItem('token');

				if (!emailOtp) {
					throw new Error('Please enter a valid OTP.');
				}

				const finalEmailResponse = await axios.post(
					`${BASE_URL}/auth/verify-email-otp`,
					{
						email: verifiedEmail,
						otp: emailOtp,
					},
					{ headers: { Authorization: `Bearer ${jwt}` } }
				);

				if (finalEmailResponse.status === 200) {
					localStorage.setItem('token', finalEmailResponse?.data?.data?.data?.jwt);
					localStorage.setItem('email', verifiedEmail);
					setEmail(verifiedEmail);
					toast.success('Email verified successfully');
					return { success: true, message: 'Success' };
				}

				throw new Error('Something went wrong');

			case 5:
				const formData = new FormData();
				const bdy1 = body.step4Values.ebdy;
				const bdy2 = body.step4Values.tbdy;

				const fristResponse = body.step1Values;
				const secondResponse = body.step2Values;
				const person1 = body.step3Values.person1;
				const person2 = body.step3Values.person2;
				let person1Birthday = `${bdy1.month}/${bdy1.day}/${bdy1.year}`;
				let person2Birthday = `${bdy2.month}/${bdy2.day}/${bdy2.year}`;
				const password = body.password;

				const jwtToken = localStorage.getItem('token');

				if (
					!fristResponse ||
					!secondResponse ||
					(Array.isArray(secondResponse) && secondResponse.length < 1) ||
					!person1 ||
					!person1Birthday ||
					!password
				) {
					throw new Error('Some of the required fields are missing');
				}

				if (!bdy1.day || !bdy1.month || !bdy1.year) {
					person1Birthday = null;
				}

				if (!bdy2.month || !bdy2.day || !bdy2.year) {
					person2Birthday = null;
				}

				formData.append('UserType', fristResponse);
				formData.append('LookingFor', JSON.stringify(secondResponse));
				formData.append('Firstname1', person1);
				formData.append('Firstname2', person2);
				formData.append('Birthday1', person1Birthday);
				formData.append('Birthday2', person2Birthday);
				formData.append('Password', password);

				const country = body.countries.find(
					(country) => country.id === parseInt(body.country)
				);
				const state = body.states.find((state) => state.id === parseInt(body.state));
				const city = body.cities.find((city) => city.id === parseInt(body.city));

				formData.append('Country', country?.name);
				formData.append('State', state?.name);
				formData.append('City', city?.name);

				body.images.map((image) => {
					return formData.append('Images', image);
				});

				const finalResponse = await axios.post(
					`${BASE_URL}/user/update-profile`,
					formData,
					{ headers: { Authorization: `Bearer ${jwtToken}` } }
				);

				if (finalResponse.status === 200) {
					toast.success('you successfully created a profile');
					return { success: true, message: 'Success' };
				}

				throw new Error('Something went wrong');
			default:
				return { success: true, message: 'Success' };
		}
	} catch (error) {
		console.log(error.response);
		throw new Error(
			error?.response?.data?.message || error?.response?.data?.error || error.message
		);
	}
}

export { apiCall };
