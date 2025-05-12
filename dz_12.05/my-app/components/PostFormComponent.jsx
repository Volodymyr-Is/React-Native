import React from 'react'
import { Button, TextInput, View } from 'react-native'

export default function PostFormComponent({ title, content, onTitleChange, onContentChange, onSubmit, isEditing }) {
  return (
    <View>
        <TextInput
          placeholder='Title'
          value={title}
          onChangeText={onTitleChange}
          style={{borderWidth:1,marginBottom:10,padding:5}}
        />
        <TextInput
          placeholder='Content'
          value={content}
          onChangeText={onContentChange}
          style={{borderWidth:1,marginBottom:10,padding:5}}
        />
        <Button title={isEditing ? 'Update Post':'Create Post'} onPress={onSubmit}/>
    </View>
  )
}
