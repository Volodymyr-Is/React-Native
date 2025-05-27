import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export default function DetailsScreen({ route }) {
  const { courseId } = route.params
  const [course, setCourse] = useState(null)

  const fetchCourseById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/courses/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching course:', error)
      return null
    }
  }

  useEffect(() => {
    const loadCourse = async () => {
      const courseData = await fetchCourseById(courseId)
      setCourse(courseData)
    }
    loadCourse()
  }, [courseId])

  if (!course) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: course.image }} style={styles.image} />
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.author}>Author: {course.author}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Text style={styles.info}>Topics: {course.topics.join(', ')}</Text>
      <Text style={styles.info}>Duration: {course.duration}</Text>
      <Text style={styles.info}>Level: {course.level}</Text>
      <Text style={styles.price}>Price: {course.price}$</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10
  },
  author: {
    fontSize: 16,
    color: '#666'
  },
  description: {
    fontSize: 14,
    marginVertical: 10
  },
  info: {
    fontSize: 14,
    marginVertical: 5
  },
  price: {
    fontSize: 18,
    color: '#2ecc71',
    marginVertical: 10
  }
})