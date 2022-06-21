import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailPage from './DetailPage'
import TodoPage from './TodoPage'
import { Text, TextInput, Button } from 'react-native'

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

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = useState('')

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title='Done'
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          })
        }}
      />
    </>
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
