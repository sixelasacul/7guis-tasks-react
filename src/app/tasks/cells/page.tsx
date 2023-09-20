'use client'

import * as React from 'react'
import { Cell } from './Cell'
import style from './styles.module.css'

const ASCII_OFFSET = 65
const ROW_RANGE = 100
const COLUMNS = Array.from({ length: 26 }).map((_, i) =>
  String.fromCharCode(i + ASCII_OFFSET)
)
const ROWS = Array.from({ length: ROW_RANGE }).map((_, i) => i)
const prefill: readonly (readonly [string, string])[] = COLUMNS.flatMap((c, i) => ROWS.map((r) => `${c}${r}`).map((k, j) => [k, (i+100*j).toString()]))

export default function Cells() {
  const [formulas, setFormulas] = React.useState(new Map<string, string>(prefill))
  const [results, setResults] = React.useState(new Map<string, string>())

  function computeResults(_formulas = formulas) {
    console.time('update')
    const newResults = new Map(results)
    for (const [key, formula] of _formulas) {
      if (formula.startsWith('=')) {
        const parsedFormula = formula.substring(1).replace(/[A-Z]\d{1,2}/g, (match) => results.get(match) ?? '')
        newResults.set(key, eval(parsedFormula.trim()))
      } else {
        newResults.set(key, formula)
      }
    }
    setResults(newResults)
    console.timeEnd('update')
  }

  function updateCell(key: string, value: string) {
    const nextFormulas = new Map(formulas)
    nextFormulas.set(key, value)

    setFormulas(nextFormulas)
    computeResults(nextFormulas)
  }

  React.useEffect(() => {
    computeResults()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      <table>
        <thead>
          <tr>
            <th>\</th>
            {COLUMNS.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row}>
              <td>{row}</td>
              {COLUMNS.map((cell) => {
                const key = `${cell}${row}`
                return (
                  <td key={key}>
                    <Cell
                      formula={formulas.get(key) ?? ''}
                      result={results.get(key) ?? ''}
                      onUpdate={(value) => updateCell(key, value)}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
  )
}
