import Icons from '../Icons'

const OrderItem = (properties) => {
  const { index, item = { orderItemName: '', quantity: 0 }, orderItems, setOrderItems } = properties
  const { orderItemName, quantity } = item

  const handleInputChange = (e) => {
    const updatedOrderItems = [...orderItems]
    const newQuantity = Number(e.target.value)

    if (newQuantity >= 0) {
      updatedOrderItems[index].quantity = newQuantity
    } else {
      updatedOrderItems.splice(index, 1)
    }

    setOrderItems(updatedOrderItems)
    localStorage.setItem('items', JSON.stringify(updatedOrderItems))
  }

  const increment = () => {
    const updatedOrderItems = [...orderItems]

    updatedOrderItems[index].quantity = quantity + 1

    setOrderItems(updatedOrderItems)
    localStorage.setItem('items', JSON.stringify(updatedOrderItems))
  }

  const decrement = () => {
    const updatedOrderItems = [...orderItems]

    if (quantity > 0) {
      updatedOrderItems[index].quantity = quantity - 1
    } else {
      updatedOrderItems.splice(index, 1)
    }

    setOrderItems(updatedOrderItems)
    localStorage.setItem('items', JSON.stringify(updatedOrderItems))
  }

  return (
    <li className="gap-3 justify-between items-center flex">
      <div className="w-8 max-w-full flex grow">
        <p className="font-semibold truncate">{orderItemName}</p>
      </div>

      <div className="w-40 p-0 relative">
        <button onClick={decrement} className="w-10 h-full top-0 left-0 absolute p-0 button-secondary" type="button">
          {quantity > 0 ? <Icons.Minus className="w-3 h-3" /> : <Icons.Trash className="w-4 h-4 stroke-red-600" />}
        </button>

        <input type="number" value={quantity} onChange={handleInputChange} className="text-center  input-base" />

        <button onClick={increment} className="w-10 h-full top-0 right-0 absolute p-0 button-secondary" type="button">
          <Icons.Plus className="w-3 h-3" />
        </button>
      </div>
    </li>
  )
}

export default OrderItem
