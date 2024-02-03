import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './ESTILOS/menu.css'
import axios from "axios";

function Menu({ actualizarProductos }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [buscar, setBuscar] = useState('');

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    axios.get('http://localhost:3001/productos')
      .then(response => {
        actualizarProductos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleChange = (e) => {
    const valor = e.target.value;
    setBuscar(valor);
    filtrarProductos(valor);
  };

  const filtrarProductos = (terminoBusqueda) => {
    axios.get('http://localhost:3001/productos')
      .then(response => {
        const productosFiltrados = response.data.filter(producto =>
          producto.Nombre_Producto.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
          producto.Descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
        actualizarProductos(productosFiltrados);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleInventarioClick = (e) => {
    e.preventDefault();
    navigate('/Home');
  };

  const handleProductClick = (e) => {
    e.preventDefault();
    navigate('/Agregar')
  }

  return (
    <main className="Main">
      <nav className="Container_nav-main">
        <ul className="Container_nav-main-ul">
          <li onClick={handleInventarioClick}>Inventario</li>
          <li onClick={handleProductClick}>Agregar Producto</li>
        </ul>
        {location.pathname === '/Home' && ( // Renderizado condicional de la barra de búsqueda
          <input
            type="text"
            placeholder="Buscar"
            value={buscar}
            onChange={handleChange}
          />
        )}
      </nav>
    </main>
  );
}

export { Menu };
