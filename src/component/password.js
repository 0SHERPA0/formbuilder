import React from 'react';
import '../App.css';
const PasswordField = (props) => {
    return (
        <div className='inputfield'>
            <input type='password' {...props} />
            <label>Password</label>
        </div>
    );
};
export default PasswordField;