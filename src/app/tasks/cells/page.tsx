'use client'

import * as React from 'react'
import style from './styles.module.css'

const ASCII_OFFSET = 65
const COL_NAMES = Array.from({ length: 26 }).map((_, i) =>
  String.fromCharCode(i + ASCII_OFFSET)
)
const ROW_RANGE = 100
const CELLS_GRID = Array<(string | number)[]>(ROW_RANGE).fill(
  Array<string>(COL_NAMES.length).fill('')
)

function isFormula(value: string | number): value is string {
  return String(value).startsWith('=')
}
function parseDependencies(formula: string) {
  const result = formula.match(/([A-Z][-0-9])/g)
  return result
}
function convertCellToArrayItem(cell: string) {
  return [cell.charCodeAt(0), Number(cell[1])]
}

function Cell({
  value = '',
  onBlur
}: {
  value: string | number
  onBlur?(value: string | number): void
}) {
  const [localValue, setLocalValue] = React.useState(value)
  return (
    <input
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={() => onBlur?.(localValue)}
    />
  )
}

// To be thought again, following https://github.com/sixelasacul/7guis-tasks-svelte/blob/main/src/routes/tasks/cells/%2Bpage.svelte
export default function Cells() {
  const [grid, setGrid] = React.useState(CELLS_GRID)

  function updateCell(rowId: number, cellId: number, value: string | number) {
    if (isFormula(value)) {
    }
    setGrid((currentGrid) => {
      return currentGrid.map((row, localRowId) => {
        return row.map((cell, localCellId) => {
          if (localRowId === rowId && localCellId === cellId) {
            return value
          }
          return cell
        })
      })
    })
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th> </th>
            {COL_NAMES.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, rowId) => (
            <tr key={rowId}>
              <td>{rowId + 1}</td>
              {row.map((cell, cellId) => (
                <td key={cellId}>
                  <Cell
                    value={cell}
                    onBlur={(value) => updateCell(rowId, cellId, value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
