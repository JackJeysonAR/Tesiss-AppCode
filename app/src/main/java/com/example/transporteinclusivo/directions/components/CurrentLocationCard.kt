package com.example.transporteinclusivo.directions.components

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import androidx.constraintlayout.widget.ConstraintLayout
import com.example.transporteinclusivo.databinding.ViewCurrentLocationBinding

class CurrentLocationCard @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : ConstraintLayout(context, attrs, defStyleAttr) {

    private val binding: ViewCurrentLocationBinding

    init {
        binding = ViewCurrentLocationBinding.inflate(
            LayoutInflater.from(context),
            this,
            true
        )
    }

    fun setLocation(address: String) {
        binding.tvAddress.text = address
    }
}