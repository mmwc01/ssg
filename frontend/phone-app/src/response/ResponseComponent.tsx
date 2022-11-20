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
        width: 300,
        minHeight: 400
    },
    title : {
        margin:"0px 0 20px 0"
    },
    button : {
        margin:"20px 0"
    }
}))

interface ResponseProps {
    data:{
        country: string;
        region: string;
        operator: string;
        prefix: number
    }
  }

const ResponseComponent = ({data}: ResponseProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <Typography variant={"h5"}>Country:</Typography>
            <Typography variant={"h6"} className={classes.title}>{data.country}</Typography>
            <Typography variant={"h5"}>Region:</Typography>
            <Typography variant={"h6"} className={classes.title}>{data.region}</Typography>
            <Typography variant={"h5"}>Operator:</Typography>
            <Typography variant={"h6"} className={classes.title}>{data.operator}</Typography>
            <Typography variant={"h4"}>Prefix:</Typography>
            <Typography variant={"h6"} className={classes.title}>{data.prefix}</Typography>
            <Button>Back</Button>
        </Paper>
    );
}

export default ResponseComponent;