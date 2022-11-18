import React, {useState} from "react";
import {createStyles, makeStyles, Typography,Paper,Button} from "@material-ui/core";

import FormTextField from "./FormTextField/FormTextField";

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
        textAlign : "center"
    },
    title : {
        margin:"0px 0 20px 0"
    },
    button : {
        margin:"20px 0"
    }
}))

type Values = {
    name : string,
    email : string,
    age : string,
}

const ages = [
    {value : "20-40",label :"From 20 to 40"},
    {value : "40-50",label :"From 40 to 50"},
]

const PhoneMessageForm = () => {

    const classes = useStyles();
    const [values,setValues] = useState<Values>({
        name : "",
        email : "",
        age : "",
    });

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values,[event.target.name] : event.target.value});
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(values)
    }

    return (
        <Paper className={classes.container}>
            <Typography variant={"h4"} className={classes.title}>Form</Typography>
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
                <FormTextField changeHandler={handleChange} label={"Phone Number"} name={"phoneNumber"}/>
                <FormTextField changeHandler={handleChange} label={"Message"} name={"message"}/>
                <Button type={"submit"} variant={"contained"} className={classes.button}>Submit</Button>
            </form>
        </Paper>
    );
}

export default PhoneMessageForm;