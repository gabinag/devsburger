import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { ListaProdutos } from './pages/ListaProdutos/ListaProdutos';
import { Carrinho } from './pages/Carrinho/Carrinho';
import { CartProvider } from './context/CartContext';
import { Dados } from './pages/Dados/Dados';

export default function App() {
  return (
    <div>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='' element={<ListaProdutos/>} />
            <Route path='/carrinho' element={<Carrinho/>} />
            <Route path='/dados' element={<Dados/>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  )
}