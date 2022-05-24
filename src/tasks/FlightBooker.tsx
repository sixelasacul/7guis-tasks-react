import * as React from 'react'

const DATE_FORMAT_REX = /^(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.([0-9]{4})$/

function isValidDate(date: string) {
  return DATE_FORMAT_REX.test(date)
}
function parseDate(date: string) {
  const result = date.match(DATE_FORMAT_REX)
  if (!result) return null
  const [, day, month, year] = result
  return new Date(Number(year), Number(month), Number(day)).getTime()
}
function pad(n: number) {
  return n.toString().padStart(2, '0')
}
function getDefaultDate() {
  const d = new Date()
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${pad(d.getFullYear())}`
}

// Could have just used the `type="date"` as it is natively
// supported in HTML. But I wanted to implement the constraints myself
function DatePicker({
  date,
  setDate,
  isInvalid = false,
  isDisabled = false
}: {
  date: string
  setDate(d: string): void
  isInvalid?: boolean
  isDisabled?: boolean
}) {
  return (
    <input
      value={date}
      onChange={(e) => setDate(e.target.value)}
      disabled={isDisabled}
      style={{
        backgroundColor: isInvalid ? 'red' : 'white'
      }}
    />
  )
}

const defaultDate = getDefaultDate()
export function FlightBooker() {
  const [isReturnFlight, setReturnFlight] = React.useState(false)
  const [startDate, setStartDate] = React.useState(defaultDate)
  const [endDate, setEndDate] = React.useState(defaultDate)

  const isStartDateValid = React.useMemo(
    () => !startDate || isValidDate(startDate),
    [startDate]
  )
  const isEndDateValid = React.useMemo(() => !endDate || isValidDate(endDate), [
    endDate
  ])
  const isPeriodValid = React.useMemo(() => {
    const parsedStartDate = parseDate(startDate)
    const parsedEndDate = parseDate(endDate)
    if (!parsedStartDate || !parsedEndDate) return false
    return parsedStartDate - parsedEndDate < 0
  }, [startDate, endDate])

  return (
    <div>
      <select
        onChange={(e) => setReturnFlight(e.target.value === 'return')}
        defaultValue="one-way">
        <option value="one-way">one-way flight</option>
        <option value="return">return flight</option>
      </select>
      <DatePicker
        date={startDate}
        setDate={setStartDate}
        isInvalid={!isStartDateValid}
      />
      <DatePicker
        date={endDate}
        setDate={setEndDate}
        isInvalid={isReturnFlight && !isEndDateValid}
        isDisabled={!isReturnFlight}
      />
      <button
        disabled={isReturnFlight && !isPeriodValid}
        onClick={() => {
          const returnMessage = isReturnFlight
            ? `, returning on ${endDate}`
            : ''
          window.alert(
            `Your flight is booked for ${startDate}${returnMessage}.`
          )
        }}>
        Book
      </button>
    </div>
  )
}
