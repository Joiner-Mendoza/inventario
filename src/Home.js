import React, { useEffect, useState } from "react";
import './ESTILOS/home.css'


function Home({ productos, actualizar }) {
    // Variable para recargar la página si se agrega un producto
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (reload) {
            window.location.reload(); // Recargar la página
            setReload(false); // Restablecer el estado de recarga
        }
    }, [reload]);

    useEffect(() => {
        // Si se produce un cambio en la variable 'actualizar', establecer 'reload' en true para recargar la página
        if (actualizar) {
            setReload(true);
        }
    }, [actualizar]);

    return (
        <div className="Container-home">
           <div className="Container-home-table">
           <table className="table-Container">
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
        </div>
    );
}

export { Home };
