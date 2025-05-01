package com.example.transporteinclusivo.auth.components

class InputValidator {
    fun validateFullName(fullName: String): Boolean {
        return fullName.length >= 3 && fullName.split(" ").size >= 2
    }

    fun validateUsername(username: String): Boolean {
        return username.length >= 4 && username.matches(Regex("^[a-zA-Z0-9._-]{3,}\$"))
    }

    fun validateEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }

    fun validatePassword(password: String): Boolean {
        return password.length >= 6
    }

    fun validatePhone(phone: String): Boolean {
        return phone.length >= 9 && phone.matches(Regex("^[0-9]+\$"))
    }
}