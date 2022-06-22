import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TodoPage from './TodoPage'
import DetailPage from './DetailPage'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>하이!!</Text>
    </View>
  )
}

const DrawerPage = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Details' component={DetailPage} />
      <Drawer.Screen name='Todo' component={TodoPage} />
      <DrawerNavigator />
    </Drawer.Navigator>
  )
}

export default React.memo(DrawerPage)
