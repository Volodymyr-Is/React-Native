import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import CoursesScreen from '../screens/CoursesScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import DetailsScreen from '../screens/DetailsScreen'

const Stack = createStackNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Courses">
        <Stack.Screen name="Courses" component={CoursesScreen} options={{ title: 'Courses' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorite Courses' }} />
        <Stack.Screen name="CourseDetails" component={DetailsScreen} options={{ title: 'Course Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}