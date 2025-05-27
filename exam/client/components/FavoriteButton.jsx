import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function FavoriteButton({ isFavorite, onToggle, onDelete }) {
  return (
    <TouchableOpacity style={styles.button} onPress={isFavorite ? onDelete : onToggle}>
      <Text style={styles.buttonText}>
        {isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:'#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },
})