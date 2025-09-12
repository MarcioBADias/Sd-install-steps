import { useEffect, useReducer } from 'react'

const Steps = ({ APIUrl, reduce }) => {
  const [state, dispatch] = useReducer(reduce, { step: 0, steps: [] })

  useEffect(() => {
    fetch(APIUrl)
      .then((r) => r.json())
      .then((data) => dispatch({ type: 'set_steps', payload: data }))
      .catch(console.log)
  }, [])

  const handleNextStep = () => dispatch({ type: 'increment_step' })
  const handlePreviusStep = () => dispatch({ type: 'decrement_step' })

  return (
    <div className="steps">
      <div className="numbers">
        {state.steps.map((s, i) => (
          <div
            key={s.id}
            className={i === state.step ? 'active' : ''}
            onClick={() => dispatch({ type: 'set_step_by_index', payload: i })}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <h1 className="title">{state.steps[state.step]?.title}</h1>
      <h2 className="message">
        {state.steps[state.step]?.content?.map((i) => (
          <ul key={i.id}>
            <li style={{ listStyle: 'none' }}>
              {i.id.slice(5)} - {i.text}
            </li>
          </ul>
        ))}
      </h2>
      <div className="buttons">
        <button onClick={handlePreviusStep}>Anterior</button>
        <button onClick={handleNextStep}>Próximo</button>
      </div>
    </div>
  )
}
export { Steps }
