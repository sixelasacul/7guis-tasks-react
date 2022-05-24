import * as React from 'react'

interface Person {
  name: string
  surname: string
}
interface IdentifiedPerson extends Person {
  id: number
}

export function CRUD() {
  const [persons, setPersons] = React.useState<IdentifiedPerson[]>([])
  const [selectedId, setSelectedId] = React.useState(-1)
  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [filter, setFilter] = React.useState('')

  const filteredPersons = React.useMemo(
    () =>
      persons.filter(({ surname }) =>
        surname.toLowerCase().startsWith(filter.toLowerCase())
      ),
    [persons, filter]
  )

  function addPerson(person: Person) {
    setPersons((current) => {
      return current.concat({ ...person, id: Date.now() })
    })
  }
  function updatePerson(person: IdentifiedPerson) {
    setPersons((current) =>
      current.map((person) => {
        if (person.id === selectedId) {
          return {
            id: selectedId,
            name,
            surname
          }
        }
        return person
      })
    )
  }
  function deletePerson(id: number) {
    setPersons((current) => current.filter(({ id }) => id !== selectedId))
  }

  return (
    <div>
      <select size={5} onChange={(e) => setSelectedId(Number(e.target.value))}>
        {filteredPersons.map(({ name, surname, id }) => (
          <option key={id} value={id}>
            {surname}, {name}
          </option>
        ))}
      </select>
      <label>
        Filter prefix:{' '}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </label>
      <label>
        Name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Surname:{' '}
        <input value={surname} onChange={(e) => setSurname(e.target.value)} />
      </label>
      <button onClick={() => addPerson({ name, surname })}>Create</button>
      <button
        onClick={() => updatePerson({ name, surname, id: selectedId })}
        disabled={selectedId === -1}>
        Update
      </button>
      <button
        onClick={() => deletePerson(selectedId)}
        disabled={selectedId === -1}>
        Delete
      </button>
    </div>
  )
}
