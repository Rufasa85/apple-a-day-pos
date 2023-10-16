import { classCondition } from '../../utils'

const Typeahead = (properties) => {
  const { data, setSelection, className } = properties
  const dataKeyArray = Object.keys(data)

  return (
    <div className="w-full flex flex-col">
      <p className="font-semibold my-2 sm:text-sm text-base">Suggestions</p>

      <div className={`${className} h-60 w-full top-full overflow-y-auto ring-inset ring-1 ring-gray-200 rounded-lg bg-white flex flex-col`}>
        <ol className="divide-y w-full h-fit rounded-lg flex flex-col">
          {dataKeyArray.map((key) =>
            data[key].map((item, i) => {
              const splitPartials = key === 'partial' && (data.exact.length > 0 || data.close.length > 0)

              return (
                <button key={`typeahead-term-${item.id}`} onClick={() => setSelection(item)} type="button">
                  <li
                    /* eslint-disable no-nested-ternary */
                    className={classCondition(
                      splitPartials && i === 0 ? 'text-gray-500 border-t border-gray-200' : false,
                      splitPartials > 0 ? 'text-gray-500' : false,
                      'group pl-9 pr-4 py-2 sm:text-sm text-base hover:bg-blue-600 hover:text-white hover:font-semibold hover:cursor-pointer flex justify-between items-center'
                    )}
                    /* eslint-enable no-nested-ternary */
                    // couldn't find clear solution for this -HW
                  >
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
                  </li>
                </button>
              )
            })
          )}
        </ol>
      </div>
    </div>
  )
}

export default Typeahead
