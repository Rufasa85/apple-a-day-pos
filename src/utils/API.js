import axios from "axios"

const baseUrl = "localhost:3001/api"
// const baseUrl = "deployedurl"

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
})

const api = {
  // Auth
  login: async (loginObj) => {
    try {
      const res = await instance.post("/users/login")
      return res
    } catch (error) {
      console.log(error)
    }
  },
  checkToken: async (token) => {
    try {
      const res = await instance.post("/users/checktoken")
      return res
    } catch (error) {
      console.log(error)
    }
  },
  // Customers
  getAllCustomers: async (token) => {
    try {
      const customers = await instance.get("/customers", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return customers
    } catch (error) {
      console.log(error)
    }
  },
  getOneCustomer: async (token, customerId) => {
    try {
      const customer = await instance.get(`/customers/${customerId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return customer
    } catch (error) {
      console.log(error)
    }
  },
  createCustomer: async (token, customerObj) => {
    try {
      const newCustomer = await instance.post("/customers", customerObj, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return newCustomer
    } catch (error) {
      console.log(error)
    }
  },
  updateCustomer: async (token, customerObj, customerId) => {
    try {
      const updatedCustomer = await instance.put(`/customers/${customerId}`, customerObj, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return updatedCustomer
    } catch (error) {
      console.log(error)
    }
  },
  deleteCustomer: async (token, customerId) => {
    try {
      const deletedCustomer = await instance.delete(`/customers/${customerId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return deletedCustomer
    } catch (error) {
      console.log(error)
    }
  },
  // Items
  getAllItems: async (token) => {
    try {
      const items = await instance.get("/items", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return items
    } catch (error) {
      console.log(error)
    }
  },
  getOneItem: async (token, itemId) => {
    try {
      const item = await instance.get(`/items/${itemId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return item
    } catch (error) {
      console.log(error)
    }
  },
  createItem: async (token, ItemObj) => {
    try {
      const newItem = await instance.post("/items", ItemObj, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return newItem
    } catch (error) {
      console.log(error)
    }
  },
  updateItem: async (token, itemObj, itemId) => {
    try {
      const updatedItem = await instance.put(`/items/${itemId}`, itemObj, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return updatedItem
    } catch (error) {
      console.log(error)
    }
  },
  deleteItem: async (token, itemId) => {
    try {
      const deletedItem = await instance.delete(`/items/${itemId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return deletedItem
    } catch (error) {
      console.log(error)
    }
  },
  // Orders
  getAllOrders: async (token) => {
    try {
      const orders = await instance.get("/orders", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return orders
    } catch (error) {
      console.log(error)
    }
  },
  getOneOrder: async (token, orderId) => {
    try {
      const order = await instance.get(`/orders/${orderId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return order
    } catch (error) {
      console.log(error)
    }
  },
  createOrder: async (token, orderObj) => {
    try {
      const newOrder = await instance.post("/orders", orderObj, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return newOrder
    } catch (error) {
      console.log(error)
    }
  },
  updateOrder: async (token, orderObj, orderId) => {
    try {
      const updatedOrder = await instance.put(`/orders/${orderId}`, orderObj, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return updatedOrder
    } catch (error) {
      console.log(error)
    }
  },
  deleteOrder: async (token, orderId) => {
    try {
      const deletedOrder = await instance.delete(`/orders/${orderId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return deletedOrder
    } catch (error) {
      console.log(error)
    }
  },
  // Shifts
  getAllShifts: async (token) => {
    try {
      const shifts = await instance.get("/shifts", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return shifts
    } catch (error) {
      console.log(error)
    }
  },
  getOneShift: async (token, shiftId) => {
    try {
      const shift = await instance.get(`/shifts/${shiftId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return shift
    } catch (error) {
      console.log(error)
    }
  },
  getTodaysShift: async () => {
    try {
      const shift = await instance.get(`/shifts/today`)
      return shift
    } catch (error) {
      console.log(error)
    }
  },
  createShift: async (token, shiftObj) => {
    try {
      const newShift = await instance.post("/shifts", shiftObj, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return newShift
    } catch (error) {
      console.log(error)
    }
  },
  updateShift: async (token, shiftObj, shiftId) => {
    try {
      const updatedShift = await instance.put(`/shifts/${shiftId}`, shiftObj, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return updatedShift
    } catch (error) {
      console.log(error)
    }
  },
  deleteShift: async (token, shiftId) => {
    try {
      const deletedShift = await instance.delete(`/shifts/${shiftId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return deletedShift
    } catch (error) {
      console.log(error)
    }
  },
}