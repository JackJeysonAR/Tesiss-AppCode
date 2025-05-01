package com.example.transporteinclusivo.auth

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.example.transporteinclusivo.databinding.FragmentLoginBinding

class LoginFragment : Fragment() {
    private var _binding: FragmentLoginBinding? = null
    private val binding get() = _binding!!
    private val viewModel: AuthViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentLoginBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.apply {
            tvRegister.setOnClickListener {
                (activity as AuthActivity).showRegisterFragment()
            }

            btnNext.setOnClickListener {
                validateAndLogin()
            }
        }
    }

    private fun validateAndLogin() {
        val username = binding.etUsername.text.toString()
        val password = binding.etPassword.text.toString()

        if (viewModel.validateLogin(username, password)) {
            // Proceder con login
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}