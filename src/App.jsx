import { BrowserRouter } from 'react-router-dom'
import AppRoutes from "./routes/AppRoutes"
import {AuthProvider} from "./context/AuthContext"
import { CartProvider } from './context/CartContext'
import { LocationProvider } from './context/LocationContext'
import { CheckoutProvicer } from './context/CheckoutContext'
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
          <LocationProvider>
                <CartProvider>
                  <CheckoutProvicer>
                          <AppRoutes/>
                  </CheckoutProvicer>
                </CartProvider>
          </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App