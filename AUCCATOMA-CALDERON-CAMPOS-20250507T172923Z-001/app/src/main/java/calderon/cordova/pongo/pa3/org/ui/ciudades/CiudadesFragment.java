package calderon.cordova.pongo.pa3.org.ui.ciudades;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavOptions;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.List;

import calderon.cordova.pongo.pa3.org.R;
import calderon.cordova.pongo.pa3.org.ui.adapter.CiudadAdapter;
import calderon.cordova.pongo.pa3.org.ui.entidad.Ciudad;
import calderon.cordova.pongo.pa3.org.ui.entidad.ZonaTuristica;
import calderon.cordova.pongo.pa3.org.ui.mapa.AgregarDistanciaActivity;
import calderon.cordova.pongo.pa3.org.ui.mapa.MapaFragment;


public class CiudadesFragment extends Fragment {

    private RecyclerView recyclerCiudadesInternacionales, recyclerCiudadesNacionales;
    private CiudadAdapter ciudadAdapter;
    private List<Ciudad> listaCiudades;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View vista = inflater.inflate(R.layout.fragment_ciudades, container, false);

        recyclerCiudadesNacionales = vista.findViewById(R.id.recycler_ciudades_nacionales);
        recyclerCiudadesInternacionales = vista.findViewById(R.id.recycler_ciudades_internacionales);

        listaCiudades = obtenerCiudadesNacionales();
        configurarRecyclerView(recyclerCiudadesNacionales, listaCiudades);

        listaCiudades = obtenerCiudadesInternacionales();
        configurarRecyclerView(recyclerCiudadesInternacionales  , listaCiudades);


        return vista;
    }

    private void configurarRecyclerView(RecyclerView recyclerView,
                                        List<Ciudad> ciudades) {
        CiudadAdapter ciudadAdapter = new CiudadAdapter(ciudades, new CiudadAdapter.OnCiudadClickListener() {
            @Override
            public void onCiudadMapaClick(Ciudad ciudad, View view) {
                Bundle bundle = new Bundle();
                bundle.putDouble("LATITUD", ciudad.getLatitud());
                bundle.putDouble("LONGITUD", ciudad.getLongitud());
                bundle.putString("LUGAR", ciudad.getNombre());
                bundle.putBoolean("MODO_SATELITAL", true);

                NavOptions navOptions = new NavOptions.Builder()
                        .setPopUpTo(R.id.nav_ciudades, true)
                        .build();
                Navigation.findNavController(view).navigate(R.id.action_ciudades_to_mapa, bundle, navOptions);
            }

            @Override
            public void onCiudadDetallesClick(Ciudad ciudad, View view) {
                Intent intent = new Intent(requireContext(), DetalleCiudadActivity.class);
                intent.putExtra("NOMBRE", ciudad.getNombre());
                intent.putExtra("LATITUD", ciudad.getLatitud());
                intent.putExtra("LONGITUD", ciudad.getLongitud());
                intent.putExtra("TIPO", "ciudad");
                startActivity(intent);
            }
        });
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(ciudadAdapter);
    }

    private List<Ciudad> obtenerCiudadesNacionales() {
        List<Ciudad> ciudades = new ArrayList<>();

        ciudades.add(new Ciudad("Lima", -12.0464, -77.0428));
        ciudades.add(new Ciudad("Cusco", -13.5319, -71.9675));
        ciudades.add(new Ciudad("Arequipa", -16.4090, -71.5375));
        ciudades.add(new Ciudad("Trujillo", -8.1120, -79.0288));
        ciudades.add(new Ciudad("Chiclayo", -6.7714, -79.8409));
        ciudades.add(new Ciudad("Piura", -5.1945, -80.6328));
        ciudades.add(new Ciudad("Iquitos", -3.7491, -73.2538));
        ciudades.add(new Ciudad("Puno", -15.8402, -70.0219));
        ciudades.add(new Ciudad("Tacna", -18.0066, -70.2463));
        ciudades.add(new Ciudad("Chimbote", -9.0744, -78.5937));
        return ciudades;
    }
    private List<Ciudad> obtenerCiudadesInternacionales() {
        List<Ciudad> ciudades = new ArrayList<>();

        ciudades.add(new Ciudad("Nueva York", 40.7128, -74.0060));
        ciudades.add(new Ciudad("París", 48.8566, 2.3522));
        ciudades.add(new Ciudad("Tokio", 35.6895, 139.6917));
        ciudades.add(new Ciudad("Londres", 51.5072, -0.1276));
        ciudades.add(new Ciudad("Sídney", -33.8688, 151.2093));
        ciudades.add(new Ciudad("Río de Janeiro", -22.9068, -43.1729));
        ciudades.add(new Ciudad("Ciudad de México", 19.4326, -99.1332));
        ciudades.add(new Ciudad("El Cairo", 30.0444, 31.2357));
        ciudades.add(new Ciudad("Toronto", 43.6510, -79.3470));
        ciudades.add(new Ciudad("Berlín", 52.5200, 13.4050));
        return ciudades;
    }
}