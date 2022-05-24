import * as React from 'react'
import {
  Counter,
  TemperatureConverter,
  FlightBooker,
  Timer,
  CRUD,
  CircleDrawer,
  Cells
} from './tasks'

export function App() {
  return (
    <div>
      <h1>7 GUIs tasks</h1>
      <p>
        Reference:{' '}
        <a
          href="https://eugenkiss.github.io/7guis/tasks"
          target="_blank"
          rel="noopener noreferrer">
          https://eugenkiss.github.io/7guis/tasks
        </a>
      </p>
      <p>
        HackerNews source:{' '}
        <a
          href="https://news.ycombinator.com/item?id=31273802"
          target="_blank"
          rel="noopener noreferrer">
          https://news.ycombinator.com/item?id=31273802
        </a>
      </p>
      <p>
        Vanilla JS implementation:{' '}
        <a
          href="https://codesandbox.io/s/7guis-tasks-js-kjunj2"
          target="_blank"
          rel="noopener noreferrer">
          https://codesandbox.io/s/7guis-tasks-js-kjunj2
        </a>
      </p>
      <p>
        Solid JS implementation:{' '}
        <a
          href="https://codesandbox.io/s/7guis-tasks-solid-j99utk"
          target="_blank"
          rel="noopener noreferrer">
          https://codesandbox.io/s/7guis-tasks-solid-j99utk
        </a>
      </p>
      <div>
        <h2>1- Counter</h2>
        <Counter />
        <h2>2- Temperature Converter</h2>
        <TemperatureConverter />
        <h2>3- Flight Booker</h2>
        <FlightBooker />
        <h2>4- Timer</h2>
        <Timer />
        <h2>5- CRUD</h2>
        <CRUD />
        <h2>6- Circle Drawer</h2>
        <CircleDrawer />
        <h2>7- Cells</h2>
        <Cells />
      </div>
    </div>
  )
}
