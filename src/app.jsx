import { useEffect, useReducer, useState } from 'react'

const reduce = (state, action) =>
  ({
    set_steps: {
      ...state,
      steps: action.payload?.length > 0 ? action.payload : [],
    },
    increment_step: {
      ...state,
      step:
        state.step === state.steps?.length - 1 ? state.step : state.step + 1,
    },
    decrement_step: {
      ...state,
      step: state.step < 1 ? state.step : state.step - 1,
    },
  })[action.type] || state

const Steps = () => {
  const [state, dispatch] = useReducer(reduce, { step: 0, steps: [] })

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/MarcioBADias/data-fake/refs/heads/main/sd-pdv-install-steps.json',
    )
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
          <div key={s.id} className={i === state.step ? 'active' : ''}>
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

const App = () => {
  const [showContainer, setShowContainer] = useState(true)
  const handleShowContent = () => setShowContainer((s) => !s)
  return (
    <>
      <div className="container-close">
        <button className="close" onClick={handleShowContent}>
          {showContainer ? 'Fechar' : 'Instalar SDPdv'}
        </button>
        <button className="close" onClick={handleShowContent}>
          {showContainer ? 'Fechar' : 'Instalar Servidor'}
        </button>
        <button className="close" onClick={handleShowContent}>
          {showContainer ? 'Fechar' : 'Instalar Retaguarda'}
        </button>
      </div>
      {showContainer && <Steps />}
    </>
  )
}

export { App }
