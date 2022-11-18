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
    phoneNumber : string,
    message : string,
}

const PhoneMessageForm = () => {

    const classes = useStyles();
    const [values,setValues] = useState<Values>({
        phoneNumber : "",
        message : "",
    });

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values,[event.target.name] : event.target.value});
    }

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
        try {
          let res = await fetch("https://httpbin.org/post", { //change url here when API is up and running
            method: "POST",
            body: JSON.stringify(values),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            console.log('success!');
          } else {
            console.log('Some error occured');
          }
        } catch (err) {
          console.log(err);
        }
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