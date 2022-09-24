import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { routes } from '../../router/routes';
import NavBarItem from "./NavBarItem";

const useNavBar = () => {

    const navigation = useNavigate();
    const location = useLocation();
    

    const handleRedirect = (route: string) => {
        navigation(route);
    }

    const isRouteActive = (routeName: string): boolean => {
        if (location.pathname.split('/')[1] == routeName && location.pathname.split('/').length == 2)
            return true;
        
        return false;
    }

    const renderNavBarItems = () => {
        return (
            routes.map((route, index) => {
                return route.showInNavBar
                ? <NavBarItem
                    key={index}
                    onClick={() => handleRedirect(route.route)}
                    caption={route.name}
                    isActive={isRouteActive(route.route)}
                />
                : null;
            })
        )
    }


    return { renderNavBarItems }
}

export default useNavBar;