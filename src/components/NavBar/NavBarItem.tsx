import React from "react";


interface NavBarItemProps {
    caption: string,
    onClick: () => void,
    key: number,
    isActive: boolean,
}

const NavBarItem: React.FC<NavBarItemProps> = (props) => {

    const getClassName = () => {
        let name = 'NavBarItem';
        if (props.isActive == true)
            name += ' Active';

        return name;
    }

    return (
        <div className={getClassName()} onClick={props.onClick}>
            {props.caption}
        </div>
    )
}

export default NavBarItem;