import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import axios from 'axios';

export default function DetailsScreen({ route }) {
  const [book, setBook] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`).then(res => setBook(res.data));
  }, []);

  if (!book) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>{book.title}</Text>
      <Text>{book.author}</Text>
      <Text>{book.price}$</Text>
      <Text>{book.description}</Text>
    </View>
  );
}
