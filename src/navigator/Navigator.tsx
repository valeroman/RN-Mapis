import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {  MapScreen } from '../pages/MapScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';
import { PermissionContext } from '../context/permissionContext';
import { LoadingScreen } from '../pages/LoadingScreen';

    const Stack = createStackNavigator();

    export const  Navigator = () => {

        const { permission } = useContext( PermissionContext );

        if ( permission.locationStatus === 'unavailable' ) {
            return <LoadingScreen />
        }

        return (
            <Stack.Navigator
                // initialRouteName='PermissionsScreen'
                screenOptions={{
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: 'white'
                    }
                }}
            >
                {
                    permission.locationStatus === 'granted'
                        ? <Stack.Screen name="MapScreen" component={ MapScreen } />
                        : <Stack.Screen name="PermissionsScreen" component={ PermissionsScreen } />
                }
            </Stack.Navigator>
        );
    }