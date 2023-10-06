import { useState } from 'react'
import { useQuery } from 'react-query'

import { Modal, Input } from '..'
import { api, compareCustomers } from '../../utils'

const Add = (properties) => {
  const { setCustomer } = properties
  const [visible, setVisible] = useState(false)
  const [allCustomers, setAllCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState({})
  const [customerQuery, setCustomerQuery] = useState({ firstName: '', lastName: '', dateOfBirth: '' })
  const [error, setError] = useState(false)

  const { error: customerError } = useQuery({
    queryKey: ['all-customers'],
    queryFn: () => api.getAllCustomers(),

    onSuccess: (response) => {
      if (response && response.data) {
        const customerObjects = response.data.map(({ id, firstName, lastName, dateOfBirth }) => {
          const typeaheadValue = `${firstName} ${lastName}`

          return { id, firstName, lastName, dateOfBirth, typeaheadValue }
        })

        setAllCustomers(customerObjects)
        setFilteredCustomers({ exact: [], close: [], partial: customerObjects, date: [] })
      }
    },
  })

  const filterCustomers = (query) => {
    const noInput = !query.firstName && !query.lastName && !query.dateOfBirth
    const data = { exact: [], close: [], partial: [], date: [] }

    if (noInput) {
      data.close.push(...allCustomers)
      return data
    }

    allCustomers.forEach((customer) => {
      const match = compareCustomers(customer, query)

      if (match === 'exact') data.exact.push(customer)
      if (match === 'close') data.close.push(customer)
      if (match === 'partial') data.partial.push(customer)
      if (match === 'date') data.date.push(customer)
    })

    return data
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const { firstName, lastName, dateOfBirth } = customerQuery

    const query = {
      firstName: name === 'first-name' ? value : firstName,
      lastName: name === 'last-name' ? value : lastName,
      dateOfBirth: name === 'date-of-birth' ? value : dateOfBirth,
    }

    const filteredData = filterCustomers(query)
    setFilteredCustomers(filteredData)

    const exactMatch = filteredData.exact.length === 1 ? filteredData.exact[0] : null
    console.log(exactMatch)
    console.log(query)
    setCustomerQuery(exactMatch || query)
  }

  const addCustomer = async (e) => {
    e.preventDefault()

    try {
      const customerObject = {
        id: customerQuery.id,
        firstName: customerQuery.firstName.trim(),
        lastName: customerQuery.lastName.trim(),
        dateOfBirth: customerQuery.dateOfBirth || null,
      }

      if (!customerQuery.firstName || !customerQuery.firstName) return

      const response = await api.createCustomer(customerObject)
      console.log(response)

      if (response?.status === 200) {
        setVisible(false)

        const selectedCustomer = response.data.customer[0]
        setCustomer({ ...selectedCustomer, dateOfBirth: selectedCustomer.dateOfBirth ? selectedCustomer.dateOfBirth : '' })

        localStorage.setItem('customer', JSON.stringify(selectedCustomer))
      } else {
        setError(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const modalOptions = {
    visible,
    setVisible,
    title: 'Add Customer',
    description: 'Search or add a customer for this order.',
    buttonText: 'Add Customer',
    buttonClassName: !customerQuery.firstName || !customerQuery.lastName ? 'button-primary-off' : 'button-primary',
    onSubmit: addCustomer,
  }

  if (customerError) console.log(customerError)

  return (
    <button onClick={() => setVisible(true)} className="h-20 add-button" type="button">
      <div className="gap-3 w-full justify-center items-center flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="3 3 18 18" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        <h2 className="text-lg font-semibold">Add Customer</h2>
      </div>

      <Modal options={modalOptions} className="gap-x-3 gap-y-4 grid grid-cols-2 relative">
        <Input.Search name="first-name" placeholder="First Name" value={customerQuery.firstName} onChange={handleInputChange} />
        <Input.Search name="last-name" placeholder="Last Name" value={customerQuery.lastName} onChange={handleInputChange} />
        <Input.Date
          name="date-of-birth"
          placeholder="Date of Birth (optional)"
          value={customerQuery.dateOfBirth}
          onChange={handleInputChange}
          className="col-span-2 peer"
        />

        <Input.Typeahead
          isQuery={customerQuery.firstName || customerQuery.lastName || customerQuery.dateOfBirth}
          data={filteredCustomers}
          setSelection={(customer) => setCustomerQuery({ ...customer, dateOfBirth: customer.dateOfBirth ? customer.dateOfBirth : '' })}
          className="peer-focus-within:hidden"
        />

        {error && <p className="input-error">Sorry, something went wrong.</p>}
      </Modal>
    </button>
  )
}

export default Add
