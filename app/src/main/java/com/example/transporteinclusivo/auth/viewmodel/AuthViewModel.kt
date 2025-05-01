package com.example.transporteinclusivo.auth.viewmodel

import androidx.lifecycle.ViewModel
import com.example.transporteinclusivo.auth.components.InputValidator

class AuthViewModel : ViewModel() {
    private val validator = InputValidator()

    fun validateLogin(username: String, password: String): Boolean {
        return validator.validateUsername(username) &&
                validator.validatePassword(password)
    }

    fun validateRegister(
        fullName: String,
        username: String,
        email: String,
        password: String,
        phone: String
    ): Boolean {
        return validator.validateFullName(fullName) &&
                validator.validateUsername(username) &&
                validator.validateEmail(email) &&
                validator.validatePassword(password) &&
                validator.validatePhone(phone)
    }
}