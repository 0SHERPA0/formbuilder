import React from 'react';
import '../App.css';
import { DetailedHTMLProps } from 'react';
type Props = DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
};
const Appselect = (props:Props)=>{
    return (
        <div className='selectfield'>
           <label>Select:</label>
            <select {...props}>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
            </select>
        </div>
    );
};
export default Appselect;