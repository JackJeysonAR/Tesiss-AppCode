package com.example.transporteinclusivo.transport.model

// TransportOption.kt
data class TransportOption(
    val id: String,
    val name: String,
    val price: String,
    val time: String,
    val distance: String,
    val iconRes: Int
)

// Taxi.kt
data class Taxi(
    val type: String,
    val distance: String,
    val price: String,
    val seats: Int
)