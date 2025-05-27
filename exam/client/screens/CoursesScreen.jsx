import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CourseCard from '../components/CourseCard'
import { fetchCourses } from '../api'
import { addToFavorites, getFavorites, removeFromFavorites } from '../store'

export default function CoursesScreen() {
  const [courses, setCourses] = useState([])
  const [favorites, setFavorites] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const loadData = async () => {
      const coursesData = await fetchCourses()
      const favoritesData = await getFavorites()
      setCourses(coursesData)
      setFavorites(favoritesData)
    }
    loadData()
  }, [])

  const handleToggleFavorite = async (course) => {
    await addToFavorites(course)
    const updatedFavorites = await getFavorites()
    setFavorites(updatedFavorites)
  }

  const handleRemoveFavorite = async (courseId) => {
    await removeFromFavorites(courseId)
    const updatedFavorites = await getFavorites()
    setFavorites(updatedFavorites)
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Button
          title="Go to Favorites"
          onPress={() => navigation.navigate('Favorites')}
          color="#3498db"
        />
      </View>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
            isFavorite={favorites.some((fav) => fav.id === item.id)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleRemoveFavorite}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
})