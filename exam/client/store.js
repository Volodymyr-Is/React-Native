import AsyncStorage from '@react-native-async-storage/async-storage'

export const addToFavorites = async (course) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites')
    let favoritesArray = favorites ? JSON.parse(favorites) : []
    if (!favoritesArray.some((item) => item.id === course.id)) {
      favoritesArray.push(course)
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }
  } catch (error) {
    console.error('Error adding to favorites:', error)
  }
}

export const removeFromFavorites = async (courseId) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites')
    let favoritesArray = favorites ? JSON.parse(favorites) : []
    favoritesArray = favoritesArray.filter((item) => item.id !== courseId)
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
  } catch (error) {
    console.error('Error removing from favorites:', error)
  }
}

export const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return []
  }
}