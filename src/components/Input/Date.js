import { useState, useRef } from 'react'

import Icons from '../Icons'

const Date = (properties) => {
  const { name = 'date', placeholder, value = '', onChange = (e) => console.log(e), className = '' } = properties
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const inputRef = useRef(null)

  const handleClicks = () => {
    if (showPlaceholder) {
      inputRef.current.focus()
      setShowPlaceholder(false)
    }
  }

  const handleChange = (e) => {
    onChange(e)

    if (showPlaceholder) {
      setShowPlaceholder(false)
    }
  }

  return (
    <div className={`${className} cursor-pointer relative flex items-center`}>
      <button onClick={handleClicks} className="absolute left-2 flex items-center" type="button">
        <Icons.Date className="h-5 w-5 stroke-gray-400" />
      </button>

      <span className="sr-only">Date</span>

      <input
        type="date"
        name={name}
        autoComplete="off"
        ref={inputRef}
        onClick={handleClicks}
        value={value}
        onChange={handleChange}
        className="input-with-icon"
      />

      {showPlaceholder && !value && (
        <button onClick={handleClicks} className="text-gray-400 absolute left-32 sm:text-sm text-base flex items-center" type="button">
          {placeholder}
        </button>
      )}
    </div>
  )
}

export default Date
