import React, { useRef } from "react"

interface CellProps {
  formula: string
  result: string
  onUpdate(formula: string): void
}

export function Cell({formula, result, onUpdate}: CellProps) {
  const [editing, setEditing] = React.useState(false)
  const [localFormula, setLocalFormula] = React.useState(formula)
  const inputRef = useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if(editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  if(editing) {
    return (
      <input
        ref={inputRef}
        value={localFormula}
        onChange={(e) => setLocalFormula(e.target.value)}
        onBlur={(event) => {
          onUpdate(event.target.value)
          setEditing(false)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onUpdate(event.currentTarget.value)
            setEditing(false)
            return;
          }
          if (event.key === 'Escape') {
            setEditing(false)
            return;
          }
        }}
      />
    )
  }

  return (
    <input
      readOnly
      value={result}
      onDoubleClick={() => setEditing(true)}
      onKeyDown={(event) => {
        if(event.key === 'Enter') {
          setEditing(true)
        }
      }}
    />
  )
}
