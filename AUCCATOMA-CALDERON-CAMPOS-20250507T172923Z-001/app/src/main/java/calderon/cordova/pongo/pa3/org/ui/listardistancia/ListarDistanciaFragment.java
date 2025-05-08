package calderon.cordova.pongo.pa3.org.ui.listardistancia;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

import calderon.cordova.pongo.pa3.org.R;
import calderon.cordova.pongo.pa3.org.ui.entidad.Distancia;

public class ListarDistanciaFragment extends Fragment {

    private DatabaseReference mDatabase;
    private FirebaseDatabase firebaseDatabase;
    private List<Distancia> listDistancia=new ArrayList<Distancia>();

    private ArrayAdapter<Distancia> arrayAdapterDistancia;

    ListView listViewDistancia;

    public ListarDistanciaFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View vista = inflater.inflate(R.layout.fragment_listar_distancia, container, false);

        listViewDistancia=vista.findViewById(R.id.listViewDistancia);
        mDatabase = FirebaseDatabase.getInstance().getReference();



        mDatabase.child("distancia").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                listDistancia.clear();
                for (DataSnapshot objSnapshot : dataSnapshot.getChildren()) {
                    Distancia distancia = objSnapshot.getValue(Distancia.class);
                    listDistancia.add(distancia);
                    arrayAdapterDistancia=new ArrayAdapter<Distancia>(getContext(),
                            android.R.layout.simple_list_item_1, listDistancia);
                    listViewDistancia.setAdapter(arrayAdapterDistancia);

                }

                arrayAdapterDistancia.notifyDataSetChanged();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });




        return vista;

    }
}