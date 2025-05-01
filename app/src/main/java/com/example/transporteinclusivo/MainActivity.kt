package com.example.transporteinclusivo // ← Verifica que coincida con tu package

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.transporteinclusivo.R // ← Importación correcta

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main) // ← R ahora es reconocido

        val btnSearch: Button = findViewById(R.id.btnSearch) // ← ID correcto
        btnSearch.setOnClickListener {
            val intent = Intent(this, SearchActivity::class.java)
            startActivity(intent)
        }
    }
}