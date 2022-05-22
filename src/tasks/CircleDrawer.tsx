import * as React from 'react'
import './CircleDrawer.css'

interface CircleObject {
  x: number
  y: number
  radius: number
  id: number
}

// Inspired by https://github.com/frontendphil/react-undo-redo
// We could set an history size to avoid performance issues for
// more complex and larger data
function useStateWithHistory<T>(
  initialValue: T
): [
  T,
  (nextValue: T | ((previous: T) => T)) => void,
  {
    undo(): void
    redo(): void
    clear(): void
    canUndo: boolean
    canRedo: boolean
    canClear: boolean
  }
] {
  const [state, setState] = React.useState<T>(initialValue)
  const [past, setPast] = React.useState<T[]>([])
  const [future, setFuture] = React.useState<T[]>([])

  function setInternalState(nextValue: T | ((previous: T) => T)) {
    setFuture([])
    setPast((previous) => [state, ...previous])
    setState(nextValue)
  }
  function undo() {
    if (past.length === 0) return
    const [lastPastItem] = past
    setFuture((prev) => {
      return [state, ...prev]
    })
    setPast((prev) => {
      const [, ...newPast] = prev
      return newPast
    })
    setState(lastPastItem)
  }
  function redo() {
    if (future.length === 0) return
    const [lastFutureItem] = future
    setPast((prev) => {
      return [state, ...prev]
    })
    setFuture((prev) => {
      const [, ...newFuture] = prev
      return newFuture
    })
    setState(lastFutureItem)
  }
  function clear() {
    setPast([])
    setFuture([])
    setState(initialValue)
  }

  return [
    state,
    setInternalState,
    {
      undo,
      redo,
      clear,
      canUndo: past.length > 0,
      canRedo: future.length > 0,
      canClear: past.length > 0
    }
  ]
}

function Circle({
  x,
  y,
  radius,
  onClick
}: CircleObject & { onClick?: React.MouseEventHandler<HTMLDivElement> }) {
  const width = radius * 2
  return (
    <div
      className="circle"
      style={{
        position: 'absolute',
        top: y - radius,
        left: x - radius,
        width: width + 'px',
        aspectRatio: '1/1',
        border: '1px solid black',
        borderRadius: width + 'px'
      }}
      role="button"
      onClick={onClick}
    ></div>
  )
}

const DEFAULT_RADIUS = 10
export function CircleDrawer() {
  const [
    circles,
    setCircles,
    { undo, redo, canUndo, canRedo }
  ] = useStateWithHistory<CircleObject[]>([])
  const [
    selectedCircle,
    setSelectedCircle
  ] = React.useState<CircleObject | null>(null)
  const drawingZoneRef = React.useRef<HTMLDivElement>(null)

  function addCircle({
    clientX,
    clientY,
    target
  }: React.MouseEvent<HTMLDivElement>) {
    if (!drawingZoneRef.current) return
    // Cannot rely on event.target, as it could be another circle
    const rect = drawingZoneRef.current?.getBoundingClientRect()
    const radius = DEFAULT_RADIUS
    const x = clientX - rect.x
    const y = clientY - rect.y

    setCircles((current) => current.concat({ x, y, radius, id: Date.now() }))
  }
  function editCircle(circle: CircleObject) {
    setCircles((current) =>
      current.map((c) => {
        if (c.id === circle.id) {
          return circle
        }
        return c
      })
    )
  }

  const selectedCirclePosition = selectedCircle
    ? `(${Math.round(selectedCircle.x)}, ${Math.round(selectedCircle.y)})`
    : ''

  return (
    <div>
      <hr />
      <button onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        Redo
      </button>
      <div
        ref={drawingZoneRef}
        role="button"
        style={{
          border: '1px solid black',
          height: '8rem',
          position: 'relative'
        }}
        onClick={addCircle}
      >
        {circles
          .filter((c) => c.id !== selectedCircle?.id)
          .concat(selectedCircle ?? [])
          .map((circle) => (
            <Circle
              key={circle.id}
              {...circle}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedCircle(circle)
              }}
            />
          ))}
      </div>
      {selectedCircle && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'white',
            border: '1px solid black'
          }}
        >
          <div>
            <p>Adjust diameter of circle at {selectedCirclePosition}.</p>
            <input
              type="range"
              value={selectedCircle.radius}
              min={1}
              max={100}
              onChange={(e) => {
                setSelectedCircle((current) => {
                  // shouldn't be possible though
                  if (!current) return current
                  return {
                    ...current,
                    radius: Number(e.target.value)
                  }
                })
              }}
            />
            <button
              onClick={() => {
                setSelectedCircle((current) => {
                  if (!current) return current
                  editCircle(current)
                  return null
                })
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
