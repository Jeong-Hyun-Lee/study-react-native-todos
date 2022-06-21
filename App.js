// import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import TabPage from './src/pages/TabPage'
// import DrawerPage from './src/pages/DrawerPage'
import ToptabPage from './src/pages/ToptabPage'

function App() {
  // return <TabPage />
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ToptabPage />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
