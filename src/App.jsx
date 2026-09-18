import { BrowserRouter } from 'react-router-dom'
import AppRoutes from "./routes/AppRoutes"
import {AuthProvider} from "./context/AuthContext"
import { CartProvider } from './context/CartContext'
const App = () => {
  return (
    <BrowserRouter>

      <AuthProvider>

        <CartProvider>
          
        <AppRoutes/>

        </CartProvider>

        
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App