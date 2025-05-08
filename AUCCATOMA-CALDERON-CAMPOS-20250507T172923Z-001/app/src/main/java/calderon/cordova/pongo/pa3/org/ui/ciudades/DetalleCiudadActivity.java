package calderon.cordova.pongo.pa3.org.ui.ciudades;

import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import calderon.cordova.pongo.pa3.org.R;
import calderon.cordova.pongo.pa3.org.ui.entidad.Ciudad;
import calderon.cordova.pongo.pa3.org.ui.entidad.ZonaTuristica;

public class DetalleCiudadActivity extends AppCompatActivity {

    private double latitud, longitud;
    private String nombre, nombreZona, tipo;
    ImageView ivImagen;
    TextView tvInfo;
    TextView tvZonasTuristicas, tvNombreCiudad;
    ListView lvZonasTuristicas;
    Ciudad ciudad;
    ZonaTuristica zona;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_detalle_ciudad);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle("Detalles de ubicación");

        ivImagen = findViewById(R.id.iv_imagen_ciudad);
        tvInfo = findViewById(R.id.tv_info_ciudad);
        tvZonasTuristicas = findViewById(R.id.tv_zonas_turisticas);
        lvZonasTuristicas = findViewById(R.id.lv_zonas_turisticas);
        tvNombreCiudad = findViewById(R.id.tv_nombre_ciudad);

        latitud = getIntent().getDoubleExtra("LATITUD", 0.0);
        longitud = getIntent().getDoubleExtra("LONGITUD", 0.0);
        nombre = getIntent().getStringExtra("NOMBRE");
        tipo = getIntent().getStringExtra("TIPO");

        List<Ciudad> ciudades = CiudadProvider.obtenerTodasLasCiudades();
        tvNombreCiudad.setText(nombre);
        tvInfo.setText(DescripcionProvider.obtenerDescripcion(nombre));
        //ivImagen.setImageResource(ciudad.getIdImagen());

        if(tipo.equals("ciudad")){

            List<String> nombresZonas = new ArrayList<>();

            for (Ciudad c : ciudades) {
                if (c.getNombre().equals(nombre)) {
                    ciudad = c;
                    break;
                }
            }
            for (ZonaTuristica zona : ciudad.getZonasTuristicas()) {
                nombresZonas.add(zona.getNombre());
            }
            ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, nombresZonas);
            lvZonasTuristicas.setAdapter(adapter);

        }else if(tipo.equals("zona_turistica")){

            lvZonasTuristicas.setVisibility(View.GONE);
            tvZonasTuristicas.setVisibility(View.GONE);

        }
    }

    public boolean onSupportNavigateUp() {
        finish(); // vuelve al Fragment
        return true;
    }
}