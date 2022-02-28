import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../app.config';

async function apiCall(value, body, setEmail) {
	try {
		switch (value) {
			case -4:
				let contactNumber = body.step_4Values.ibdy;
				if(!contactNumber) {
					throw new Error('Please enter a valid mobile number')
				}
				const response = await axios.post(`${BASE_URL}/auth/send-otp`, {
					mobile: contactNumber,
				});

				if (response.status === 200) {
					toast.success(response?.data?.data?.message);
					return { success: true, message: response?.data?.data?.message };
				}

				throw new Error('Something went wrong');
			case -3:
				let otp = body.step_3Values;
				let mobile = body.step_4Values.ibdy;
				if(!otp) {
					throw new Error('Please enter a valid OTP.')
				}
				const otpResponse = await axios.post(`${BASE_URL}/auth/verify-otp`, {
					otp,
					mobile,
				});

				if (otpResponse.status === 200) {
					localStorage.setItem('token', otpResponse?.data?.data?.data?.jwt);
					return { success: true, message: otpResponse?.data?.data?.message };
				}

				throw new Error('Something went wrong');

			case -1:
				const email = body.step_1Values;
				const token = localStorage.getItem('token');
				if(!email) {
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
			case 0:
				const emailOtp = body.step0Values;
				const verifiedEmail = body.step_1Values;
				const jwt = localStorage.getItem('token');

				if(!emailOtp) {
					throw new Error('Please enter a valid OTP.')
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
			case 8:
				const bdy1 = body.step4Values.ebdy;
				const bdy2 = body.step4Values.tbdy;

				const fristResponse = body.step1Values;
				const secondResponse = body.step2Values;
				const person1 = body.step3Values.person1;
				const person2 = body.step3Values.person2;
				let person1Birthday = `${bdy1.day}/${bdy1.month}/${bdy1.year}`;
				let person2Birthday = `${bdy2.day}/${bdy2.month}/${bdy2.year}`;
				const password = body.step8Values;

				const jwtToken = localStorage.getItem('token');

				if(!fristResponse || !secondResponse || (Array.isArray(secondResponse) && secondResponse.length < 1) || !person1 || !person1Birthday || !password) {
					throw new Error('Some of the required fields are missing')
				}

				if (!bdy1.day || !bdy1.month || !bdy1.year) {
					person1Birthday = null;
				}

				if (!bdy2.month || !bdy2.day || !bdy2.year) {
					person2Birthday = null;
				}

				const finalResponse = await axios.post(
					`${BASE_URL}/user/update-profile`,
					{
						UserType: fristResponse,
						LookingFor: secondResponse,
						Firstname1: person1,
						Firstname2: person2,
						Birthday1: person1Birthday,
						Birthday2: person2Birthday,
						password,
					},
					{ headers: { Authorization: `Bearer ${jwtToken}` } }
				);

				if (finalResponse.status === 200) {
					toast.success('User profile updated successfully');
					return { success: true, message: 'Success' };
				}

				throw new Error('Something went wrong');
			default:
				return { success: true, message: 'Success' };
		}
	} catch (error) {
		console.log(error.response);
		throw new Error(error?.response?.data?.message || error?.response?.data?.error || error.message);
	}
}

export { apiCall };
