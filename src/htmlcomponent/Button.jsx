import React from "react";
function ButtonComponent(props) {
    return (
        <input style={{marginBottom:10}}
            type={props.item.TextType}
            name={props.item.name}
            onClick={props.click()}
            value={props.item.value}
            className={props.item.className}
        />
    );
}

export default ButtonComponent;
