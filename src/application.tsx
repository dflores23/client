import React, { useEffect, useReducer, useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { RouteChildrenProps } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import LoadingComponent from './components/LoadingComponent';
import logging from './config/logging';
import routes from './config/routes';
import { initialUserState, UserContextProvider, userReducer } from './contexts/user';
import { Validate } from './modules/Auth';


export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);
    const [loading, setLoading] = useState<boolean>(true);
    const [authStage, setAuthStage] = useState<string>('Checking localstorage ...');

    useEffect(() => {
        setTimeout(() => {
            CheckLocalStorageForCredentials();
        }, 1000);
    }, []);

    const CheckLocalStorageForCredentials = () => {
        setAuthStage('Checking credentials ...');

        const fire_token = localStorage.getItem('fire_token');

        if (fire_token === null) {
            userDispatch({ type: 'logout', payload: initialUserState });
            setAuthStage('No credentials found');
            setTimeout(() => {
                setLoading(false);
            }, 500);
        } else {
            return Validate(fire_token, (error: any, user: any) => {
                if (error) {
                    logging.error(error);
                    setAuthStage('Invalid credentials');
                    userDispatch({ type: 'logout', payload: initialUserState });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                } else if (user) {
                    setAuthStage('Valid credentials');
                    userDispatch({ type: 'login', payload: { user, fire_token } });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            });
        }
    };

    const userContextValues = {
        userState,
        userDispatch
    };

    if (loading) {
        return <LoadingComponent>{authStage}</LoadingComponent>;
    }

    return (
        <UserContextProvider value={userContextValues}>
            <Switch>
                {routes.map((route, index) => {
                    if (route.auth) {
                        return (
                            <Route
                                path={route.path}
                                exact={route.exact}
                                key={index}
                                render={(routeProps: RouteComponentProps) => 
                                    <AuthRoute>
                                        <route.component {...routeProps} />
                                    </AuthRoute>
                                }
                            />
                        );
                    }

                    return <Route 
                    path={route.path} 
                    exact={route.exact} 
                    key={index} 
                    render={(routeProps: RouteChildrenProps) => <route.component {...routeProps} />} 
                    />;
                })}
            </Switch>
        </UserContextProvider>
    );
};

export default Application;
