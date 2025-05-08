package calderon.cordova.pongo.pa3.org.ui.mapa;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentContainerView;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

import java.util.List;

import calderon.cordova.pongo.pa3.org.R;
import calderon.cordova.pongo.pa3.org.ui.ciudades.CiudadProvider;
import calderon.cordova.pongo.pa3.org.ui.ciudades.DetalleCiudadActivity;
import calderon.cordova.pongo.pa3.org.ui.entidad.Ciudad;
import calderon.cordova.pongo.pa3.org.ui.entidad.ZonaTuristica;

public class MapaFragment extends Fragment {

    private GoogleMap mMap;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1;
    private double latitud, longitud, distancia=0;

    private LatLng ubicacionActual, ultimoMarcador1, ultimoMarcador2;
    private String lugar;
    private int zoom;

    private Button btnToggleTipoMapa, btnToggleDistancia;
    private LinearLayout tipoMapaBtn;
    private boolean modo_satelital;
    private int contadorMarcador=0;
    private Ciudad ciudad;
    Bitmap iconLocation;
    Bitmap scaledBitmap;
    BitmapDescriptor nuevoIcono;

    Location locMarcador1 = new Location("provider");
    Location locMarcador2 = new Location("provider");



    private final OnMapReadyCallback callback = googleMap -> {

        mMap = googleMap;

        if (modo_satelital) mMap.setMapType(GoogleMap.MAP_TYPE_SATELLITE);
        else mMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);

        if (ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            habilitarUbicacion();
        } else {
            requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);
        }

        Bundle bundle = getArguments();
        if (bundle != null) {
            String nombreCiudad = bundle.getString("LUGAR");
            List<Ciudad> todasLasCiudades = CiudadProvider.obtenerTodasLasCiudades();

            for (Ciudad c : todasLasCiudades) {
                if (c.getNombre().equals(nombreCiudad)) {
                    ciudad = c;
                    break;
                }
            }
        }

        if (ciudad != null && ciudad.getZonasTuristicas() != null) {
            for (ZonaTuristica zona : ciudad.getZonasTuristicas()) {
                iconLocation = BitmapFactory.decodeResource(getResources(), R.drawable.marker_green);
                scaledBitmap = Bitmap.createScaledBitmap(iconLocation, 80, 80, true);
                nuevoIcono = BitmapDescriptorFactory.fromBitmap(scaledBitmap);
                Marker marker = mMap.addMarker(new MarkerOptions()
                        .position(new LatLng(zona.getLatitud(), zona.getLongitud()))
                        .title(zona.getNombre())
                        .icon(nuevoIcono));
                marker.setTag(zona);
            }
        } else {
            Log.e("MapaFragment", "Ciudad o ZonasTuristicas son null");
        }



        ubicacionActual = new LatLng(latitud, longitud);
        mMap.addMarker(new MarkerOptions()
                .title(lugar)
                .snippet("Lat: " + latitud + ", Lng: " + longitud)
                .position(ubicacionActual));
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(ubicacionActual, zoom));

        mMap.setOnMarkerClickListener(marker -> {

            ZonaTuristica zona = (ZonaTuristica) marker.getTag();
            if (zona != null) {
                Intent intent = new Intent(getContext(), DetalleCiudadActivity.class);
                intent.putExtra("TIPO", "zona_turistica");
                intent.putExtra("LATITUD", zona.getLatitud());
                intent.putExtra("LONGITUD", zona.getLongitud());
                intent.putExtra("NOMBRE", zona.getNombre());
                startActivity(intent);
            }

            return true;
        });

        mMap.setOnMapLongClickListener(latLng -> {

            latitud = latLng.latitude;
            longitud = latLng.longitude;
            if (ultimoMarcador1!=null) {
                ultimoMarcador2 = ultimoMarcador1;
            }
            ultimoMarcador1 = latLng;
            iconLocation = BitmapFactory.decodeResource(getResources(), R.drawable.marcador_azul);
            scaledBitmap = Bitmap.createScaledBitmap(iconLocation, 80, 80, true);
            nuevoIcono = BitmapDescriptorFactory.fromBitmap(scaledBitmap);
            mMap.addMarker(new MarkerOptions()
                    .icon(nuevoIcono)
                    .title("Nueva Ubicacion")
                    .snippet("Lat: " + latLng.latitude + ", Lng: " + latLng.longitude)
                    .position(latLng).anchor(0.5f, 0.7f)
            );
        });
    };

    private void habilitarUbicacion() {
        if (ActivityCompat.checkSelfPermission(requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            mMap.setMyLocationEnabled(true);
            mMap.getUiSettings().setZoomControlsEnabled(true);
            mMap.getUiSettings().setCompassEnabled(true);
            mMap.getUiSettings().setMyLocationButtonEnabled(true);
            mMap.getUiSettings().setMapToolbarEnabled(true);
        }
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {

        View vista = inflater.inflate(R.layout.fragment_mapa, container, false);

        btnToggleTipoMapa = vista.findViewById(R.id.btn_toggle_tipo_mapa);
        tipoMapaBtn = vista.findViewById(R.id.mapa_tipo_btn);
        btnToggleDistancia = vista.findViewById(R.id.btn_toggle_distancia);

        btnToggleTipoMapa.setOnClickListener(v -> {
            if (tipoMapaBtn.getVisibility() == View.GONE) {
                tipoMapaBtn.setVisibility(View.VISIBLE);
                btnToggleTipoMapa.setText("Cerrar");
            } else {
                tipoMapaBtn.setVisibility(View.GONE);
                btnToggleTipoMapa.setText("Elegir mapa");
            }
        });
        btnToggleDistancia.setOnClickListener(v -> {
            if (vista.findViewById(R.id.distancia_btn).getVisibility() == View.GONE) {
                vista.findViewById(R.id.distancia_btn).setVisibility(View.VISIBLE);
                btnToggleDistancia.setText("Cerrar");
            } else {
                vista.findViewById(R.id.distancia_btn).setVisibility(View.GONE);
                btnToggleDistancia.setText("Distancia");

            }

        });


        vista.findViewById(R.id.btn_normal).setOnClickListener(v -> mMap.setMapType(GoogleMap.MAP_TYPE_NORMAL));
        vista.findViewById(R.id.btn_satelite).setOnClickListener(v -> mMap.setMapType(GoogleMap.MAP_TYPE_SATELLITE));
        vista.findViewById(R.id.btn_hibrido).setOnClickListener(v -> mMap.setMapType(GoogleMap.MAP_TYPE_HYBRID));
        vista.findViewById(R.id.btn_terreno).setOnClickListener(v -> mMap.setMapType(GoogleMap.MAP_TYPE_TERRAIN));

        vista.findViewById(R.id.btn_distancia_entre_marcador).setOnClickListener(v -> {
            if (ultimoMarcador1 != null && ultimoMarcador2 != null) {
                locMarcador1.setLatitude(ultimoMarcador1.latitude);
                locMarcador1.setLongitude(ultimoMarcador1.longitude);
                locMarcador2.setLatitude(ultimoMarcador2.latitude);
                locMarcador2.setLongitude(ultimoMarcador2.longitude);
                distancia = locMarcador1.distanceTo(locMarcador2);
                Toast.makeText(requireContext(), "Distancia entre los marcadores: " + distancia + " metros", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(requireContext(), "Por favor, coloca dos marcadores primero.", Toast.LENGTH_SHORT).show();
            }

        });
        vista.findViewById(R.id.btn_distancia_ubicacion_actual).setOnClickListener(v -> {
            if (ultimoMarcador1 != null) {
                locMarcador1.setLatitude(ultimoMarcador1.latitude);
                locMarcador1.setLongitude(ultimoMarcador1.longitude);
                locMarcador2.setLatitude(ubicacionActual.latitude);
                locMarcador2.setLongitude(ubicacionActual.longitude);
                distancia = locMarcador1.distanceTo(locMarcador2);
                Toast.makeText(requireContext(), "Distancia desde la ubicación actual: " + distancia + " metros", Toast.LENGTH_SHORT).show();

            } else {
                Toast.makeText(requireContext(), "Por favor, coloca un marcador primero.", Toast.LENGTH_SHORT).show();
            }
        });
        vista.findViewById(R.id.btn_guardar_distancia).setOnClickListener(v -> {
            if(distancia!=0) {
                Intent intent = new Intent(requireContext(), AgregarDistanciaActivity.class);
                intent.putExtra("LAT1", locMarcador1.getLatitude());
                intent.putExtra("LNG1", locMarcador1.getLongitude());
                intent.putExtra("LAT2", locMarcador2.getLatitude());
                intent.putExtra("LNG2", locMarcador2.getLongitude());
                intent.putExtra("DISTANCIA", distancia);
                startActivity(intent);

            }else{
                Toast.makeText(requireContext(), "Por favor, calcula la distancia primero.", Toast.LENGTH_SHORT).show();
            }

        });

        return vista;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        if (getArguments() != null) {
            latitud = getArguments().getDouble("LATITUD", 0);
            longitud = getArguments().getDouble("LONGITUD", 0);
            lugar = getArguments().getString("LUGAR", "");
            modo_satelital = getArguments().getBoolean("MODO_SATELITAL", false);
            zoom = 12;
        } else{
            latitud = -9.19;
            longitud =  -75.015;
            zoom = 6;
        }
        ((SupportMapFragment) getChildFragmentManager().findFragmentById(R.id.mapa)).getMapAsync(callback);


    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                habilitarUbicacion();
            } else {
                Toast.makeText(requireContext(), "Permiso de ubicación denegado", Toast.LENGTH_SHORT).show();
            }
        }
    }
}