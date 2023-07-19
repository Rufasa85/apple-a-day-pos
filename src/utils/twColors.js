const colors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const getColorClasses = (index) => {
	switch (index) {
		case 0:
			return 'bg-red-100 border-red-200';
		case 1:
			return 'bg-green-100 border-green-200';
		case 2:
			return 'bg-blue-100 border-blue-200';
		case 3:
			return 'bg-yellow-100 border-yellow-200';
		case 4:
			return 'bg-pink-100 border-pink-200';
		case 5:
			return 'bg-lime-100 border-lime-200';
		case 6:
			return 'bg-sky-100 border-sky-200';
		case 7:
			return 'bg-amber-100 border-amber-200';
		case 8:
			return 'bg-purple-100 border-purple-200';
		case 9:
			return 'bg-yellow-100 border-yellow-200';
		case 10:
			return 'bg-cyan-100 border-cyan-200';
		case 11:
			return 'bg-orange-100 border-orange-200';

		default:
			return 'bg-gray-100';
	}
};

export default { colors, shades, getColorClasses };
