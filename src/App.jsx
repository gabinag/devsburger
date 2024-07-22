import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { ListaProdutos } from './pages/ListaProdutos/ListaProdutos';
import { Carrinho } from './pages/Carrinho/Carrinho';
import { CartProvider } from './context/CartContext';
import { Dados } from './pages/Dados/Dados';
import { Pedido } from './pages/Pedido/Pedido';
import { Sobre } from './pages/Sobre/Sobre';

export default function App() {
  return (
    <div>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='' element={<ListaProdutos/>} />
            <Route path='/carrinho' element={<Carrinho/>} />
            <Route path='/dados' element={<Dados/>} />
            <Route path='/pedido' element={<Pedido/>} />
            <Route path='/sobre' element={<Sobre/>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  )
}