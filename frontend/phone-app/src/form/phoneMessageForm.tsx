import React, { useState } from "react";
import { createStyles, makeStyles, Typography, Paper, Button, CircularProgress } from "@material-ui/core";

import PhoneTextField from "./FormTextField/PhoneTextField";
import MessageTextField from "./FormTextField/MessageTextField";
import { isValidPhoneNumber } from 'libphonenumber-js'
import ResponseComponent from "../response/ResponseComponent";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles(() => createStyles({
    form: {
        display: "flex",
        flexDirection: "column",
    },
    title: {
        margin: "0px 0 20px 0"
    },
    button: {
        margin: "20px 0"
    }
}))

type Values = {
    phoneNumber: string,
    message: string,
}

type Response = {
    country: string,
    region: string,
    operator: string,
    prefix: number,
    message: string,
    matched_in_set: string,
}

const PhoneMessageForm = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [values, setValues] = useState<Values>({
        phoneNumber: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<Response>({
        country: '',
        region: '',
        operator: '',
        prefix: -1,
        message: '',
        matched_in_set: '',

    });
    const [error, setError] = useState(false);

    //validating that this is a valid phone number before calling the api
    const validateValues = (phoneNumber: string) => {
        setError(!isValidPhoneNumber(phoneNumber));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event);
        validateValues(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            let res = await fetch(process.env.REACT_APP_API_URL!, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "phoneNumber": values.phoneNumber,
                    "message": values.message
                }),
            });
            if (res.status === 200) {
                console.log('success!');
                const resp = await res.json();
                setResponse(resp);
            } else {
                console.log('Some error occured');
                navigate('/error', { replace: true });
            }
        } catch (err) {
            console.log(err);
            navigate('/error', { replace: true });
        }
        analyzeMessage(values.message);
        setValues({
            phoneNumber: "",
            message: "",
        });
        console.log(response);
        setLoading(false);
    }

    const analyzeMessage = (message: string) => {
        const urlRegex = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})';
        message.replace(urlRegex,
            function (a) {
                let refactoredUrl = a;
                if (!a.match('^https?:\/\/')) {
                    refactoredUrl = 'http://' + a;
                }
                return '<a href={' + refactoredUrl + '}>url</a>';
            }
        );
        console.log(message);
        setResponse({
            ...response,
            message: message
        });
        console.log(response);
    }

    return (
        <>
            loading ? <CircularProgress /> :
            <Typography variant={"h4"} className={classes.title}>Phone Number Analysis and Message Restyling</Typography>
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
                <PhoneTextField error={error} changeHandler={handlePhoneChange} label={"Phone Number"} name={"phoneNumber"} />
                <MessageTextField changeHandler={handleChange} label={"Message"} name={"message"} />
                <Button type={"submit"} variant={"contained"} className={classes.button}>Submit</Button>
            </form>
        </>
    );
}

export default PhoneMessageForm;