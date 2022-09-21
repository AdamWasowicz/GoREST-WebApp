import React from "react";
import './style.scss';
import useNavBar from "./utils";


const NavBar: React.FC = () => {

    const { renderNavBarItems } = useNavBar();

    return (
        <div className="NavBar">
            <div className='ItemsContainer'>
                {renderNavBarItems()}
            </div>
        </div>
    )
} 

export default NavBar;