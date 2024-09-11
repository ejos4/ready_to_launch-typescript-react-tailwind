import React, { PropsWithChildren} from 'react'

interface MyButtonProps extends PropsWithChildren{
    classValue?:string;
    handleClick?:Function;
}

const MyButton = ({ classValue, handleClick, children }:MyButtonProps) => {

    const newClassValue = `p-2 border-2 rounded ${classValue}`;
    const onClickFunction = (typeof handleClick !== "undefined") ? handleClick : (() => {});

    return (
        <button type='button' className={newClassValue} onClick={(ev) => onClickFunction(ev) }>
            {children}
        </button>
    )
}

export default MyButton