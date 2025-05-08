package calderon.cordova.pongo.pa3.org.ui.entidad;

public class Distancia {
    double latitudA, longitudA, latitudB, longitudB, distancia;
    String lugarA, lugarB, id;


    public Distancia() {
    }

    public Distancia(double latitudA, double longitudA, double latitudB,
                     double longitudB, double distancia, String lugarA, String lugarB, String id) {
        this.latitudA = latitudA;
        this.longitudA = longitudA;
        this.latitudB = latitudB;
        this.longitudB = longitudB;
        this.distancia = distancia;
        this.lugarA = lugarA;
        this.lugarB = lugarB;
        this.id = id;
    }

    public double getLatitudA() {
        return latitudA;
    }

    public void setLatitudA(double latitudA) {
        this.latitudA = latitudA;
    }

    public double getLongitudA() {
        return longitudA;
    }

    public void setLongitudA(double longitudA) {
        this.longitudA = longitudA;
    }

    public double getLatitudB() {
        return latitudB;
    }

    public void setLatitudB(double latitudB) {
        this.latitudB = latitudB;
    }

    public double getLongitudB() {
        return longitudB;
    }

    public void setLongitudB(double longitudB) {
        this.longitudB = longitudB;
    }

    public double getDistancia() {
        return distancia;
    }

    public void setDistancia(double distancia) {
        this.distancia = distancia;
    }

    public String getLugarA() {
        return lugarA;
    }

    public void setLugarA(String lugarA) {
        this.lugarA = lugarA;
    }

    public String getLugarB() {
        return lugarB;
    }

    public void setLugarB(String lugarB) {
        this.lugarB = lugarB;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}


