import * as emoji from 'node-emoji'

const foodEmojis = [
  'apple',
  'avocado',
  'bacon',
  'bagel',
  'banana',
  'broccoli',
  'bread',
  'broccoli',
  'candy',
  'canned_food',
  'carrot',
  'cheese',
  'chestnut',
  'chicken',
  'chocolate_bar',
  'coconut',
  'corn',
  'croissant',
  'cucumber',
  'cupcake',
  'dango',
  'doughnut',
  'egg',
  'eggplant',
  'fries',
  'grapes',
  'green_apple',
  'hamburger',
  'honey_pot',
  'ice_cream',
  'kiwi_fruit',
  'leafy_green',
  'lemon',
  'lollipop',
  'mango',
  'melon',
  'mushroom',
  'pancakes',
  'pear',
  'peanuts',
  'peach',
  'pepper',
  'pie',
  'pizza',
  'popcorn',
  'pretzel',
  'rice_ball',
  'salad',
  'sake',
  'sandwich',
  'spaghetti',
  'stew',
  'strawberry',
  'stuffed_flatbread',
  'sushi',
  'taco',
  'takeout_box',
  'tangerine',
  'tomato',
  'tropical_drink',
  'watermelon',
  'wine_glass',
]

const getEmoji = (search) => {
  const terms = search.toLowerCase().split(' ')

  let foundEmoji = false

  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i]
    const res = emoji.search(term)

    for (let j = 0; j < res.length; j += 1) {
      const resObject = res[j]
      const isFood = foodEmojis.some((food) => resObject?.name === food)

      if (isFood) {
        foundEmoji = resObject.emoji
      }
    }
  }

  return foundEmoji || <img src="./assets/icons/food-icon.png" alt="food-icon" className="h-16" />
}

export default getEmoji
