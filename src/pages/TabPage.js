import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TodoPage from './TodoPage'
import { MaterialIcons } from '@expo/vector-icons'
import DetailPage from './DetailPage'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeScreen({ navigation, route: { params } }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Details'
        component={DetailPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='home' size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name='Todo'
        component={TodoPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='work' size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
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

const TabPage = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        initialParams={{ test: 14 }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='CreatePost'
        component={CreatePostScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title='Info'
              color='#000'
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
export default React.memo(TabPage)
