import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button(props) {
    return <Link className="button" style={{backgroundColor: "#3F9AC9"}, {color: props.color}}>
        {props.children}
    </Link>
}

export default Button; 