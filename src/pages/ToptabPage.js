import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailPage from './DetailPage'
import TodoPage from './TodoPage'
import { Text, TextInput, Button } from 'react-native'
import CreatePostScreen from './CreatePostPage'

const Tab = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator()

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Details' component={DetailPage} />
      <Tab.Screen name='Todo' component={TodoPage} />
    </Tab.Navigator>
  )
}

const ToptabPage = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        initialParams={{ test: 14 }}
      />
      <Stack.Screen name='CreatePost' component={CreatePostScreen} />
    </Stack.Navigator>
  )
}

export default React.memo(ToptabPage)
