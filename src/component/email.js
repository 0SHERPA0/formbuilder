import React from "react";
const Email=(props)=>{
    return(
        <div className="inputfield">
            <input type="email" {...props}/>
            <label>Email</label>
        </div>
    )
}
export default Email