import React from "react";
import { ErrorMessage, useField } from "formik";
import {FormGroup, Input, Label} from 'reactstrap';

export  const TextField =({ label, ...props}) => {
    const [field,meta]= useField(props);
    console.log(props);
    return(
        <div className="mb-2">
            <FormGroup>
            <Label htmlFor={field.name}>{label}<Label style={{color:"red"}}>*</Label></Label>
            <Input className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} {...field} {...props} autocomplete="off"/>
            <ErrorMessage component="div" name={field.name} className="error"/>
          </FormGroup>        
        </div>
    )
}