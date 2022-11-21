import React from "react";
import {TextField} from "@material-ui/core";

type PhoneTextFieldProps = {
    label: string,
    name: string,
    error: boolean,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const PhoneTextField = (props: PhoneTextFieldProps) => {
    return (
        <TextField
            error={props.error}
            defaultValue={'+'}
            label={props.label}
            name={props.name}
            onChange={props.changeHandler}
            variant={"outlined"}
            size={"small"}
            margin={"dense"}
            helperText={props.error && "Invalid Phone Number."}
        />
    );
}

export default PhoneTextField