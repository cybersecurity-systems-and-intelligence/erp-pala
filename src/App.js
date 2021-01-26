import React, { Fragment, useContext } from 'react';
import Login from './components/Login'
import Checkout from './components/registro/Checkout'
import Dashboard from './components/Dashboard'
import {ComponenteContext} from './context/ComponenteContext'

function App() {

  const { componentecontx } = useContext(ComponenteContext)

  const { numero_ventana } = componentecontx  
  

  //const [ numerocomponente, guardarNumeroComponente ] = useState(0)
  //const [ nivelacceso, guardarNivelAcceso ] = useState(0)

  const pagina = () => {
    switch (numero_ventana) {
      case 0:
        return <Login/>
      case 1:
        return <Dashboard/>
        /*return <CrearObraAdmin
          guardarNumeroComponente={guardarNumeroComponente}
        />*/
      case 2:
        return <Checkout/>
      case 3:
        return 'obra registrada'
      default:
        throw new Error('Unknown step')
    }
  }
  return (    
      <Fragment>
        {
          pagina()
        }
      </Fragment>    
  )
}

export default App;