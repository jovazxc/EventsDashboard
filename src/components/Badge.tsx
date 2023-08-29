import { PropsWithChildren } from "react";


interface BadgeProps extends PropsWithChildren {
    color?: "red" | "blue";
}

function Badge(props: BadgeProps) {

    let color = ''
    switch(props.color) {
        case "blue":
            color = 'bg-palette3'
            break
        case "red":
            color = 'bg-palette5'
            break
    }

    return (
        <div className={`flex p-1 text-[10px] justify-center items-center rounded font-bold text-white ${color}`}>
            {props.children}
        </div>
    )
}
export default Badge