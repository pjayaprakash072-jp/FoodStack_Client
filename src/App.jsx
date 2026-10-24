import { BrowserRouter } from 'react-router-dom'
import AppRoutes from "./routes/AppRoutes"
import {AuthProvider} from "./context/AuthContext"
import { CartProvider } from './context/CartContext'
import { LocationProvider } from './context/LocationContext'
import { CheckoutProvicer } from './context/CheckoutContext'
import { OpenModalProvicer } from './context/OpenModal'
const App = () => {
  return (
    <BrowserRouter>
    <OpenModalProvicer>
      <AuthProvider>
          <LocationProvider>
                <CartProvider>
                  <CheckoutProvicer>
                          <AppRoutes/>
                  </CheckoutProvicer>
                </CartProvider>
          </LocationProvider>
      </AuthProvider>
    </OpenModalProvicer>
    </BrowserRouter>
  )
}

export default App