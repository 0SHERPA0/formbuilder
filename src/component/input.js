import React from 'react';
import '../App.css';

const InputField = ({type,label}) => {
    return (
        <div className='inputfield'>
            <input type={type} />
             <label>{label}</label>
        </div>
    )
}

export default InputField;

