import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useState } from "react";

export default function CartApp() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0)

  const addToCart = (product) => {
    const updateProduct = { id: product.id + Math.random().toString(), name: product.name, price: product.price }
    dispatch({ type: 'ADD_TO_CART', payload: updateProduct });
    setTotal(total +updateProduct.price)
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    setTotal(total-product.price)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />

      <Text style={styles.title}>Cart - ${total}</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id + Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Remove" onPress={() => removeFromCart(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});