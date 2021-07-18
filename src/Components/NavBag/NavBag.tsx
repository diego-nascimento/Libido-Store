import React from 'react'
import { Wrapper, ContainerNav } from './NavBag.style'
import Link from 'next/link'
import Stepper from '@material-ui/core/Stepper'
import { createTheme, createStyles, makeStyles, MuiThemeProvider, Step, StepLabel, Theme } from '@material-ui/core'
import { useStep } from '../../contexts/cartStep'

const muiTheme = createTheme({
  overrides: {
    MuiStepper: {
      root: {
        padding: '0px',
        margin: '0px',
        background: 'transparent'
      }

    },
    MuiStepIcon: {
      root: {
        color: '#B2B2B2',
        '&$active': {
          color: '#333',
          fontWeight: '500'
        },
        '&$completed': {
          color: '#ddd',
          fontWeight: 'bold'
        }
      }
    },
    MuiStepLabel: {
      root: {
        fontWeight: 'bold'
      },
      active: {
        fontWeight: 'bold',
        '&$alternativeLabel': {
          fontWeight: 'bold'
        }
      },
      horizontal: {
        margin: '0px',
        padding: '0px',
        '& span': {
          '&$labelContainer': {
            '& span': {
              margin: '5px 0px 0px'
            }
          }
        }
      },
      completed: {
        fontFamily: 'Khula',
        fontWeight: 'bold'
      },
      alternativeLabel: {
        fontFamily: 'Khula',
        fontWeight: 'bold',
        '&$alternativeLabel': {
          '&$labelContainer': {
          }
        }
      },
      label: {
        fontWeight: 'bold'
      }
    }
  }
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    completed: {
      display: 'inline-block',
      color: '#47b607'
    },
    active: {
      color: '#47b607'
    }
  })
)

const NavBag: React.FC = () => {
  const { step } = useStep()
  const steps = getSteps()
  const classes = useStyles()
  function getSteps () {
    return ['Carrinho', 'Formulario', 'Pagamento', 'Finalizado']
  }

  return (
    <Wrapper>
      <ContainerNav className='Container'>
        <Link href='/'>
          <a>
            <h1>Libido</h1>
          </a>
        </Link>
        <MuiThemeProvider theme={muiTheme}>
          <div className={classes.root}>
          <Stepper
            alternativeLabel
            nonLinear
            activeStep={step}
          >
            {steps.map((label, index) => {
              const stepProps: {
                completed?: boolean;
                alternativeLabel?: { marginTop: '5px' };
              } = {
                completed: index < step
              }
              const labelProps: { optional?: React.ReactNode } = {}

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    // onClick={handleStep(index)}
                    {...labelProps}
                  >
                    {label}
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </div>
        </MuiThemeProvider>
      </ContainerNav>
    </Wrapper>

  )
}

export default NavBag
