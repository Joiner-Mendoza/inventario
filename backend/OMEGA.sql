CREATE DATABASE IF NOT EXISTS OMEGA  ;
USE OMEGA;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1065372393';


CREATE TABLE PRODUCTOS(
	ID_Producto INTEGER PRIMARY KEY AUTO_INCREMENT,
    Nombre_Producto TEXT,
    Cantidad VARCHAR(255),
    Descripcion TEXT,
    Valor_Unidad VARCHAR(255),
    Valor_Total VARCHAR(255)
    
);

CREATE TABLE PROVEDOR (
    ID_Provedor INTEGER PRIMARY KEY AUTO_INCREMENT,
    Nombre_Provedor,
    Cantidad_Productos,
    
)

SELECT * FROM PRODUCTOS;
