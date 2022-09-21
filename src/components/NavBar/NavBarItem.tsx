import React from "react";


interface NavBarItemProps {
    caption: string,
    onClick: () => void,
    key: number,
}

const NavBarItem: React.FC<NavBarItemProps> = (props) => {

    return (
        <div className="NavBarItem" key={props.key} onClick={props.onClick}>
            {props.caption}
        </div>
    )
}

export default NavBarItem;