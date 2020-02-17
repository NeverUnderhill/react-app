import React from "react";

const Input = (props) => {
    return (
        <div>
            <label htmlFor={props.name}>{props.title}</label>
            <input
                className="input"
                id={props.id}
                name={props.name}
                type={props.type}
                defaultValue={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default Input;