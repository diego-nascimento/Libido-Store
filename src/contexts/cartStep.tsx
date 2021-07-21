import React, { ReactNode } from 'react'

type StepContextType = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  resetContext: () => void
}

type StepProviderProps = {
  children: ReactNode;
};

const StepContext = React.createContext({} as StepContextType)

const StepProvider: React.FC<StepProviderProps> = ({ children }: any) => {
  const [activeStep, setActiveStep] = React.useState<number>(0)

  const resetContext = () => {
    setActiveStep(0)
  }

  return (<StepContext.Provider value={{ step: activeStep, setStep: setActiveStep, resetContext }}>{children}</StepContext.Provider>)
}

const useStep = () => {
  const context = React.useContext(StepContext)
  return context
}

export { StepProvider, useStep }
