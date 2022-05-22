import * as React from 'react'

export function Counter() {
  const [counter, setCounter] = React.useState(0)

  return (
    <div>
      <input value={counter} readOnly />
      <button onClick={() => setCounter((c) => c + 1)}>Count</button>
    </div>
  )
}
