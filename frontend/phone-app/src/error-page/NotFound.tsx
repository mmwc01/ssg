import React from "react";
import {createStyles, makeStyles, Typography, Button} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => createStyles({
    title : {
        margin:"0px 0 20px 0"
    },
    button : {
        margin:"20px 0"
    }
}))

const PageNotFound= () => {

    const classes = useStyles();

    return (
        <>
            <Typography variant={"h4"} className={classes.title}>Page Not Found</Typography>
            <Link to="/">
                <Button>
                    back
                </Button>
            </Link>
        </>
    );
}

export default PageNotFound;