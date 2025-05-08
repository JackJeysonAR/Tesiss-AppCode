package calderon.cordova.pongo.pa3.org.ui.entidad;

public class ZonaTuristica {
    private String nombre, descripcion;
    private double latitud;
    private double longitud;

    public ZonaTuristica(String nombre, double latitud, double longitud) {
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;

    }

    // getters
    public String getNombre() { return nombre; }
    public double getLatitud() { return latitud; }
    public double getLongitud() { return longitud; }

}