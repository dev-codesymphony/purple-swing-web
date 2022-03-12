import moment from 'moment';

export const YEAR_GAP = '80';

export const CURRENT_YEAR = moment().format('YYYY');
export const PAST_YEAR = moment(CURRENT_YEAR, 'YYYY').subtract(YEAR_GAP, 'years').format('YYYY');

export const MONTHS = [
	{ text: 'January', key: '01', days: 31 },
	{ text: 'February', key: '02', days: 29 },
	{ text: 'March', key: '03', days: 31 },
	{ text: 'April', key: '04', days: 30 },
	{ text: 'May', key: '05', days: 31 },
	{ text: 'June', key: '06', days: 30 },
	{ text: 'July', key: '07', days: 31 },
	{ text: 'August', key: '08', days: 31 },
	{ text: 'September', key: '09', days: 30 },
	{ text: 'October', key: '10', days: 31 },
	{ text: 'November', key: '11', days: 30 },
	{ text: 'December', key: '12', days: 31 },
];

export const getYear = () => {
	let years = [];

	for (let i = parseInt(PAST_YEAR); i <= parseInt(CURRENT_YEAR); i++) {
		years = [...years, { key: i, text: i }];
	}
	return years;
};
