import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

/*
 *  Link button 
 */

function Button(props) {
    return <Link className="button" style={{color: props.color}}>
        {props.children}
    </Link>
}

export default Button; 