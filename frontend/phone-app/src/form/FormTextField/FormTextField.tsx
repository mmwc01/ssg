import React from "react";
import {TextField} from "@material-ui/core";

type FormTextFieldProps = {
    label: string,
    name: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const FormTextField = (props: FormTextFieldProps) => {
    return (
        <TextField
            label={props.label}
            name={props.name}
            onChange={props.changeHandler}
            variant={"outlined"}
            size={"small"}
            margin={"dense"}
        />
    );
}

export default FormTextField