const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '1065372393',
    database: 'OMEGA'
});

// conexión a la base de datos
pool.getConnection((err, connection) => {
    // manejar errores de conexión
    if (err) {
        console.error('Error al conectar a la base de datos', err.message);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Se perdió la conexión con la base de datos');
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene demasiadas conexiones');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('La conexión a la base de datos fue rechazada');
        } else {
            console.error('Error desconocido al conectar a la base de datos');
        }
    } else {
        console.log('Conexión exitosa a la base de datos');
        
        // Ruta para obtener los productos
        app.get('/productos', (req, res) => {
            connection.query('SELECT * FROM Productos', (err, rows) => {
                if (err) {
                    console.error('Error al obtener los productos', err);
                    res.status(500).json({ err: 'error en el servidor' });
                } else {
                    res.status(200).json(rows);
                }
            });
        });

        // Ruta para crear un nuevo producto
        app.post('/create', async (req, res) => {
            const { Nombre_Producto, Cantidad, Descripcion, Valor_Unidad, Valor_Total } = req.body;

            try {
                connection.query('INSERT INTO Productos (Nombre_Producto, Cantidad, Descripcion, Valor_Unidad, Valor_Total) VALUES (?, ?, ?, ?, ?)',
                    [Nombre_Producto, Cantidad, Descripcion, Valor_Unidad, Valor_Total], (err, result) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ err: 'error en el servidor' });
                        } else {
                            res.status(200).json({ message: 'Producto ingresado correctamente' });
                            console.log('Producto ingresado correctamente');
                        }
                    });
            } catch (error) {
                console.error('error en la ruta /create:', error);
                res.status(500).json({ error: 'error interno en el servidor' });
            }
        });

        // manejar solicitudes con error 404
        app.use((req, res, next) => {
            res.status(404).json({ error: 'ruta fallida' });
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${PORT}`);
});
