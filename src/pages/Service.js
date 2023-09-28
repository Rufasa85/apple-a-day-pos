import { useState } from 'react'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'

import { Customer, Item, Loading } from '../components'
import { api, classCondition } from '../utils'

const Service = (properties) => {
  const { UserId } = properties
  const [ShiftId, setShiftId] = useState(0)
  const [shiftItems, setShiftItems] = useState([])
  const [customer, setCustomer] = useState()
  const [orderItems, setOrderItems] = useState([])

  const today = dayjs().format('MM/DD/YYYY')
  const longDate = dayjs().format('dddd, MMMM D, YYYY')

  const { isLoading, refetch } = useQuery({
    queryKey: `shiftItems-${today}`,
    queryFn: () => api.getTodaysItems(UserId),
    enabled: !!UserId,
    onSuccess: (response) => {
      if (response?.data?.ShiftItems) {
        const { id, ShiftItems } = response.data

        const itemsSortedByCreation = ShiftItems.sort((a, b) => a.createdAt > b.createdAt)
        const itemObjects = itemsSortedByCreation.map((shiftItem) => shiftItem.Item)

        setShiftId(id)
        setShiftItems(itemObjects)

        const storedCustomer = JSON.parse(localStorage.getItem('customer'))
        if (storedCustomer) setCustomer(storedCustomer)

        const storedItems = JSON.parse(localStorage.getItem('items'))
        if (storedItems) setOrderItems(storedItems)
      } else {
        localStorage.removeItem('customer')
        localStorage.removeItem('items')
      }
    },
  })

  const submitOrder = async () => {
    const confirmed = window.confirm(`Are you sure you'd like to submit this order?`)

    if (confirmed) {
      const CustomerId = customer ? customer.id : null

      const items = orderItems
        .filter((item) => item.quantity > 0)
        .map((item) => {
          const { ItemId, quantity } = item
          return { ItemId, quantity }
        })

      const res = await api.createOrder({ ShiftId, CustomerId, items })

      if (res.status === 200) {
        localStorage.removeItem('customer')
        localStorage.removeItem('items')
        setCustomer()
        setOrderItems([])
      } else {
        window.alert('order failed')
      }
    }
  }

  return (
    <main className="pt-[84px] w-screen h-screen max-w-screen max-h-screen flex">
      <section className="p-4 overflow-y-auto w-full h-full max-w-[75%] max-h-full flex flex-col">
        <header className="p-4 flex flex-col place-content-center">
          <h3 className="section-headline">{longDate}</h3>
        </header>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="p-4 gap-8 w-full grid auto-rows-min sm:grid-cols-2 grid-cols-1">
            {shiftItems?.map((item, i) => (
              <Item.ShiftItem key={`shiftitem-${i}`} index={i} item={item} orderItems={orderItems} setOrderItems={setOrderItems} />
            ))}

            <Item.Add refetch={refetch} />
          </div>
        )}
      </section>

      <section className="p-4 w-1/4 bg-slate-50 ring-inset ring-1 ring-gray-200 shadow-lg shadow-gray-200 min-h-full min-w-fit flex flex-col">
        <header className="p-4 flex flex-col place-content-center">
          <h3 className="section-headline">Current Order</h3>
        </header>

        <div className="px-4 py-4 flex">
          {customer ? <Customer.Card customer={customer} setCustomer={setCustomer} /> : <Customer.Add customer={customer} setCustomer={setCustomer} />}
        </div>

        <ul className="px-3 py-8 gap-8 mx-1 my-4 border-t border-b h-full overflow-y-auto flex flex-col">
          {orderItems.map((item, i) => (
            <Item.OrderItem key={`orderitem-${i}`} index={i} item={item} orderItems={orderItems} setOrderItems={setOrderItems} />
          ))}
        </ul>

        <button
          disabled={orderItems.length < 1}
          onClick={submitOrder}
          className={classCondition(orderItems.length < 1 ? 'button-primary-off' : 'button-primary', 'm-4')}
          type="button"
        >
          Submit Order
        </button>
      </section>
    </main>
  )
}

export default Service
