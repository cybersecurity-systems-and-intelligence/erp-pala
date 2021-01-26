import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        float: 'right',
        background: 'linear-gradient(#d4e157, #afb42b)',
        color:'#fff',

        '&:hover': {
            background: 'linear-gradient(#afb42b, #d4e157)',
            color: 'white',
            fontWeight: '700',
        }
    },
}));

const Botones = ({ activeStep, steps, handleNext, handleBack }) => {
    const classes = useStyles(); 
    return ( 
        <div className={classes.buttons}>
            {activeStep !== 0 && (
            <Button onClick={handleBack} className={classes.button}>
                Atras
            </Button>
            )}
            <Button
                variant="contained"
               
                onClick={handleNext}
                className={classes.button}
            >
                {activeStep === steps.length - 1 ? 'Registrarse' : 'Siguiente'}
            </Button>
        </div>
     );
}
 
export default Botones;