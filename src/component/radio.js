import React from 'react';
import '../App.css';
import { DetailedHTMLProps } from 'react';

type Props = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {};

const Appradio = (props:Props) => {
  return (
    <div className="radiofield">
        <input type="radio" {...props} name='gender' value=""/>
        <label>Male</label>&nbsp;&nbsp;
        <input type="radio" {...props} name='gender' value=""/>
        <label>Female</label>
    </div>

  );
};

export default Appradio;
