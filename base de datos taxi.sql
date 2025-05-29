CREATE DATABASE TaxiAccesibleDB;
GO

USE TaxiAccesibleDB;
GO
-- 3. Crear la tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    tipo VARCHAR(50), -- Ej: 'pasajero', 'conductor'
    discapacidad BIT,
    ubicacion_actual VARCHAR(255),
    fecha_registro DATETIME DEFAULT GETDATE()
);
GO

-- 4. Crear la tabla Vehiculos
CREATE TABLE Vehiculos (
    id_vehiculo INT PRIMARY KEY IDENTITY(1,1),
    placa VARCHAR(20) UNIQUE NOT NULL,
    modelo VARCHAR(50),
    capacidad INT,
    adaptado BIT,
    estado VARCHAR(50),
    ubicacion_actual VARCHAR(255),
    id_conductor INT,
    FOREIGN KEY (id_conductor) REFERENCES Usuarios(id_usuario)
);
GO

-- 5. Crear la tabla Rutas
CREATE TABLE Rutas (
    id_ruta INT PRIMARY KEY IDENTITY(1,1),
    origen VARCHAR(100),
    destino VARCHAR(100),
    distancia_km DECIMAL(6,2),
    tiempo_estimado_min INT,
    accesibilidad BIT
);
GO

-- 6. Crear la tabla Reservas
CREATE TABLE Reservas (
    id_reserva INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL,
    id_vehiculo INT,
    id_ruta INT,
    estado VARCHAR(50),
    fecha_reserva DATETIME DEFAULT GETDATE(),
    ubicacion_origen VARCHAR(255),
    ubicacion_destino VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_vehiculo) REFERENCES Vehiculos(id_vehiculo),
    FOREIGN KEY (id_ruta) REFERENCES Rutas(id_ruta)
);
GO

-- 7. Crear la tabla Notificaciones
CREATE TABLE Notificaciones (
    id_notificacion INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL,
    mensaje TEXT,
    leido BIT DEFAULT 0,
    fecha_envio DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);
GO

-- 8. Crear la tabla Historial_Viajes
CREATE TABLE Historial_Viajes (
    id_historial INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL,
    id_vehiculo INT,
    id_ruta INT,
    fecha_viaje DATETIME,
    duracion_min INT,
    feedback TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_vehiculo) REFERENCES Vehiculos(id_vehiculo),
    FOREIGN KEY (id_ruta) REFERENCES Rutas(id_ruta)
);
GO

-- 9. Crear la tabla Pagos (NUEVA)
CREATE TABLE Pagos (
    id_pago INT PRIMARY KEY IDENTITY(1,1),
    id_reserva INT NOT NULL,
    id_usuario INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL, -- Ej: 'Tarjeta', 'Yape', 'Plin', 'Efectivo'
    estado_pago VARCHAR(20) NOT NULL, -- Ej: 'Pendiente', 'Pagado', 'Fallido'
    fecha_pago DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (id_reserva) REFERENCES Reservas(id_reserva),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);
GO