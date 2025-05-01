package com.example.transporteinclusivo

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.SearchView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class SearchActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_search)

        val searchView = findViewById<SearchView>(R.id.searchView)
        val rvTransport = findViewById<RecyclerView>(R.id.rvTransport)

        // Configurar RecyclerView
        rvTransport.layoutManager = LinearLayoutManager(this)
        rvTransport.adapter = TransportAdapter(getTransportList())

        searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                return false
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                // Filtrar resultados
                return true
            }
        })
    }

    private fun getTransportList(): List<Transport> {
        return listOf(
            Transport("Autobús 101", "Accesible para silla de ruedas"),
            Transport("Metro Línea 2", "Con ascensor"),
            Transport("Taxi Adaptado", "Rampa integrada")
        )
    }
}

// Clase de datos para el transporte
data class Transport(val name: String, val accessibility: String)

// Clase Adapter para el RecyclerView (completamente implementada)
class TransportAdapter(private val transports: List<Transport>) :
    RecyclerView.Adapter<TransportAdapter.TransportViewHolder>() {

    // ViewHolder class
    class TransportViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val nameTextView: TextView = itemView.findViewById(R.id.tvTransportName)
        private val accessibilityTextView: TextView = itemView.findViewById(R.id.tvTransportAccessibility)

        fun bind(transport: Transport) {
            nameTextView.text = transport.name
            accessibilityTextView.text = transport.accessibility
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TransportViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_transport, parent, false)
        return TransportViewHolder(view)
    }

    override fun onBindViewHolder(holder: TransportViewHolder, position: Int) {
        holder.bind(transports[position])
    }

    override fun getItemCount(): Int {
        return transports.size
    }
}