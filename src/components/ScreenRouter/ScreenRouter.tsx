
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IRoute } from '../../router/IRoute';
import { routes } from '../../router/routes';


const ScreenRouter: React.FC = () => {

    return (
            <Routes>
                {
                    routes.map((route: IRoute, i: number) => (
                        <Route
                            key={i}
                            path={route.route}
                            element={<route.module />}
                        />
                    ))
                }
            </Routes>
    )
}

export default ScreenRouter;