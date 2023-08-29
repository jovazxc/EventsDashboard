import { PropsWithChildren } from "react";


interface ButtonProps extends PropsWithChildren {
    color?: "red" | "blue";
    onClick?(): any;
}

function Button(props: ButtonProps) {

    let color = ''
    switch(props.color) {
        case "blue":
            color = 'bg-palette3 text-white'
            break
        case "red":
            color = 'bg-palette5 text-white'
            break
    }

    return (
        <button className={`rounded px-2 py-1 items-center font-bold text-sm ${color}`} onClick={props.onClick} >
            {props.children}
        </button>
    )
}
export default Button