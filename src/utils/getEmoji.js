import * as emoji from 'node-emoji';

const foodEmojis = ['apple', 'avocado', 'bacon', 'bagel', 'banana', 'broccoli', 'bowl_with_spoon', 'bread', 'broccoli', 'candy', 'canned_food', 'carrot', 'cheese', 'chestnut', 'chicken', 'chocolate_bar', 'coconut', 'corn', 'croissant', 'cucumber', 'cupcake', 'dango', 'doughnut', 'egg', 'eggplant', 'fries', 'fried_egg', 'fried_shrimp', 'grapes', 'green_apple', 'green_salad', 'hamburger', 'honey_pot', 'hot_pepper', 'ice_cream', 'kiwi_fruit', 'leafy_green', 'lemon', 'lollipop', 'mango', 'meat_on_bone', 'melon', 'mushroom', 'pancakes', 'pear', 'peanuts', 'peach', 'pepper', 'pie', 'pineapple', 'pizza', 'popcorn', 'pretzel', 'poultry_leg', 'rice_ball', 'rice_cracker', 'salad', 'sake', 'sandwich', 'shallow_pan_of_food', 'shaved_ice', 'spaghetti', 'stew', 'strawberry', 'stuffed_flatbread', 'sushi', 'taco', 'takeout_box', 'tangerine', 'tomato', 'tropical_drink', 'watermelon', 'wine_glass'];

const getEmoji = (search) => {
	const terms = search.toLowerCase().split(' ');

	let foundEmoji = false;

	for (let i = 0; i < terms.length; i++) {
		const term = terms[i];
		const res = emoji.search(term);

		for (let i = 0; i < res.length; i++) {
			const resObject = res[i];
			const isFood = foodEmojis.some((food) => resObject?.name === food);

			if (isFood) {
				foundEmoji = resObject.emoji;
			}
		}
	}

	return foundEmoji || <img src='./assets/icons/food-icon.png' alt='food-icon' className='h-32' />;
};

export default getEmoji;
