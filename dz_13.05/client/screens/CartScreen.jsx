import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';

export default function CartScreen() {
  const [cart, setCart] = useState([]);

  const fetchCart = () => {
    axios.get('http://localhost:3000/cart').then(res => setCart(res.data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeFromCart = (id) => {
    axios.delete(`http://localhost:3000/cart/${id}`).then(() => fetchCart());
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.title} - {item.price}$</Text>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />
      <Text style={{ fontSize: 18, marginTop: 10 }}>Total price: {total}$</Text>
    </View>
  );
}