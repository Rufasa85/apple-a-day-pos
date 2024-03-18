import { useState } from 'react'
import { useQuery } from 'react-query'

import { Modal, Input } from '..'
import { api, compare } from '../../utils'

const Add = (properties) => {
  const { refetch } = properties
  const [allItems, setAllItems] = useState([])
  const [filteredItems, setFilteredItems] = useState({})
  const [itemQuery, setItemQuery] = useState({ id: null, name: '' })
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(false)

  const { error: itemsError } = useQuery({
    queryKey: ['all-items'],
    queryFn: () => api.getAllItems(),

    onSuccess: (response) => {
      if (response && response.data) {
        const itemObjects = response.data.map(({ id, name }) => ({ id, name, typeaheadValue: name }))

        setAllItems(itemObjects)
        setFilteredItems({ exact: [], close: itemObjects })
      }
    },
  })

  const filterItems = (query) => {
    const noInput = !query.name
    const data = { exact: [], close: [] }

    if (noInput) {
      data.close.push(...allItems)
      return data
    }

    allItems.forEach((item) => {
      const exactMatch = compare.stringsExact(item.name, query.name)

      if (exactMatch) {
        data.exact.push(item)
        return
      }

      const closeMatch = compare.stringIncludes(item.name, query.name)

      if (closeMatch) {
        data.close.push(item)
      }
    })

    return data
  }

  const handleInputChange = (input) => {
    const query = { name: input?.target?.value || input.name }

    const filteredData = filterItems(query)
    setFilteredItems(filteredData)

    setItemQuery(query)
  }

  const addItem = async (e) => {
    e.preventDefault()

    try {
      const itemObject = {
        id: itemQuery.id,
        name: itemQuery.name.trim(),
      }

      if (!itemObject.name) return

      const response = await api.createItem(itemObject)

      if (response?.status === 200) {
        setVisible(false)
        setItemQuery({ id: null, name: '' })
        refetch()
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
    title: 'Add Item',
    description: `Search or add an item for today's menu.`,
    buttonText: 'Add',
    buttonClassName: itemQuery?.name?.length < 1 ? 'button-primary-off' : 'button-primary',
    onSubmit: addItem,
  }

  if (itemsError) console.log(itemsError)

  return (
    <div className="overflow-visible flex h-fit">
      <button onClick={() => setVisible(true)} className="h-72 rounded-3xl add-button" type="button">
        <div className="item-button-content">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="3 3 18 18" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

          <h2 className="text-2xl font-semibold">Add Menu Item</h2>
        </div>
      </button>

      <Modal options={modalOptions} className="gap-x-3 gap-y-4 flex flex-col relative">
        <Input.Search placeholder={allItems[0]?.name || 'Add or Search'} value={itemQuery.name} onChange={handleInputChange} />
        <Input.Typeahead data={filteredItems} setSelection={handleInputChange} />

        {error && <p className="input-error">Sorry, something went wrong.</p>}
      </Modal>
    </div>
  )
}

export default Add
