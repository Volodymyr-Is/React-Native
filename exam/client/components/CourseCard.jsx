import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import FavoriteButton from './FavoriteButton'

export default function CourseCard({ course, onPress, isFavorite, onToggleFavorite, onDelete }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: course.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.author}>{course.author}</Text>
        <Text style={styles.price}>{course.price}$</Text>
        <Text style={styles.rating}>Rate: {course.rating}</Text>
        <View style={styles.actions}>
          <FavoriteButton 
            isFavorite={isFavorite} 
            onToggle={() => onToggleFavorite(course)} 
            onDelete={() => onDelete(course.id)} 
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10, padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  info: {
    marginLeft: 10,
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  author: {
    fontSize: 14,
    color: '#666'
  },
  price: {
    fontSize: 16,
    color: '#2ecc71'
  },
  rating: {
    fontSize: 14,
    color: '#666'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
})