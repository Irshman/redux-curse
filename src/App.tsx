import {useEffect, useReducer, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {CounterId, DecrementAction, IncrementAction, store} from "./store";

function App() {
    return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Counter counterId="first" />
      <Counter counterId="second" />
    </>
  )
}

export function Counter({}: { counterId: CounterId}) {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            forceUpdate();
        })

        return unsubscribe
    }, [])

    return (
        <>
            <h1>Counter {store.getState().counters[counterId]?.counter}</h1>
            <div className="card">
                <button onClick={() => store.dispatch({ type: 'increment', payload: { counterId } } satisfies IncrementAction)}>
                    Increment
                </button>
                <button onClick={() => store.dispatch({ type: 'decrement', payload: { counterId } } satisfies DecrementAction)}>
                    Decrement
                </button>
            </div>
        </>
    )
}

export default App
