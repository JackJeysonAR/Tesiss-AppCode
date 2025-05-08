package calderon.cordova.pongo.pa3.org.ui.entidad;

import java.util.ArrayList;
import java.util.List;

public class Ciudad {
    private String nombre;
    private double latitud;
    private double longitud;
    private List<ZonaTuristica> zonasTuristicas;

    public Ciudad() {
    }

    public Ciudad(String nombre, double latitud, double longitud) {
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        this.zonasTuristicas = new ArrayList<>();
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getLatitud() {
        return latitud;
    }

    public void setLatitud(double latitud) {
        this.latitud = latitud;
    }

    public double getLongitud() {
        return longitud;
    }

    public void setLongitud(double longitud) {
        this.longitud = longitud;
    }

    public List<ZonaTuristica> getZonasTuristicas() {
        return zonasTuristicas;
    }

    public void setZonasTuristicas(List<ZonaTuristica> zonasTuristicas) {
        this.zonasTuristicas = zonasTuristicas;
    }
}
