import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue:T | (() => T)) {
  const [value, setValue] = useState<T>(()=> {
    const jsonValue = localStorage.getItem(key)
      if (jsonValue == null) {

        if (typeof initialValue === 'function') {
          return (initialValue as () => T) () //then take initalValue as a function & return that TYPE of function
        }else {
          return initialValue
        }
      } else {
        return JSON.parse(jsonValue)
      }
  })

  // to save/ update the data in our localStorage very time the 'key' or the 'value' changes [value, key]
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)) // setItem of that 'key' in our localStorage to the strigified value of our JSON
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]// return the 'value' of TYPE T & 'setValue' of whatever is the type of the setValue is
}
