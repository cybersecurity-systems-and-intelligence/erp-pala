import { Link, Typography } from '@material-ui/core';
import imagenes from '../asets/img/imagenes';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <div>
            <img style={{width: 60}} src={imagenes.imgjpg} />
          </div>
            {'Copyright © '}
            <Link color="inherit" href="http://www.localhost:3000/">
                Pavimentos Laguna SA de CV
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright;