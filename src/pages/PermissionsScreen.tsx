import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BlackButton } from '../components/BlackButton';
import { PermissionContext } from '../context/permissionContext';

export const PermissionsScreen = () => {

  const { permission, askLocationPermission } = useContext( PermissionContext )


  return (
    <View style={ styles.container }>
        <Text style={ styles.title }>Para usar esta aplicación es necesario el uso del GPS</Text>

        <BlackButton 
          title='Premiso'
          onPress={ askLocationPermission }
        />

        <Text style={{ marginTop: 20 }}>
          { JSON.stringify( permission, null, 5) }
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  }
});


