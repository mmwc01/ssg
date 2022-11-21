import React from "react";
import {createStyles, makeStyles, Paper} from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
    container : {
        backgroundColor : "#ffffff",
        position : "absolute",
        top : "50%",
        left : "50%",
        transform : "translate(-50%,-50%)",
        padding : 30,
        textAlign : "center",
        width: 300,
        minHeight: 400
    }
}))

const FormContainer = ({children}: {children: React.ReactNode | React.ReactNode[];}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            {children}
        </Paper>
    );
}

export default FormContainer;