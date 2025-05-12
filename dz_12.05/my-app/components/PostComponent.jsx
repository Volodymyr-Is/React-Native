import React from 'react'
import { View, Text, Button } from 'react-native';

export default function PostComponent({ item, onEdit, onDelete }) {
  return (
    <View style={{marginVertical:5}}>
        <Text>{item.title}</Text>
        <Text>{item.content}</Text>
        <Button title='Edit' onPress={onEdit}/>
        <Button title='Delete' onPress={onDelete}/>
    </View>
  )
}
