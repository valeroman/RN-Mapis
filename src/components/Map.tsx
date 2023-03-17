import React, { useEffect, useRef, useState } from 'react';
import MapView, { MapMarkerProps, Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

interface Props {
    markers?: MapMarkerProps[];
}

export const Map = ({ markers }: Props) => {

    const [showPolyline, setShowPolyline] = useState(true);

    const { 
        hasLocation, 
        initialPositions, 
        getCurrentLocation, 
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines 
    } = useLocation();

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    useEffect(() =>{
        followUserLocation();

        return () => {
            //cancelar seguimiento
            stopFollowUserLocation()
        }
    },[]);


    useEffect(() => {

        if ( !following.current ) return;
        const { latitude, longitude } = userLocation;

        mapViewRef.current?.animateCamera({
            center: { latitude, longitude}
        })

    },[ userLocation ]);

    const centerPosition = async() => {

        const { latitude, longitude } = await getCurrentLocation();

        following.current = true;

        mapViewRef.current?.animateCamera({
            center: { latitude, longitude}
        })
    }

    if ( !hasLocation ) {
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                ref={ ( element ) => mapViewRef.current = element! }
                style={{ flex: 1 }}
                // provider={ PROVIDER_GOOGLE }
                showsUserLocation
                initialRegion={{
                    latitude: initialPositions.latitude,
                    longitude: initialPositions.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart={ () => following.current = false }
            >
                {
                    showPolyline && (
                        <Polyline 
                            coordinates={ routeLines }
                            strokeColor="black"
                            strokeWidth={ 3 }
                        />
                    )
                }


                {/* Marcador para mostrar información, una imagen, un lugar importante o destino */}
                {/* <Marker
                    image={ require('../assets/custom-marker.png')}
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="El titulo"
                    description="La descripción"
                /> */}


            </MapView>

            <Fab 
                iconName='compass-outline'
                onPress={ centerPosition }
                style={{
                    position: 'absolute',
                    bottom: 20, 
                    right: 20
                }}
            />

            <Fab 
                iconName='brush-outline'
                onPress={ () => setShowPolyline(!showPolyline) }
                style={{
                    position: 'absolute',
                    bottom: 80, 
                    right: 20
                }}
            />
        </>
    )
}
