import React from "react";
function InputComponent(props) {
    return (
        <input style={{marginBottom:10}}
            type={props.item.TextType}
            name={props.item.name}
            onChange={props.change()}
            placeholder={props.item.placeHolder}
        />
    );
}

export default InputComponent;
