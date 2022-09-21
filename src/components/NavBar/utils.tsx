import React from "react";
import { useNavigate } from "react-router";
import { routes } from '../../router/routes';
import NavBarItem from "./NavBarItem";

const useNavBar = () => {

    const navigation = useNavigate();


    const handleRedirect = (route: string) => {
        navigation(route);
    }

    const renderNavBarItems = () => {
        return (
            routes.map((route, index) => {
                return route.showInNavBar
                ? <NavBarItem
                    key={index}
                    onClick={() => handleRedirect(route.route)}
                    caption={route.name}
                />
                : null;
            })
        )
    }


    return { renderNavBarItems }
}

export default useNavBar;