package com.example.transporteinclusivo.transport

class TransportSelectionActivity : AppCompatActivity() {
    private val viewModel: TransportViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_transport_selection)

        setupRecyclerViews()
        observeViewModel()
        viewModel.loadData()
    }

    private fun setupRecyclerViews() {
        rvTransportOptions.layoutManager = LinearLayoutManager(this)
        rvTaxis.layoutManager = LinearLayoutManager(this)

        rvTransportOptions.adapter = TransportOptionAdapter()
        rvTaxis.adapter = TaxiAdapter()
    }

    private fun observeViewModel() {
        viewModel.transportOptions.observe(this) { options ->
            (rvTransportOptions.adapter as TransportOptionAdapter).submitList(options)
        }

        viewModel.taxis.observe(this) { taxis ->
            (rvTaxis.adapter as TaxiAdapter).submitList(taxis)
        }
    }
}