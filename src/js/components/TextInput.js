import React from "react";

export const MyInput = (props) => {
    let inputText = '';
    if (!!props.helperText) {
        inputText = <div className={"input-message"}>{props.helperText}</div>
    }

    if (!!props.helperErrorText) {
        inputText = <div className={"input-error-message"}>{props.helperErrorText}</div>
    }
    return (

        <div className={"input-container"} >
            <label className={'input-label ' + (!!props.value ? !!props.value.length ? 'has-content' : '' : '')}>{props.placeholder}</label>
            <div className={''}>
                <input type={props.type}
                       name={props.name}
                       className={"input-field " + ((!!props.error || props.error === undefined) ? '' : 'input-error')}
                       required={!!props.required}
                       disabled={!!props.disabled}
                       value={props.value} onChange={props.change}/>
                {inputText}
            </div>
        </div>
    )
};

export const CustomDatePicker = (props) => {

    let inputText = '';
    if (!!props.helperText) {
        inputText = <div className={"input-message"}>{props.helperText}</div>
    }

    if (!!props.helperErrorText) {
        inputText = <div className={"input-error-message"}>{props.helperErrorText}</div>
    }
    return (
        <div className={"input-container"}>
            <label className={'input-label has-content'}>{props.placeholder}</label>
            <div className={''}>
                <input type={props.type}
                       name={props.name}
                       className={"input-field " + ((!!props.error || props.error === undefined) ? '' : 'input-error')}
                       required={!!props.required}
                       disabled={!!props.disabled}
                       max={props.max}
                       min={props.min}
                       value={props.value} onChange={props.change}/>
                {inputText}
            </div>
        </div>
    )

};
