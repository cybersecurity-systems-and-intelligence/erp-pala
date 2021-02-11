import {Fade} from '@material-ui/core/';
import DatosPersonales from './DatosPersonales'

const PerfilProv = ({perfil}) => {
    return (       
        <Fade in={true}>
            <DatosPersonales
                perfil={perfil}
            />
        </Fade>  
    );
}
 
export default PerfilProv