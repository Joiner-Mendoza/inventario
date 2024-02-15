import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ESTILOS/agregar.css'
import axios from "axios";
import './assets/img/fondo.jpg'

function Agregar({ actualizarDatos }) {
    const navigate = useNavigate();

  

    const [Nombre_Producto, setNombre] = useState('');    
    const [Cantidad, setCantidad] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Valor_Unidad, setValor] = useState('');
    const [Valor_Total, setValorTotal] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState ({
        Nombre_Producto,
        Cantidad,
        Descripcion,
        Valor_Unidad,
        Valor_Total,
    });

    const calcularValorTotal = (Cantidad, Valor_Unidad) => {
        const cantidadNumerica = parseFloat(Cantidad);
        const valorNumerico = parseFloat(Valor_Unidad);
        const valorTotalNumerico = cantidadNumerica * valorNumerico;
        setValorTotal(valorTotalNumerico.toFixed(2));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const errors = {};
        if (!Nombre_Producto) errors.Nombre_Producto = "Agregue el nombre del producto";
        if (!Cantidad) errors.Cantidad = "Agregue una cantidad";
        if (!Descripcion) errors.Descripcion = "Campo descripcion vacio";
        if (!Valor_Unidad) errors.Valor_Unidad = "Ingrese un valor";

        
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        // Crear el objeto del nuevo producto
        const nuevoProducto = {
            Nombre_Producto,
            Cantidad,
            Descripcion,
            Valor_Unidad,
            Valor_Total
        };

        // Enviar solicitud POST al servidor
        axios.post('http://localhost:3001/create', nuevoProducto)
        .then(() => {
            alert("Producto ingresado correctamente.");                
            navigate('/Home');
            window.location.reload();
            actualizarDatos(nuevoProducto);
        })
        
            .catch((error) => {
                setError(`Error al agregar el producto, inténtelo de nuevo. Detalles: ${error.message}`);
                console.error('Error en la solicitud', error);
            // window.location.reload();

            });

    };

    return (
        <form onSubmit={handleSubmit} className="Form-Container">
            <div className="Form-div">
                <h1 className="Title">Agregar Un Producto</h1>
                <div className="Container_inputs">
                 
                    <label>Nombre del Producto</label>
                    {fieldErrors.Nombre_Producto && <span className="error-message">{fieldErrors.Nombre_Producto}</span>}
                    <input 
                        type="text"
                        placeholder="Nombre"
                        value={Nombre_Producto}
                        onChange={e => setNombre(e.target.value)}

                    />
                    
                    <label>Cantidad De Productos</label>
                    {fieldErrors.Cantidad && <span className="error-message">{fieldErrors.Cantidad}</span>}

                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={Cantidad}
                        onChange={e => {
                            setCantidad(e.target.value);
                            calcularValorTotal(e.target.value, Valor_Unidad);
                        }}
                    />

                    <label>Agregar Una Descripción</label>
                    {fieldErrors.Descripcion && <span className="error-message">{fieldErrors.Descripcion}</span>}

                    <textarea
                        placeholder="Descripción"
                        value={Descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                        style={{ resize: 'none' }}
                    />

                    <label>Valor De La Unidad</label>
                    {fieldErrors.Valor_Unidad && <span className="error-message">{fieldErrors.Valor_Unidad}</span>}

                    <input
                        type="number"
                        placeholder="Valor"
                        value={Valor_Unidad}
                        onChange={e => {
                            setValor(e.target.value);
                            calcularValorTotal(Cantidad, e.target.value);
                        }}
                    />

                    <label >Valor Total</label>
                    <input
                        id="valor-total"
                        type="number"
                        placeholder="Valor Total"
                        value={Valor_Total}
                        readOnly  
                    />
                </div>
                <div className="container_buttons-agregar">
                    <button type="submit" className="Agregar"onSubmit={handleSubmit}>Agregar Producto</button>
                    <button type="button" className="Agregar" onClick={() => navigate('/Home')}>Cancelar</button>    
                </div>
            </div>
        </form>
    );
}

export { Agregar };
