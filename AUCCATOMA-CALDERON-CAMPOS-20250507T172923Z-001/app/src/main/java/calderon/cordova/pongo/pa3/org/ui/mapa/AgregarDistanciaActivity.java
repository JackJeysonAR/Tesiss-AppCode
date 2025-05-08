package calderon.cordova.pongo.pa3.org.ui.mapa;

import android.location.Location;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.firebase.FirebaseApp;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.ArrayList;
import java.util.List;

import calderon.cordova.pongo.pa3.org.R;
import calderon.cordova.pongo.pa3.org.ui.entidad.Distancia;

public class AgregarDistanciaActivity extends AppCompatActivity {

    EditText edtDistancia, edtLugarA, edtLugarB, edtLatitudA, edtLatitudB, edtLongitudA, edtLongitudB;
    ListView listViewDistancia;
    private List<Distancia> listDistancia=new ArrayList<Distancia>();
    ArrayAdapter<Distancia> arrayAdapterDistancia;
    private DatabaseReference mDatabase;
    private FirebaseDatabase firebaseDatabase;

    Button btnGuardar;
    private Double latitudA, longitudA, distanciaAB, latitudB, longitudB;
    private String lugarA, lugarB;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_agregar_distancia);
        View rootView = findViewById(R.id.AgregarDistanciaActivity);
        if (rootView != null) {
            ViewCompat.setOnApplyWindowInsetsListener(rootView, (v, insets) -> {
                Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
                v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
                return insets;
            });
        }
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle("Guardar Distancia");

        edtDistancia = findViewById(R.id.edtDistancia);
        edtLugarA = findViewById(R.id.edtLugarA);
        edtLugarB = findViewById(R.id.edtLugarB);
        edtLatitudA = findViewById(R.id.edtLatitudA);
        edtLongitudA = findViewById(R.id.edtLongitudA);
        edtLatitudB = findViewById(R.id.edtLatitudB);
        edtLongitudB = findViewById(R.id.edtLongitudB);
        btnGuardar = findViewById(R.id.btnGuardar);

        edtLatitudA.setEnabled(false);
        edtLongitudA.setEnabled(false);
        edtLatitudB.setEnabled(false);
        edtLongitudB.setEnabled(false);
        edtDistancia.setEnabled(false);

        latitudA = getIntent().getDoubleExtra("LAT1", 0);
        longitudA = getIntent().getDoubleExtra("LNG1", 0);
        latitudB = getIntent().getDoubleExtra("LAT2", 0);
        longitudB = getIntent().getDoubleExtra("LNG2", 0);
        distanciaAB = getIntent().getDoubleExtra("DISTANCIA", 0);

        edtDistancia.setText(String.valueOf(distanciaAB));
        edtLatitudA.setText(String.valueOf(latitudA));
        edtLongitudA.setText(String.valueOf(longitudA));
        edtLatitudB.setText(String.valueOf(latitudB));
        edtLongitudB.setText(String.valueOf(longitudB));


        inicializarFirebase();


        btnGuardar.setOnClickListener(v -> {
            guardarDistancia();
        });


    }

    public void guardarDistancia() {

        if (!edtLugarA.getText().toString().isEmpty() && !edtLugarB.getText().toString().isEmpty()) {
            lugarA = edtLugarA.getText().toString();
            lugarB = edtLugarB.getText().toString();
            String id = mDatabase.push().getKey();
            Distancia distancia = new Distancia(latitudA, longitudA, latitudB, longitudB, distanciaAB, lugarA, lugarB, id);
            mDatabase.child("distancia").child(id).setValue(distancia);
            Toast.makeText(this, "Distancia guardada", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Por favor, ingrese los lugares", Toast.LENGTH_SHORT).show();
        }

    }

    private void inicializarFirebase() {
        FirebaseApp.initializeApp(this);
        firebaseDatabase = FirebaseDatabase.getInstance();
        mDatabase = firebaseDatabase.getReference();

    }
    public boolean onSupportNavigateUp() {
        finish(); // vuelve al Fragment
        return true;
    }


}