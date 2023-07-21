const classCondition = (...classes) => {
	return classes.filter(Boolean).join(' ');
};

export default classCondition;
