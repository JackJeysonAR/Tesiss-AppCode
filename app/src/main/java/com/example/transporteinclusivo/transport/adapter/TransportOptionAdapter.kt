package com.example.transporteinclusivo.transport.adapter

// TransportOptionAdapter.kt
class TransportOptionAdapter : ListAdapter<TransportOption, TransportOptionViewHolder>(DiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TransportOptionViewHolder {
        val binding = ItemTransportOptionBinding.inflate(
            LayoutInflater.from(parent.context), parent, false
        )
        return TransportOptionViewHolder(binding)
    }

    override fun onBindViewHolder(holder: TransportOptionViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    class DiffCallback : DiffUtil.ItemCallback<TransportOption>() {
        override fun areItemsTheSame(oldItem: TransportOption, newItem: TransportOption): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: TransportOption, newItem: TransportOption): Boolean {
            return oldItem == newItem
        }
    }
}

// TaxiAdapter.kt
class TaxiAdapter : ListAdapter<Taxi, TaxiViewHolder>(DiffCallback()) {
    // Implementación similar al anterior adaptador
}