package com.example.transporteinclusivo.onboarding.gpslocation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.transporteinclusivo.onboarding.components.LocationPermissionHelper
import com.example.transporteinclusivo.onboarding.components.LocationUiState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class LocationOnboardingViewModel(
    private val permissionHelper: LocationPermissionHelper
) : ViewModel() {

    private val _uiState = MutableStateFlow<LocationUiState>(LocationUiState.Loading)
    val uiState: StateFlow<LocationUiState> = _uiState.asStateFlow()

    fun checkLocationPermissions() {
        viewModelScope.launch {
            _uiState.value = if (permissionHelper.hasLocationPermission()) {
                LocationUiState.PermissionGranted
            } else {
                LocationUiState.PermissionRequired
            }
        }
    }

    fun onPermissionResult(granted: Boolean) {
        _uiState.value = if (granted) {
            LocationUiState.PermissionGranted
        } else {
            LocationUiState.PermissionDenied
        }
    }
}