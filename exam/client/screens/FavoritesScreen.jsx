import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CourseCard from '../components/CourseCard'
import { getFavorites, removeFromFavorites } from '../store'

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const loadFavorites = async () => {
      const favoritesData = await getFavorites()
      setFavorites(favoritesData)
    }
    loadFavorites()
  }, [])

  const handleRemoveFavorite = async (courseId) => {
    await removeFromFavorites(courseId)
    const updatedFavorites = await getFavorites()
    setFavorites(updatedFavorites)
  }

  const handleEditCourse = async (course) => {
    navigation.navigate('Courses', { courseToEdit: course })
  }

  const totalPrice = favorites.reduce((sum, course) => sum + (course.price || 0), 0).toFixed(2)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite courses ({favorites.length})</Text>
      <Text style={styles.totalPrice}>Total price: {totalPrice}$</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
            isFavorite={true}
            onToggleFavorite={() => handleRemoveFavorite(item.id)}
            onEdit={handleEditCourse}
            onDelete={() => handleRemoveFavorite(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
  totalPrice: {
    fontSize: 16,
    color: '#2ecc71',
    marginHorizontal: 10,
    marginBottom: 10
  },
})