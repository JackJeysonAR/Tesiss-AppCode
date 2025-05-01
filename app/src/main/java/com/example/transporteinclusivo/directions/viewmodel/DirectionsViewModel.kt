package com.example.transporteinclusivo.directions.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.transporteinclusivo.directions.model.LocationItem
import com.example.transporteinclusivo.directions.model.SectionItem
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class DirectionsViewModel : ViewModel() {
    private val _state = MutableStateFlow<DirectionsState>(DirectionsState.Loading)
    val state: StateFlow<DirectionsState> = _state

    private val _currentLocation = MutableStateFlow("Jr. Alfonso Ugarte 150")
    val currentLocation: StateFlow<String> = _currentLocation

    private val _currentTime = MutableStateFlow("9:41")
    val currentTime: StateFlow<String> = _currentTime

    val sections = listOf(
        "Reader S1", "Chambers S2", "Women S3",
        "Park P1", "Play S1", "Park RON", "Always"
    )

    private val popularLocations = listOf(
        LocationItem("University of Washington", "2.5 km", R.drawable.ic_university),
        LocationItem("Woodland Park", "1.8 km", R.drawable.ic_park),
        LocationItem("Husky Stadium", "3.2 km", R.drawable.ic_stadium),
        LocationItem("Ravenna Park", "1.5 km", R.drawable.ic_park),
        LocationItem("Llanov Art Gallery", "4.0 km", R.drawable.ic_gallery)
    )

    fun loadLocations() {
        viewModelScope.launch {
            _state.value = DirectionsState.Success(popularLocations)
        }
    }

    fun updateCurrentLocation(address: String) {
        _currentLocation.value = address
    }

    fun updateTime(time: String) {
        _currentTime.value = time
    }
}