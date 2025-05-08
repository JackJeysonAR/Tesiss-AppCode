package calderon.cordova.pongo.pa3.org.ui.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import calderon.cordova.pongo.pa3.org.R;
import calderon.cordova.pongo.pa3.org.ui.entidad.Ciudad;

public class CiudadAdapter extends RecyclerView.Adapter<CiudadAdapter.CiudadViewHolder> {

    private List<Ciudad> ciudades;
    private OnCiudadClickListener onCiudadClickListener;

    public CiudadAdapter(List<Ciudad> ciudades, OnCiudadClickListener listener) {
        this.ciudades = ciudades;
        this.onCiudadClickListener = listener;
    }

    @NonNull
    @Override
    public CiudadViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_ciudad, parent, false);
        return new CiudadViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CiudadViewHolder holder, int position) {
        Ciudad ciudad = ciudades.get(position);
        holder.nombreCiudad.setText(ciudad.getNombre());


        holder.btnVerMapa.setOnClickListener(v -> {
            onCiudadClickListener.onCiudadMapaClick(ciudad, v);
        });

        holder.btnVerDetalles.setOnClickListener(v -> {
            onCiudadClickListener.onCiudadDetallesClick(ciudad, v);
        });
    }

    @Override
    public int getItemCount() {
        return ciudades.size();
    }

    // ViewHolder que contiene las referencias a los elementos del layout
    public static class CiudadViewHolder extends RecyclerView.ViewHolder {
        TextView nombreCiudad;
        Button btnVerDetalles, btnVerMapa;

        public CiudadViewHolder(View itemView) {
            super(itemView);
            nombreCiudad = itemView.findViewById(R.id.tv_nombre_ciudad);
            btnVerDetalles = itemView.findViewById(R.id.btn_detalle_ciudad);
            btnVerMapa = itemView.findViewById(R.id.btn_mapa_ciudad);
        }
    }


    public interface OnCiudadClickListener {
        void onCiudadMapaClick(Ciudad ciudad, View view);
        void onCiudadDetallesClick(Ciudad ciudad, View view);
    }
}
