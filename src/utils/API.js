import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'
// const baseUrl = 'https://apple-a-day-pos-11214dcf0b89.herokuapp.com/api'

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
})

const api = {
  // Auth
  login: async (loginObj) => {
    try {
      const res = await instance.post('/users/login', loginObj)
      return res
    } catch (error) {
      return error.response
    }
  },
  logout: () => {
    try {
      localStorage.removeItem('token')
      window.location.replace('/login')
    } catch (error) {
      console.log(error)
    }
  },
  checkToken: async () => {
    try {
      const res = await instance.post(
        '/users/check-token',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      return res
    } catch (error) {
      console.log(error)
    }
  },
  // Customers
  getAllCustomers: async () => {
    try {
      const customers = await instance.get('/customers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return customers
    } catch (error) {
      console.log(error)
    }
  },
  getOneCustomer: async (customerId) => {
    try {
      const customer = await instance.get(`/customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return customer
    } catch (error) {
      console.log(error)
    }
  },
  createCustomer: async (customerObj) => {
    try {
      const newCustomer = await instance.post('/customers', customerObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return newCustomer
    } catch (error) {
      console.log(error)
    }
  },
  updateCustomer: async (customerId, customerObj) => {
    try {
      const updatedCustomer = await instance.put(`/customers/${customerId}`, customerObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return updatedCustomer
    } catch (error) {
      console.log(error)
    }
  },
  deleteCustomer: async (customerId) => {
    try {
      const deletedCustomer = await instance.delete(`/customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return deletedCustomer
    } catch (error) {
      console.log(error)
    }
  },
  // Items
  getAllItems: async () => {
    try {
      const items = await instance.get('/items', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return items
    } catch (error) {
      console.log(error)
    }
  },
  getOneItem: async (itemId) => {
    try {
      const item = await instance.get(`/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return item
    } catch (error) {
      console.log(error)
    }
  },
  createItem: async (ItemObj) => {
    try {
      const newItem = await instance.post('/items', ItemObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return newItem
    } catch (error) {
      console.log(error)
    }
  },
  updateItem: async (itemObj, itemId) => {
    try {
      const updatedItem = await instance.put(`/items/${itemId}`, itemObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return updatedItem
    } catch (error) {
      console.log(error)
    }
  },
  deleteItem: async (itemId) => {
    try {
      const deletedItem = await instance.delete(`/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return deletedItem
    } catch (error) {
      console.log(error)
    }
  },
  // Orders
  getAllOrders: async () => {
    try {
      const orders = await instance.get('/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return orders
    } catch (error) {
      console.log(error)
    }
  },
  getOneOrder: async (orderId) => {
    try {
      const order = await instance.get(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return order
    } catch (error) {
      console.log(error)
    }
  },
  createOrder: async (orderObj) => {
    try {
      const newOrder = await instance.post('/orders', orderObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return newOrder
    } catch (error) {
      console.log(error)
    }
  },
  updateOrder: async (orderObj, orderId) => {
    try {
      const updatedOrder = await instance.put(`/orders/${orderId}`, orderObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return updatedOrder
    } catch (error) {
      console.log(error)
    }
  },
  deleteOrder: async (orderId) => {
    try {
      const deletedOrder = await instance.delete(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return deletedOrder
    } catch (error) {
      console.log(error)
    }
  },
  // Shifts
  getAllShifts: async () => {
    try {
      const shifts = await instance.get('/shifts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return shifts
    } catch (error) {
      console.log(error)
    }
  },
  getOneShift: async (shiftId) => {
    try {
      const shift = await instance.get(`/shifts/${shiftId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return shift
    } catch (error) {
      console.log(error)
    }
  },
  getTodaysItems: async (UserId) => {
    try {
      const shift = await instance.get(`/shifts/today/${UserId}`)
      return shift
    } catch (error) {
      console.log(error)
    }
  },
  createShift: async (shiftObj) => {
    try {
      const newShift = await instance.post('/shifts', shiftObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return newShift
    } catch (error) {
      console.log(error)
    }
  },
  updateShift: async (shiftObj, shiftId) => {
    try {
      const updatedShift = await instance.put(`/shifts/${shiftId}`, shiftObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return updatedShift
    } catch (error) {
      console.log(error)
    }
  },
  deleteShift: async (shiftId) => {
    try {
      const deletedShift = await instance.delete(`/shifts/${shiftId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return deletedShift
    } catch (error) {
      console.log(error)
    }
  },
  deleteShiftItem: async (shiftItemId) => {
    try {
      const deletedShiftItem = await instance.delete(`/shifts/${shiftItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return deletedShiftItem
    } catch (error) {
      console.log(error)
    }
  },
}

export default api
