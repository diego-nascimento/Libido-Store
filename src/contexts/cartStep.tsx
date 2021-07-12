import React, { ReactNode } from 'react'

type StepContextType = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}

type StepProviderProps = {
  children: ReactNode;
};

const StepContext = React.createContext({} as StepContextType)

const StepProvider: React.FC<StepProviderProps> = ({ children }) => {
  const [activeStep, setActiveStep] = React.useState<number>(0)

  return (<StepContext.Provider value={{ step: activeStep, setStep: setActiveStep }}>{children}</StepContext.Provider>)
}

const useStep = () => {
  const context = React.useContext(StepContext)
  return context
}

export { StepProvider, useStep }
