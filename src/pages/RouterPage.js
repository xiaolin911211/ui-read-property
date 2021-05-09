
import ServerPage from './ServerPage';
import PropertyPage from './PropertyPage';
import ApplicationPage from './ApplicationPage';
import LoginPage from './LoginPage';
import React from "react";
import ProtectedRoute from '../components/ProtectedRoute';
import MonitorConfigPage from './MonitorConfigPage';
import {
    Route, Switch
} from "react-router-dom";
const RouterPage = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute path="/application" component={ApplicationPage} />
            <ProtectedRoute path="/server" component={ServerPage} />
            <ProtectedRoute path="/property" component={PropertyPage} />
            <ProtectedRoute path="/configuration" component={MonitorConfigPage} />
        </Switch>
    );
};
export default RouterPage;