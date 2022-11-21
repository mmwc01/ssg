import React from "react";
import {createStyles, makeStyles, Typography,Paper,Button} from "@material-ui/core";
import { Link } from "react-router-dom";

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
        prefix: number;
        message: string;
    }
  }

const ResponseComponent = ({data}: ResponseProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <Typography variant={"h5"}>Country:</Typography>
            <Typography variant={"subtitle1"} className={classes.title}>{data.country}</Typography>
            <Typography variant={"h5"}>Region:</Typography>
            <Typography variant={"subtitle1"} className={classes.title}>{data.region}</Typography>
            <Typography variant={"h5"}>Operator:</Typography>
            <Typography variant={"subtitle1"} className={classes.title}>{data.operator}</Typography>
            <Typography variant={"h5"}>Prefix:</Typography>
            <Typography variant={"subtitle1"} className={classes.title}>{data.prefix === -1 ? '' : data.prefix}</Typography>
            <Typography variant={"h5"}>Message:</Typography>
            <Typography variant={"subtitle1"} className={classes.title}>{data.message}</Typography>
            <Link to="/">
                <Button>
                    back
                </Button>
            </Link>
        </Paper>
    );
}

export default ResponseComponent;