package com.example.transporteinclusivo.directions

import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isVisible
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.transporteinclusivo.databinding.ActivityDirectionsBinding
import com.example.transporteinclusivo.directions.adapter.LocationAdapter
import com.example.transporteinclusivo.directions.adapter.SectionAdapter
import com.example.transporteinclusivo.directions.viewmodel.DirectionsState
import com.example.transporteinclusivo.directions.viewmodel.DirectionsViewModel

class DirectionsActivity : AppCompatActivity() {
    private lateinit var binding: ActivityDirectionsBinding
    private val viewModel: DirectionsViewModel by viewModels()
    private lateinit var sectionAdapter: SectionAdapter
    private lateinit var locationAdapter: LocationAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDirectionsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
        setupObservers()
        viewModel.loadLocations()
    }

    private fun setupUI() {
        sectionAdapter = SectionAdapter(viewModel.sections)
        locationAdapter = LocationAdapter { location ->
            navigateToLocationDetails(location)
        }

        binding.apply {
            rvSections.apply {
                layoutManager = LinearLayoutManager(
                    this@DirectionsActivity,
                    LinearLayoutManager.HORIZONTAL,
                    false
                )
                adapter = sectionAdapter
            }

            rvLocations.apply {
                layoutManager = LinearLayoutManager(this@DirectionsActivity)
                adapter = locationAdapter
                setHasFixedSize(true)
            }

            swipeRefresh.setOnRefreshListener {
                viewModel.loadLocations()
            }
        }

        viewModel.currentTime.observe(this) { time ->
            binding.tvTime.text = time
        }

        viewModel.currentLocation.observe(this) { location ->
            binding.currentLocationCard.setLocation(location)
        }
    }

    private fun setupObservers() {
        viewModel.state.observe(this) { state ->
            when (state) {
                is DirectionsState.Success -> {
                    binding.apply {
                        progressBar.isVisible = false
                        swipeRefresh.isRefreshing = false
                    }
                    locationAdapter.submitList(state.locations)
                }
                is DirectionsState.Error -> {
                    binding.apply {
                        progressBar.isVisible = false
                        swipeRefresh.isRefreshing = false
                    }
                    showError(state.message)
                }
                DirectionsState.Loading -> {
                    binding.progressBar.isVisible = true
                }
            }
        }
    }

    private fun navigateToLocationDetails(location: LocationItem) {
        // Implementar navegación a detalles
    }

    private fun showError(message: String) {
        // Mostrar error al usuario
    }
}