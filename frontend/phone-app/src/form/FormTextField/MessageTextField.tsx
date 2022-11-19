import React from "react";
import {TextField} from "@material-ui/core";

type MessageTextFieldProps = {
    label: string,
    name: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const MessageTextField = (props: MessageTextFieldProps) => {
    return (
        <TextField
            label={props.label}
            name={props.name}
            onChange={props.changeHandler}
            variant={"outlined"}
            size={"small"}
            margin={"dense"}
            multiline
        />
    );
}

export default MessageTextField