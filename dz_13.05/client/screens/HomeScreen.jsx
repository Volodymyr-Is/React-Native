import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books').then(res => setBooks(res.data));
  }, []);

  const addToCart = (id) => {
    axios.post('http://localhost:3000/cart', { bookId: id });
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <View style={{ margin: 10 }}>
        <Text>{item.title}</Text>
        <Text>{item.author}</Text>
        <Text>{item.price}$</Text>
        <Button title="Details" onPress={() => navigation.navigate('Details', { id: item.id })} />
        <Button title="Add to cart" onPress={() => addToCart(item.id)} />
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      /><br></br>
    <Button title='Go to Cart' onPress={()=>navigation.navigate('Cart')} style={{padding: 10}}/></View>
  );
}