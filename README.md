

## Iniciar un proyecto en React-Native
```
npx react-native init AwesomeTSProject --template react-native-template-typescript

```

## Instalar iconos 

Documentación https://github.com/oblador/react-native-vector-icons#ios

####Configuracion en IOS:

instalar el paquete
```
yarn add react-native-vector-icons
yarn add -D @types/react-native-vector-icons
```
Abrir en el proyecto la carpeta `node_modules`
    - buscar la carpeta `react-native-vector-icon`
    - buscar la carpeta `Fonts`
    - buscar el archivo `Ionicons.ttf`

Abrir el workspace `xcode` del proyecto:
 - crear un new group llamado Fonts
 - Arrastrar el archivo `Ionicons.ttf` a la carpeta `Fonts` en xcode
 - seleccionamos: 
    - Destination: `copy item if needed`
    - Added folders: `Create folder references`
    - Add to target: `mapis`

Abrimos la carpeta mapis en xcode:
 - Seleccionamos el archivo `info.plist`
 - Click derecho => Open As => Source Code
 - copiamos dentro del archivo `info.plist` despues del tag `</false>`
    ```
    <key>UIAppFonts</key>
    <array>
    <string>AntDesign.ttf</string>
    <string>Entypo.ttf</string>
    <string>EvilIcons.ttf</string>
    <string>Feather.ttf</string>
    <string>FontAwesome.ttf</string>
    <string>FontAwesome5_Brands.ttf</string>
    <string>FontAwesome5_Regular.ttf</string>
    <string>FontAwesome5_Solid.ttf</string>
    <string>Foundation.ttf</string>
    <string>Ionicons.ttf</string>
    <string>MaterialIcons.ttf</string>
    <string>MaterialCommunityIcons.ttf</string>
    <string>SimpleLineIcons.ttf</string>
    <string>Octicons.ttf</string>
    <string>Zocial.ttf</string>
    <string>Fontisto.ttf</string>
    </array>

    ```
- Y solo dejamos el `<string>Ionicons.ttf</string>`, los demas los borramos

 ```
    <key>UIAppFonts</key>
    <array>
        <string>Ionicons.ttf</string>
    </array>
 ```

- Luego hacemos un `npx pod-install`, para instalar esas nuevas dependencias


- Corremos la aplicacion si sale el siguiente error:

```
error: Multiple commands produce '/Users/romanvalero/Library/Developer/Xcode/DerivedData/mapis-diopfeqmcnfxgofbdltuaszshxlw/Build/Products/Debug-iphonesimulator/mapis.app/Ionicons.ttf'
    note: Target 'mapis' (project 'mapis') has copy command from '/Users/romanvalero/react-native/mapis/ios/Fonts/Ionicons.ttf' to '/Users/romanvalero/Library/Developer/Xcode/DerivedData/mapis-diopfeqmcnfxgofbdltuaszshxlw/Build/Products/Debug-iphonesimulator/mapis.app/Ionicons.ttf'
    note: That command depends on command in Target 'mapis' (project 'mapis'): script phase “[CP] Copy Pods Resources”
note: Removed stale file '/Users/romanvalero/Library/Developer/Xcode/DerivedData/mapis-diopfeqmcnfxgofbdltuaszshxlw/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/hermes-engine.build/InputFileList-46EB2E00018F70-hermes-engine-xcframeworks-input-files-2f1133f9de36360a0aa5246c567a3f30-resolved.xcfilelist'
```
- Abrimos el workspace `xcode` del proyecto:
    - Seleccionamos `Build Phases` y en `Copy Bundle Resources`
    - Eliminamos el archivo `Ionicons.ttf`
 


####Configuracion en Android:

- Ir a la ruta dentro VSCode `android/app/build.gradle`
- pego el siguiente coodigo y solo coloco el archivo de Ionicons.ttf:
    ```
    project.ext.vectoricons = [
        iconFontNames: [ 'Ionicons.ttf' ]
    ]

    apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
    ```

## Instalar Navigation 

Documentación https://reactnavigation.org/docs/getting-started

- Instalación basica
    ```
    yarn add @react-navigation/native
    yarn add react-native-screens react-native-safe-area-context
    ```
- Realizar un `npx pod-install`


- Configuración adicional en Android:
    - Agregar en `android/app/src/main/java/<your package name>/MainActivity.java`


    ```
    import android.os.Bundle;

    public class MainActivity extends ReactActivity {
        // ...
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(null);
        }
        // ...
    }
    ```

- Colocar en el `App.jsx`:
    ```
    import * as React from 'react';
    import { NavigationContainer } from '@react-navigation/native';

    export default function App() {
        return (
            <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
        );
    }
    ```

###Stack Navigation
- Instalar:
    ```
    yarn add @react-navigation/stack
    yarn add react-native-gesture-handler
    ```

- Colocar en el `App.jsx` lo siguiente:
    ```
    import 'react-native-gesture-handler';
    ```
- Instalar:
    ```
    yarn add @react-native-masked-view/masked-view
    ```
- Luego hacemos un `npx pod-install`, para instalar esas   nuevas dependencias

###Ejemplo del Stack

```
    import { createStackNavigator } from '@react-navigation/stack';

    const Stack = createStackNavigator();

    function MyStack() {
        return (
            <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        );
    }
```
## Instalar Paquetes de permisos
Con este paquete podemos pedir acceso al gps, camara, contactos, giroscopio, geolocation, sms, etc.

Documentación: https://www.npmjs.com/package/react-native-permissions

- Instalación `yarn add react-native-permissions`

###Configuracion inicial del GPS en Android:

- Abrir el archivo `AndroindManifest.xml` en esta ruta `android/app/src/main/AndroidManifest.xml`
- Agregamos estos permisos para usar el GPS, en el archivo `AndroidManifest.xml`
```
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

###Configuracion inicial del GPS en IOS:

- Abrir el archivo `package.json`
- Agregamos estas configuraciones:
    ```
    "reactNativePermissionsIOS": [
        "LocationAccuracy",
        "LocationAlways",
        "LocationWhenInUse"
    ]
    ```
- En `"devDependencies"` agregamos: `"pod-install": "0.1.38"`
- En `"scripts"` agremamos: `"postinstall": "react-native setup-ios-permissions && pod-install"`

- Una vez finalizado con el archivo `package.json`, ejecutamos el siguiente comando:
    ```
    npx react-native setup-ios-permissions
    ```
- Corremos el comando: `npx pod-install`
- Cada vez que agregemos nuevos permisos tenemmos que repetir estos pasos

- Abrir el archivo `info.plist` y agregamos lo siguiente:

    ```
    <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    <string>Necesito saber tu ubicación para mostrar el mapa</string>
    <key>NSLocationAlwaysUsageDescription</key>
    <string>Necesito saber tu ubicación para mostrar el mapa</string>
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>Necesito saber tu ubicación para mostrar el mapa</string>
    ```
- Corremos el comando: `npx pod-install`



## Configuración de GoogleMaps
Documentación: https://github.com/react-native-maps/react-native-maps

- Instalar la libreria `yarn add react-native-maps`

###Configuracion GoogleMaps en Android:

- Abrir el archivo `AndroidManifest.xml` que se encuentra en la ruta `android/app/src/main/AndroidManifest.xml`

- Agregar lo siguiente:
    ```
        <application>
            <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
            <meta-data
                android:name="com.google.android.geo.API_KEY"
                android:value="Your Google maps API Key Here"/>
        </application>
    ```

###Configuracion GoogleMaps en IOS:

- Abrir el archivo `AppDelegate.m`

- Agregar lo siguiente:
    ```
        + #import <GoogleMaps/GoogleMaps.h>

        @implementation AppDelegate
        ...

        (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
        {
        +  [GMSServices provideAPIKey:@"_YOUR_API_KEY_"]; // add this line using the api key obtained from Google Console
    ```


