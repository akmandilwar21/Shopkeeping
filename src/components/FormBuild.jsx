import React from "react";
import { Button } from 'reactstrap';
import { useState } from "react";
const FormBuild= ({data,onChange,handleSubmit})=>{
    const handleChange = (event,name) => {
        const {value} = event.target;
        onChange(value,name);   
    };
    return (<div>
        {data.map(n=>
        <div className="mt-4">
             <label htmlFor="app-input-field">{n.label}</label>
              <input
              type={n.type}
              className='form-control'
              placeholder={n.placeHolder}
              name={n.name}
              onChange={(event)=>handleChange(event,n.name)}
          />
           
          </div>
        )}
          <hr />    
         <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={handleSubmit}>
           Login
        </Button>


    </div>)
}
export default FormBuild;