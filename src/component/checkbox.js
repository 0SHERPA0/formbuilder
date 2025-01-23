import React from 'react';
import '../App.css';
import { DetailedHTMLProps } from 'react';

type Props = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { label?: string;
  name: string;};

const Appcheckbox = ({ label, name, ...props }: Props) => {
  return (
    <div className="checkbox">
        <input type="checkbox" {...props} /><label>I agree Trems & Policy</label>
        </div>
  )
}

export default Appcheckbox;
