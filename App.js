// import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import TabPage from './src/pages/TabPage'
// import DrawerPage from './src/pages/DrawerPage'
import ToptabPage from './src/pages/ToptabPage'
import { RecoilRoot } from 'recoil'
import { Appearance, useColorScheme } from 'react-native'
import { useEffect } from 'react'

function App() {
  const osTheme = useColorScheme()
  useEffect(() => console.log('useColorScheme', osTheme), [osTheme])

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <DrawerPage /> */}
          <ToptabPage />
          {/* <TabPage /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  )
}

export default App
