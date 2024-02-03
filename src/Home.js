import React from "react";
import './ESTILOS/home.css'

function Home({ productos }) {
    return (
        <div className="Container-home">
            <table className="table-Contaoiner">
                <thead>
                    <tr className="table-name-title">
                    <th className="head-name-items">Nombre_Producto</th>
                        <th className="head-name-items">Cantidad</th>
                        <th className="head-name-items">Descripcion</th>
                        <th className="head-name-items">Valor_Unidad</th>
                        <th className="head-name-items">Valor_Total</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => (
                        <tr key={index}>
                            <td>{producto.Nombre_Producto}</td>
                            <td>{producto.Cantidad}</td>
                            <td>{producto.Descripcion}</td>
                            <td>{producto.Valor_Unidad}</td>
                            <td>{producto.Valor_Total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { Home };
