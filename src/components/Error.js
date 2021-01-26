import {Alert} from '@material-ui/lab';

const Error = ({ mensaje }) => {
    return ( 
        <Alert severity="error">{mensaje}</Alert>
     );
}
 
export default Error;