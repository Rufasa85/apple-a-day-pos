import dayjs from 'dayjs'

const formatName = (name) => name.toLowerCase().replace(/\s+/g, '')

const formatDate = (date) => (date ? dayjs(date) : null)

const compareCustomers = (customer, query) => {
  const queryDate = formatDate(query.dateOfBirth)
  const customerDate = formatDate(customer.dateOfBirth)

  const dateMatch = !queryDate || !customerDate || queryDate?.diff(customerDate, 'day') < 1
  if (!dateMatch) return ''

  const queryFirst = formatName(query.firstName)
  const queryLast = formatName(query.lastName)

  const compareDateOnly = !queryFirst && !queryLast && queryDate
  if (compareDateOnly && dateMatch) return 'date'

  const customerFirst = formatName(customer.firstName)
  const customerLast = formatName(customer.lastName)

  const firstMatch = !queryFirst || customerFirst?.includes(queryFirst)
  const lastMatch = !queryLast || customerLast?.includes(queryLast)

  const firstExact = firstMatch && customerFirst.length === queryFirst.length
  const lastExact = lastMatch && customerLast.length === queryLast.length

  if (firstExact && lastExact) return 'exact'
  if (firstMatch && lastMatch) return 'close'

  const nameFlip = customerFirst?.includes(queryLast) && customerLast?.includes(queryFirst)
  if (nameFlip) return 'partial'

  return ''
}

export default compareCustomers
