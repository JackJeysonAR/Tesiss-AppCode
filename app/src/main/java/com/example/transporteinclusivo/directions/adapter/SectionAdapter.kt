package com.example.transporteinclusivo.directions.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.transporteinclusivo.R

class SectionAdapter(
    private val sections: List<String>
) : RecyclerView.Adapter<SectionAdapter.SectionViewHolder>() {

    private var selectedPosition = 0

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SectionViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_section, parent, false)
        return SectionViewHolder(view)
    }

    override fun onBindViewHolder(holder: SectionViewHolder, position: Int) {
        holder.bind(sections[position], position == selectedPosition)
        holder.itemView.setOnClickListener {
            selectedPosition = position
            notifyDataSetChanged()
        }
    }

    override fun getItemCount(): Int = sections.size

    class SectionViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvSection: TextView = itemView.findViewById(R.id.tvSection)

        fun bind(section: String, isSelected: Boolean) {
            tvSection.text = section
            tvSection.isSelected = isSelected
        }
    }
}