import React, { useEffect, useState } from "react";
import './ESTILOS/home.css'
import { Home } from "./Home";
import { Agregar } from "./Agregar";
import axios from "axios";

function ParentComponent() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = () => {
        axios.get('http://localhost:3001/productos')
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }

    const actualizarDatos = (nuevoProducto) => {
        axios.post('http://localhost:3001/create', nuevoProducto)
            .then(() => {
                setTimeout(() => {
                    obtenerProductos(); 
                }, 1000);
            })
            .catch(error => {
                console.error('Error al agregar el producto:', error);
            });
    };
    
    return (
        <div>
            <h1>Productos</h1> 
            <Home data={productos} />
            <Agregar actualizarDatos={actualizarDatos} />
        </div>
    );
}

export { ParentComponent };
