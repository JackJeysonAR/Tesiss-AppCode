package com.example.transporteinclusivo.directions.viewmodel

import com.example.transporteinclusivo.directions.model.LocationItem

sealed class DirectionsState {
    object Loading : DirectionsState()
    data class Success(val locations: List<LocationItem>) : DirectionsState()
    data class Error(val message: String) : DirectionsState()
}