import { BrowserRouter } from 'react-router-dom'
import AppRoutes from "./routes/AppRoutes"
import {AuthProvider} from "./context/AuthContext"
import { CartProvider } from './context/CartContext'
import { LocationProvider } from './context/LocationContext'
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
          <LocationProvider>
                <CartProvider>
                      <AppRoutes/>
                </CartProvider>
          </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App