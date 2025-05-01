package com.example.transporteinclusivo.onboarding.components

sealed class LocationUiState {
    object Loading : LocationUiState()
    object PermissionRequired : LocationUiState()
    object PermissionGranted : LocationUiState()
    object PermissionDenied : LocationUiState()
    data class Error(val message: String) : LocationUiState()
}