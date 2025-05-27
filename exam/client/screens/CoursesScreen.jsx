import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import CourseCard from '../components/CourseCard'
import { addToFavorites, getFavorites, removeFromFavorites } from '../store'

const API_URL = 'http://localhost:3000'

export default function CoursesScreen() {
  const [courses, setCourses] = useState([])
  const [favorites, setFavorites] = useState([])
  const navigation = useNavigation()

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`)
      return response.data
    } catch (error) {
      console.error('Error fetching courses:', error)
      return []
    }
  }

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
        <Text style={styles.header}>Courses</Text>
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
  header: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})