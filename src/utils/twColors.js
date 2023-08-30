const colors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const getColorClass = (i) => {
	// const sortedColors = ['red', 'green', 'blue', 'yellow', 'pink', 'lime', 'sky', 'amber', 'purple', 'yellow', 'cyan', 'orange'];
	// return `bg-${sortedColors[i]}-${300} border-${sortedColors[i]}-${500}`;

	switch (i) {
		case 0:
			return `bg-red-300 border-red-500`;
		case 1:
			return 'bg-green-300 border-green-500';
		case 2:
			return 'bg-blue-300 border-blue-500';
		case 3:
			return 'bg-yellow-300 border-yellow-500';
		case 4:
			return 'bg-pink-300 border-pink-500';
		case 5:
			return 'bg-lime-300 border-lime-500';
		case 6:
			return 'bg-sky-300 border-sky-500';
		case 7:
			return 'bg-amber-300 border-amber-500';
		case 8:
			return 'bg-purple-300 border-purple-500';
		case 9:
			return 'bg-yellow-300 border-yellow-500';
		case 10:
			return 'bg-cyan-300 border-cyan-500';
		case 11:
			return 'bg-orange-300 border-orange-500';

		default:
			return 'bg-gray-300 border-gray-500';
	}
};

const twColors = { colors, shades, getColorClass };

export default twColors;
