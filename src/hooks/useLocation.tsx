
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef, useState } from 'react'
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {

    const [ hasLocation, setHasLocation ] = useState(false);
    const [ routeLines, setRouteLines ] = useState<Location[]>([]);

    const [ initialPositions, setInitialPositions ] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const [ userLocation, setUserLocation ] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const watchId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
      return () => {
        isMounted.current = false;
      }
    }, []);
    

    useEffect(() => {

        getCurrentLocation()
            .then( location => {
                if ( !isMounted.current ) return;

                setInitialPositions( location ); // posicion inicial del usuario
                setUserLocation( location );     // posicion del usuario cada vez que se mueva
                setRouteLines( routes => [ ...routes, location ]);
                setHasLocation(true);
            });
    },[]);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
    
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });

                },
                (err) => reject({ err }),
                { enableHighAccuracy: true }
            );
        })
    };

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {

                if ( !isMounted.current ) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }

                // console.log({coords});
                setUserLocation( location );
                setRouteLines( routes => [ ...routes, location ])
                
            },
            (err) => console.log(err),
            { enableHighAccuracy: true, distanceFilter: 10 }
,         )
    };

    const stopFollowUserLocation = () => {
        if ( watchId.current )
            Geolocation.clearWatch( watchId.current!);
    }

    return {
        hasLocation,
        initialPositions, 
        getCurrentLocation,
        followUserLocation,
        stopFollowUserLocation,
        userLocation,
        routeLines
    }
}
