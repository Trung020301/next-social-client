import { useState } from 'react'

function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [state, setState] = useState(initialValue)

  const toggle = () => {
    setState((prevState) => !prevState)
  }

  return [state, toggle]
}

export default useToggle