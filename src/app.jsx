import { useEffect, useReducer, useState } from 'react'
import { Steps } from './components/Steps/Steps'

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
    set_step_by_index: {
      ...state,
      step: action.payload,
    },
  })[action.type] || state

const App = () => {
  const [buttonsActive, setButtonsActive] = useState(true)
  const [showPdvInstallSteps, setShowPdvInstallSteps] = useState(false)
  const [showSuperInstallSteps, setShowSuperInstallSteps] = useState(false)
  const [showContainer, setShowContainer] = useState(false)

  const handlePdvInstallContent = () => {
    setShowPdvInstallSteps((s) => !s)
    setButtonsActive((s) => !s)
  }
  const handleSuperInstallContent = () => {
    setShowSuperInstallSteps((s) => !s)
    setButtonsActive((s) => !s)
  }
  const handleShowContent = () => setShowContainer((s) => !s)
  const handleCloseContent = () => {
    setShowPdvInstallSteps(false)
    setShowSuperInstallSteps(false)
    setShowContainer((s) => !s)
    setButtonsActive((s) => !s)
  }
  return (
    <>
      {buttonsActive ? (
        <div className="container-close">
          <button className="close" onClick={handlePdvInstallContent}>
            {showPdvInstallSteps ? 'Fechar' : 'Instalar SDPdv'}
          </button>
          <button className="close" onClick={handleSuperInstallContent}>
            {showSuperInstallSteps ? 'Fechar' : 'Instalar Retaguarda'}
          </button>
        </div>
      ) : (
        <div className="container-close">
          <button className="close" onClick={handleCloseContent}>
            Fechar
          </button>
        </div>
      )}
      {showPdvInstallSteps && (
        <Steps
          reduce={reduce}
          APIUrl={
            'https://raw.githubusercontent.com/MarcioBADias/data-fake/refs/heads/main/sd-pdv-install-steps.json'
          }
        />
      )}
      {showSuperInstallSteps && (
        <Steps
          reduce={reduce}
          APIUrl={
            'https://raw.githubusercontent.com/MarcioBADias/data-fake/refs/heads/main/sd-super-install.json'
          }
        />
      )}
    </>
  )
}

export { App }
