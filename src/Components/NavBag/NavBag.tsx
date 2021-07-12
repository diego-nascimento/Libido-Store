import React from 'react'
import { Navegacao, ContainerNav } from '../Nav/Nav.style'
import Link from 'next/link'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { makeStyles, Theme, createStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { styles } from '../../styles/styles'
import { useStep } from '../../contexts/cartStep'

const muiTheme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        color: '#B2B2B2',
        '&$active': {
          color: styles.componentsDest,
          fontWeight: 'bold'
        },
        '&$completed': {
          color: '#444444',
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
        '& span': {
          '&$labelContainer': {
            '& span': {
              marginTop: '5px'
            }
          }
        }
      },
      alternativeLabel: {
        fontFamily: 'Poppins Regular',
        fontWeight: 'bold',
        '&$alternativeLabel': {
          '&$labelContainer': {
            backgroundColor: 'red'
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
      width: '500px'
    },

    completed: {
      display: 'inline-block',
      color: '#47b607'
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    active: {
      color: '#47b607'
    }
  })
)

const NavBag: React.FC = () => {
  const classes = useStyles()
  const { step, setStep } = useStep()

  function getSteps () {
    return ['Sacola', 'Identificação', 'Pagamento']
  }

  const steps = getSteps()

  return (
    <Navegacao MenuBackground={false} >
      <ContainerNav className='Container'>
        <Link href='/'>
          <a>
            <h1>Libido</h1>
          </a>
        </Link>
        <MuiThemeProvider theme={muiTheme}>
          <div className={classes.root}>
            <Stepper
              style={{ background: 'transparent' }}
              alternativeLabel
              activeStep={step}
            >
            {steps.map((label, index) => {
              const stepProps: {
                completed?: boolean;
                alternativeLabel?: { marginTop: '5px' };
              } = {}
              const labelProps: { optional?: React.ReactNode } = {}

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                     onClick={() => setStep(index)}
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

    </Navegacao>
  )
}

export default NavBag
