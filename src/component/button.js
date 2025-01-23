import React from 'react';
import '../App.css';
import { DetailedHTMLProps } from 'react';
type Props = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
};
const Appbutton = (props: Props)=>{
    return (
        <div>
           
            <button type='submit'  {...props}>Submit</button>
            
        </div>
    )
}
export default Appbutton;