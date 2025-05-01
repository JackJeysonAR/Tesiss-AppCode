package com.example.transporteinclusivo.transport.viewmodel

class TransportViewModel : ViewModel() {
    private val _transportOptions = MutableLiveData<List<TransportOption>>()
    val transportOptions: LiveData<List<TransportOption>> = _transportOptions

    private val _taxis = MutableLiveData<List<Taxi>>()
    val taxis: LiveData<List<Taxi>> = _taxis

    fun loadData() {
        _transportOptions.value = listOf(
            TransportOption("1", "Reacto S1", "$25.00", "2 min", "Cerca de ti", R.drawable.ic_car),
            TransportOption("2", "Chambleos S2", "$30.00", "3 min", "0.5 km", R.drawable.ic_van)
        )

        _taxis.value = listOf(
            Taxi("Taxi 1", "0.4 km", "$50.00", 4),
            Taxi("Taxi 7 seat", "0.67 km", "$40.00", 7)
        )
    }
}