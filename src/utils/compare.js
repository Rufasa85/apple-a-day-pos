import dayjs from 'dayjs';

const formatString = (string) => {
	return string.toLowerCase().replace(/\s+/g, '');
};

const formatDate = (date) => {
	return date ? dayjs(date) : null;
};

const compare = {
	stringsExact: (a, b) => formatString(a) === formatString(b),
	stringIncludes: (a, b) => formatString(a).includes(formatString(b)),
	dates: (a, b) => formatDate(a).diff(formatDate(b), 'day') < 1
};

export default compare;
