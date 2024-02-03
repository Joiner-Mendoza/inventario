import React, { useState } from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Menu } from './Menu.js';
import { Home } from './Home.js';
import { Agregar } from './Agregar.js';

function App() {
  const [productos, setProductos] = useState([]);

  const actualizarProductos = (nuevosProductos) => {
    setProductos(nuevosProductos);
  };

  return (
    <HashRouter>
      <Menu actualizarProductos={actualizarProductos} />
      <Routes>
        <Route path='/Home' element={<Home productos={productos} />} />
        <Route path='/Agregar' element={<Agregar actualizarProductos={actualizarProductos} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
