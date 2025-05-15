import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import MainTab from './MainTab';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator 
        initialRouteName="SignIn"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
)