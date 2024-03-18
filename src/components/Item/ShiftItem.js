import { useState } from 'react'
import { api, classCondition, getEmoji, twColors } from '../../utils'
import { Icons } from '..'

const ShiftItem = (properties) => {
  const { index, item, orderItems, setOrderItems, refetch } = properties
  const { id, name } = item
  const [showing,setShowing] = useState(true);

  const addOrderItem = (ItemId, orderItemName) => {
    for (let i = 0; i < orderItems.length; i += 1) {
      const orderItem = orderItems[i]

      if (orderItem.ItemId === ItemId) {
        const updatedOrderItems = [...orderItems]
        updatedOrderItems[i].quantity += 1

        setOrderItems(updatedOrderItems)
        localStorage.setItem('items', JSON.stringify(updatedOrderItems))
        return
      }
    }

    const newOrderItems = [...orderItems, { ItemId, orderItemName, quantity: 1 }]

    setOrderItems(newOrderItems)
    localStorage.setItem('items', JSON.stringify(newOrderItems))
  }

  const removeShiftItem = async () => {
    const confirmed = window.confirm("Are you sure you want to remove this item from today's menu?")
    if (!confirmed) return
    setShowing(false);
    // try {
    //   const response = await api.deleteShiftItem(id)
    //   // console.log(response)
    //   refetch()

    //   if (response?.status === 200) {
    //     refetch()
    //   } else {
    //     throw new Error('Sorry, something went wrong.')
    //   }
    // } catch (error) {
    //   alert(error)
    // }
  }

  return (
    <div style={{
      display:showing?'block':'none'
    }}
      className={classCondition(
        twColors.getColorClass(index),
        'h-72 gap-4 flex grow justify-center items-center rounded-3xl border-2 opacity-95 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:shadow-md active:shadow-gray-200 active:opacity-100 relative'
      )}
    >
      <button onClick={() => addOrderItem(id, name)} type="button" className="w-full h-full">
        <div className="gap-4 h-28 flex flex-col justify-end items-center">
          <h2 className="text-6xl font-semibold drop-shadow-md flex flex-col justify-end items-center">{getEmoji(name)}</h2>
          <h2 className="text-2xl font-semibold drop-shadow-md">{name}</h2>
        </div>
      </button>

      <button
        onClick={removeShiftItem}
        type="button"
        className="top-2 right-2 p-2 rounded-full bg-transparent button-secondary border-2 opacity-95 shadow-gray-400 hover:opacity-90 hover:bg-white/50 active:bg-gray/50 focus:ring-0 active:ring-0 active:shadow-inner active:opacity-100 absolute peer"
      >
        <Icons.Trash className="w-4 h-4 stroke-red-600" />
      </button>
    </div>
  )
}

export default ShiftItem
