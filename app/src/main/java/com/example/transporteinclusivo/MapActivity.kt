package com.example.transporteinclusivo

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions

class MapActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var googleMap: GoogleMap

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_map)

        // Inicialización segura del mapa
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as? SupportMapFragment
        mapFragment?.getMapAsync(this)
    }

    override fun onMapReady(map: GoogleMap) {
        googleMap = map

        // Configuración del marcador en Huancayo
        val huancayoLocation = LatLng(-12.0681, -75.2097)
        googleMap.addMarker(
            MarkerOptions()
                .position(huancayoLocation)
                .title("Catedral de Huancayo")
        )
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(huancayoLocation, 15f))

        // Configuración de controles UI
        with(googleMap.uiSettings) {
            isZoomControlsEnabled = true
            isCompassEnabled = true
        }
    }
}