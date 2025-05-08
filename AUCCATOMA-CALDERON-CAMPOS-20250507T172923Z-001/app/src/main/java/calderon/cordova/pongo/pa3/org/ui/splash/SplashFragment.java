package calderon.cordova.pongo.pa3.org.ui.splash;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.navigation.NavOptions;
import androidx.navigation.Navigation;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import calderon.cordova.pongo.pa3.org.R;


public class SplashFragment extends Fragment {

    Button btnUbicarme;

    double latitud, longitud;
    String lugar;

    public SplashFragment() {
        // Required empty public constructor
    }




    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View vista = inflater.inflate(R.layout.fragment_splash, container, false);
        btnUbicarme=vista.findViewById(R.id.btnUbicarme);

        SimpleDateFormat sdf = new SimpleDateFormat("HH", Locale.getDefault());
        sdf.setTimeZone(TimeZone.getTimeZone("America/Lima"));
        int horaActual = Integer.parseInt(sdf.format(new Date()));

        btnUbicarme.setOnClickListener(v -> {
            Bundle bundle = new Bundle();
            if (horaActual >= 8 && horaActual <= 19) {
                latitud = -12.051279;
                longitud = -77.042049;
                lugar="Ubicacion del trabajo";
                Toast.makeText(requireContext(), lugar, Toast.LENGTH_SHORT).show();
            } else {
                latitud = -12.1200;
                longitud = -77.0300;
                lugar="Ubicacion de la casa";
                Toast.makeText(requireContext(), lugar, Toast.LENGTH_SHORT).show();
            }

            bundle.putDouble("LATITUD", latitud);
            bundle.putDouble("LONGITUD", longitud);
            bundle.putString("LUGAR", lugar);

            NavOptions navOptions = new NavOptions.Builder()
                    .setPopUpTo(R.id.nav_splash, true)
                    .build();

            Navigation.findNavController(v).navigate(R.id.action_splash_to_mapa, bundle, navOptions);
        });

        return vista;
    }
}