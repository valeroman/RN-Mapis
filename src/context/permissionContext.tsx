import { createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { check, PERMISSIONS, PermissionStatus, request, openSettings } from "react-native-permissions";


export interface PermissionState {
    locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionState = {
    locationStatus: 'unavailable',
}

type PermissionContextProps = {
    permission: PermissionState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionContext = createContext({} as PermissionContextProps ); // TODO: que exporta

export const PermissionProvider = ({ children }: any) => {

    const [permission, setPermission] = useState( permissionInitState );

    useEffect(() => {

        checkLocationPermission();

        AppState.addEventListener('change', state => {
            if ( state != 'active') return;

            checkLocationPermission();
        })
    },[]);

    const askLocationPermission = async() => {

        let permissionStatus: PermissionStatus;

        if ( Platform.OS === 'ios') {
            permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );

        } else {
            permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        }

        if ( permissionStatus === 'blocked' ) {
            openSettings();
        }

        setPermission({
            ...permission,
            locationStatus: permissionStatus
        });

    }
    const checkLocationPermission = async() => {

        let permissionStatus: PermissionStatus;

        if ( Platform.OS === 'ios') {
            permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );

        } else {
            permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        }

        setPermission({
            ...permission,
            locationStatus: permissionStatus
        });
    }

    return (
        <PermissionContext.Provider value={{
            permission,
            askLocationPermission,
            checkLocationPermission
        }}>
            { children }
        </PermissionContext.Provider>
    )
}