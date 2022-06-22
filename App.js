// import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import TabPage from './src/pages/TabPage'
// import DrawerPage from './src/pages/DrawerPage'
import ToptabPage from './src/pages/ToptabPage'
import { RecoilRoot } from 'recoil'

function App() {
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
