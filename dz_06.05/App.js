import { Provider } from "react-redux";
import { store } from "./store";
import CartApp from "./components/CartApp";


export default function App() {
  return (
    <Provider store={store}>
      <CartApp />
    </Provider>
  );
}
