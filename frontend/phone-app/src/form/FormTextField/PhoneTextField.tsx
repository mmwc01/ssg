import React from "react";
import {TextField} from "@material-ui/core";

type PhoneTextFieldProps = {
    label: string,
    name: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const PhoneTextField = (props: PhoneTextFieldProps) => {
    return (
        <TextField
            defaultValue={'+'}
            label={props.label}
            name={props.name}
            onChange={props.changeHandler}
            variant={"outlined"}
            size={"small"}
            margin={"dense"}
        />
    );
}

export default PhoneTextField