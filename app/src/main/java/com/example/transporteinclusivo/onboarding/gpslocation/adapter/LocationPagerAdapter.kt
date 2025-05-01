package com.example.transporteinclusivo.onboarding.gpslocation.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.transporteinclusivo.R

class LocationPagerAdapter(
    private val context: Context
) : RecyclerView.Adapter<LocationPagerAdapter.PageViewHolder>() {

    private val pages = listOf(
        PageData(R.layout.onboarding_page_track_trip, R.string.track_your_trip, R.string.track_trip_description),
        PageData(R.layout.onboarding_page_greeting, R.string.greeting_title, R.string.greeting_subtitle)
    )

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PageViewHolder {
        val view = LayoutInflater.from(context).inflate(viewType, parent, false)
        return PageViewHolder(view)
    }

    override fun onBindViewHolder(holder: PageViewHolder, position: Int) {
        val page = pages[position]
        holder.titleTextView.text = context.getString(page.titleRes)
        holder.subtitleTextView.text = context.getString(page.subtitleRes)
    }

    override fun getItemCount(): Int = pages.size

    override fun getItemViewType(position: Int): Int = pages[position].layoutRes

    class PageViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val titleTextView: TextView = itemView.findViewById(R.id.tvTitle)
        val subtitleTextView: TextView = itemView.findViewById(R.id.tvSubtitle)
    }

    private data class PageData(
        val layoutRes: Int,
        val titleRes: Int,
        val subtitleRes: Int
    )
}