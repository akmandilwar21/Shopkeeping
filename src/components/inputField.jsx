import React from "react";
import { useState } from "react";
import { validateInput, Validators } from "./Validator";
const InputField= ({label,value,onChange, placeHolder,type,name})=>{
    const [error, setError] = useState(false);
    console.log(error);
    console.log(placeHolder)
    const handleChange = (event) => {
        const {value} = event.target;
        setError(validateInput(Validators, value));
        onChange(value,name);
        console.log(error);
    };
    return (<div>
        {label && <label htmlFor="app-input-field">{label}</label>}
    <input
        type={type}
        className='form-control'
        placeholder={placeHolder}
        onChange={handleChange}
    />

{error && <span className='text-danger'>{error.message}</span>}

    </div>)
}
export default InputField;