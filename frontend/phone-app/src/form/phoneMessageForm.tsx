import React, {useState} from "react";
import {createStyles, makeStyles, Typography,Paper,Button, CircularProgress} from "@material-ui/core";

import PhoneTextField from "./FormTextField/PhoneTextField";
import MessageTextField from "./FormTextField/MessageTextField";
import ErrorComponent from "../error-page/Error";
import ResponseComponent from "../response/ResponseComponent";
import { truncate } from "fs";

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
        maxWidth: 300
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
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState<Values>({
        country : "",
        region : "",
        operator: "",
        prefix: null
    });

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values,[event.target.name] : event.target.value});
    }

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
        try {
          let res = await fetch(process.env.REACT_APP_API_URL!, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "applicaton/json",
              },
            body: JSON.stringify({
                "phoneNumber": +values.phoneNumber,
                "message": values.message
            }),
          });
        //   setResponse(await res.json()); TODO Set response here
          if (res.status === 200) {
            console.log('success!');
          } else {
            console.log('Some error occured');
          }
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
        console.log(response);
        console.log(values)
        console.log('reconverted message: ');
        const reformattedMessage = analyzeMessage(values.message);
        console.log(reformattedMessage);
        setValues({
            phoneNumber : "",
            message : "",
        });
    }

    const analyzeMessage = (message: string) => {
        const urlRegex = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})';
        message.replace(urlRegex, 
            function(a) {
                let refactoredUrl = a;
                if (!a.match('^https?:\/\/')) {
                    refactoredUrl = 'http://' + a;
                }
                return '<a href={' + refactoredUrl + '}>url</a>';
            }
        );
        return message;
    }

    return (
        loading ? <ResponseComponent data={response} /> :
        <Paper className={classes.container}>
            <Typography variant={"h4"} className={classes.title}>Phone Number Analysis and Message Restyling</Typography>
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
                <PhoneTextField changeHandler={handleChange} label={"Phone Number"} name={"phoneNumber"}/>
                <MessageTextField changeHandler={handleChange} label={"Message"} name={"message"}/>
                <Button type={"submit"} variant={"contained"} className={classes.button}>Submit</Button>
            </form>
        </Paper>
    );
}

export default PhoneMessageForm;