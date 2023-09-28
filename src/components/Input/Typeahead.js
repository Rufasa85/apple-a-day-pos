import { useState, useEffect } from 'react'

import { classCondition } from '../../utils'

const Typeahead = (properties) => {
  const { isQuery, data, setSelection, className } = properties
  const [showSuggestions, setShowSuggestions] = useState(false)
  const dataKeyArray = Object.keys(data)

  const handleClick = (item) => {
    setSelection(item)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      setShowSuggestions(false)
      return
    }

    setShowSuggestions(true)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }

    // eslint-disable-next-line
  }, [])

  return isQuery && showSuggestions && dataKeyArray.some((key) => data[key].length > 0) ? (
    <div
      className={`${className} mt-2 max-h-60 shadow-xl w-full h-fit top-full overflow-y-auto ring-inset ring-1 ring-gray-200 rounded-lg bg-white absolute flex flex-col z-10`}
    >
      <ol className="w-full h-fit rounded-lg flex flex-col">
        {dataKeyArray.map((key) =>
          data[key].map((item, i) => {
            const splitPartials = key === 'partial' && (data.exact.length > 0 || data.close.length > 0)

            return (
              <li
                key={`typeahead-term-${item.id}`}
                /* eslint-disable no-nested-ternary */
                className={classCondition(
                  splitPartials && i === 0 ? 'text-gray-500 border-t border-gray-200' : splitPartials ? 'text-gray-500' : '',
                  'group pl-9 pr-4 py-2 sm:text-sm text-base hover:bg-blue-600 hover:text-white hover:font-semibold hover:cursor-pointer flex justify-between items-center'
                )}
                /* eslint-enable no-nested-ternary */
                // couldn't find clear solution for this -HW
              >
                <button onClick={() => handleClick(item)} type="button">
                  {/* check mark */}
                  {key === 'exact' && (
                    <span className="absolute left-2 z-10 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.8"
                        className="h-4 w-5 stroke-green-600 group-hover:stroke-white"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" className="" />
                      </svg>
                    </span>
                  )}

                  <p>{item.typeaheadValue}</p>
                </button>
              </li>
            )
          })
        )}
      </ol>
    </div>
  ) : null
}

export default Typeahead
