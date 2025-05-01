package com.example.transporteinclusivo.onboarding.gpslocation

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.viewpager2.widget.ViewPager2
import com.example.transporteinclusivo.R
import com.example.transporteinclusivo.databinding.ActivityLocationOnboardingBinding
import com.example.transporteinclusivo.onboarding.gpslocation.adapter.LocationPagerAdapter

class LocationOnboardingActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLocationOnboardingBinding
    private lateinit var viewPager: ViewPager2
    private lateinit var pagerAdapter: LocationPagerAdapter

    private val locationPermissionRequest = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            // Permiso concedido
        } else {
            // Permiso denegado
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLocationOnboardingBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupViewPager()
        setupButtons()
    }

    private fun setupViewPager() {
        pagerAdapter = LocationPagerAdapter(this)
        viewPager = binding.locationViewPager
        viewPager.adapter = pagerAdapter
        viewPager.isUserInputEnabled = false // Deshabilita el swipe
    }

    private fun setupButtons() {
        binding.btnCurrentLocation.setOnClickListener {
            checkLocationPermission()
        }

        binding.btnManualLocation.setOnClickListener {
            // Navegar a selección manual de ubicación
        }
    }

    private fun checkLocationPermission() {
        when {
            ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED -> {
                // Permiso ya concedido
            }
            else -> {
                locationPermissionRequest.launch(Manifest.permission.ACCESS_FINE_LOCATION)
            }
        }
    }
}