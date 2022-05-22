import * as React from 'react'

function isNumber(value: string | number): value is number {
  // Handling null, undefined
  const temp = value ?? ''
  // Not catching 0
  if (temp === '') return false
  return !Number.isNaN(Number(value))
}

function celsiusToFarenheit(celsius: number) {
  return celsius * (9 / 5) + 32
}
function farenheitToCelsius(farenheit: number) {
  return (farenheit - 32) * (5 / 9)
}

function Temperature({
  label,
  value,
  setValue
}: {
  label: string
  value: string
  setValue(value: string): void
}) {
  return (
    <label>
      <input value={value} onChange={(e) => setValue(e.target.value)} /> {label}
    </label>
  )
}

export function TemperatureConverter() {
  const [celsius, setCelsius] = React.useState('')
  const [farenheit, setFarenheit] = React.useState('')

  return (
    <div>
      <Temperature
        label="Celsius"
        value={celsius}
        setValue={(n) => {
          setCelsius(n)
          if (isNumber(n)) {
            setFarenheit(celsiusToFarenheit(n).toFixed(2))
          }
        }}
      />{' '}
      ={' '}
      <Temperature
        label="Farenheit"
        value={farenheit}
        setValue={(n) => {
          setFarenheit(n)
          if (isNumber(n)) {
            setCelsius(farenheitToCelsius(n).toFixed(2))
          }
        }}
      />
    </div>
  )
}
