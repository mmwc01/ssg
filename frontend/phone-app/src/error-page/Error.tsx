import React from "react";
import {createStyles, makeStyles, Typography,Paper,Button} from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
    form : {
        display : "flex",
        flexDirection : "column",
    },
    container : {
        backgroundColor : "#ffffff",
        position : "absolute",
        top : "50%",
        left : "50%",
        transform : "translate(-50%,-50%)",
        padding : 30,
        textAlign : "center",
        maxWidth: 300,
        minHeight: 400
    },
    title : {
        margin:"0px 0 20px 0"
    },
    button : {
        margin:"20px 0"
    }
}))

const ErrorComponent = () => {

    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <Typography variant={"h4"} className={classes.title}>Error processing Information. Please try again.</Typography>
            <Button>back</Button>
        </Paper>
    );
}

export default ErrorComponent;