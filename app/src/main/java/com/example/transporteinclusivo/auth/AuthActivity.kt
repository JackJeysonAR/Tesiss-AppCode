package com.example.transporteinclusivo.auth

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.commit
import com.example.transporteinclusivo.R
import com.example.transporteinclusivo.databinding.ActivityAuthBinding

class AuthActivity : AppCompatActivity() {
    private lateinit var binding: ActivityAuthBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAuthBinding.inflate(layoutInflater)
        setContentView(binding.root)

        showLoginFragment()
    }

    private fun showLoginFragment() {
        supportFragmentManager.commit {
            replace(R.id.auth_container, LoginFragment())
            setReorderingAllowed(true)
        }
    }

    fun showRegisterFragment() {
        supportFragmentManager.commit {
            replace(R.id.auth_container, RegisterFragment())
            setReorderingAllowed(true)
            addToBackStack(null)
        }
    }
}