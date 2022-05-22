import * as React from 'react'

export function Timer() {
  // all variables are in seconds
  const [duration, setDuration] = React.useState(0)
  const [ellapsedTime, setEllapsedTime] = React.useState(0)

  const hasReachedLimit = React.useMemo(() => !(ellapsedTime < duration), [
    ellapsedTime,
    duration
  ])

  React.useEffect(() => {
    // Could use `useRef` to clear timeout once limit is reached
    // and not create one until duration is set
    const timer = setInterval(() => {
      if (hasReachedLimit) return
      setEllapsedTime((prev) => prev + 0.1)
    }, 100)
    return () => clearInterval(timer)
  }, [hasReachedLimit])

  return (
    <div>
      <label>
        Elapsed Time: <progress value={ellapsedTime} max={duration} />
      </label>
      <p style={{ marginRight: 'auto' }}>{ellapsedTime.toFixed(1)}s</p>
      <label>
        Duration:{' '}
        <input
          type="range"
          value={duration * 5}
          onChange={(e) => {
            // Set max to 20s
            setDuration(Number(e.target.value) / 5)
          }}
        />
      </label>
      <button
        onClick={() => {
          setEllapsedTime(0)
        }}
      >
        Reset
      </button>
    </div>
  )
}
