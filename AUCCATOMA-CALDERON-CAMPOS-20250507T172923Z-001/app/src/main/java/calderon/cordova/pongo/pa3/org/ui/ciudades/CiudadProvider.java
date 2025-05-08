package calderon.cordova.pongo.pa3.org.ui.ciudades;

import java.util.ArrayList;
import java.util.List;

import calderon.cordova.pongo.pa3.org.ui.entidad.Ciudad;
import calderon.cordova.pongo.pa3.org.ui.entidad.ZonaTuristica;

public class CiudadProvider {

    public static List<Ciudad> obtenerTodasLasCiudades() {
        List<Ciudad> ciudades = new ArrayList<>();

        Ciudad lima = new Ciudad("Lima", -12.0464, -77.0428);
        List<ZonaTuristica> zonasLima = new ArrayList<>();
        zonasLima.add(new ZonaTuristica("Plaza Mayor de Lima", -12.0464, -77.0300));
        zonasLima.add(new ZonaTuristica("Circuito Mágico del Agua", -12.0701, -77.0337));
        zonasLima.add(new ZonaTuristica("Museo Larco", -12.0910, -77.0675));
        zonasLima.add(new ZonaTuristica("Barranco", -12.1526, -77.0219));
        zonasLima.add(new ZonaTuristica("Miraflores", -12.1211, -77.0297));
        lima.setZonasTuristicas(zonasLima);
        ciudades.add(lima);

        Ciudad cusco = new Ciudad("Cusco", -13.5319, -71.9675);
        List<ZonaTuristica> zonasCusco = new ArrayList<>();
        zonasCusco.add(new ZonaTuristica("Plaza de Armas de Cusco", -13.5167, -71.9780));
        zonasCusco.add(new ZonaTuristica("Sacsayhuamán", -13.5094, -71.9817));
        zonasCusco.add(new ZonaTuristica("Qoricancha", -13.5183, -71.9772));
        zonasCusco.add(new ZonaTuristica("Barrio de San Blas", -13.5155, -71.9765));
        zonasCusco.add(new ZonaTuristica("Mercado de San Pedro", -13.5181, -71.9833));
        cusco.setZonasTuristicas(zonasCusco);
        ciudades.add(cusco);

        Ciudad arequipa = new Ciudad("Arequipa", -16.4090, -71.5375);
        List<ZonaTuristica> zonasArequipa = new ArrayList<>();
        zonasArequipa.add(new ZonaTuristica("Plaza de Armas", -16.3988, -71.5369));
        zonasArequipa.add(new ZonaTuristica("Monasterio de Santa Catalina", -16.3951, -71.5361));
        zonasArequipa.add(new ZonaTuristica("Mirador de Yanahuara", -16.3902, -71.5430));
        zonasArequipa.add(new ZonaTuristica("Museo Santuarios Andinos", -16.3977, -71.5374));
        zonasArequipa.add(new ZonaTuristica("Volcán Misti", -16.2950, -71.4090));
        arequipa.setZonasTuristicas(zonasArequipa);
        ciudades.add(arequipa);

        Ciudad trujillo = new Ciudad("Trujillo", -8.1120, -79.0288);
        List<ZonaTuristica> zonasTrujillo = new ArrayList<>();
        zonasTrujillo.add(new ZonaTuristica("Plaza de Armas de Trujillo", -8.1116, -79.0281));
        zonasTrujillo.add(new ZonaTuristica("Chan Chan", -8.0998, -79.0906));
        zonasTrujillo.add(new ZonaTuristica("Huaca del Sol y la Luna", -8.1261, -78.9931));
        zonasTrujillo.add(new ZonaTuristica("Museo Huacas de Moche", -8.1225, -78.9936));
        zonasTrujillo.add(new ZonaTuristica("Huanchaco", -8.0864, -79.1217));
        trujillo.setZonasTuristicas(zonasTrujillo);
        ciudades.add(trujillo);

        Ciudad chiclayo = new Ciudad("Chiclayo", -6.7714, -79.8409);
        List<ZonaTuristica> zonasChiclayo = new ArrayList<>();
        zonasChiclayo.add(new ZonaTuristica("Plaza de Armas de Chiclayo", -6.7718, -79.8405));
        zonasChiclayo.add(new ZonaTuristica("Museo Tumbas Reales de Sipán", -6.8425, -79.8725));
        zonasChiclayo.add(new ZonaTuristica("Pimentel", -6.8270, -79.9306));
        zonasChiclayo.add(new ZonaTuristica("Museo Nacional Sicán", -6.7526, -79.6351));
        zonasChiclayo.add(new ZonaTuristica("Mercado Modelo", -6.7723, -79.8411));
        chiclayo.setZonasTuristicas(zonasChiclayo);
        ciudades.add(chiclayo);

        Ciudad piura = new Ciudad("Piura", -5.1945, -80.6328);
        List<ZonaTuristica> zonasPiura = new ArrayList<>();
        zonasPiura.add(new ZonaTuristica("Plaza de Armas de Piura", -5.1945, -80.6322));
        zonasPiura.add(new ZonaTuristica("Catedral de Piura", -5.1950, -80.6320));
        zonasPiura.add(new ZonaTuristica("Catacaos", -5.2657, -80.6825));
        zonasPiura.add(new ZonaTuristica("Máncora", -4.1075, -81.0471));
        zonasPiura.add(new ZonaTuristica("Museo de Oro Vicús", -5.2028, -80.6146));
        piura.setZonasTuristicas(zonasPiura);
        ciudades.add(piura);

        Ciudad iquitos = new Ciudad("Iquitos", -3.7491, -73.2538);
        List<ZonaTuristica> zonasIquitos = new ArrayList<>();
        zonasIquitos.add(new ZonaTuristica("Plaza de Armas de Iquitos", -3.7437, -73.2516));
        zonasIquitos.add(new ZonaTuristica("Malecón Tarapacá", -3.7445, -73.2477));
        zonasIquitos.add(new ZonaTuristica("Mercado de Belén", -3.7546, -73.2470));
        zonasIquitos.add(new ZonaTuristica("Reserva Nacional Pacaya Samiria", -4.5, -74.5));
        zonasIquitos.add(new ZonaTuristica("Casa de Fierro", -3.7448, -73.2510));
        iquitos.setZonasTuristicas(zonasIquitos);
        ciudades.add(iquitos);

        Ciudad puno = new Ciudad("Puno", -15.8402, -70.0219);
        List<ZonaTuristica> zonasPuno = new ArrayList<>();
        zonasPuno.add(new ZonaTuristica("Islas Uros", -15.7961, -69.9996));
        zonasPuno.add(new ZonaTuristica("Plaza de Armas de Puno", -15.8403, -70.0217));
        zonasPuno.add(new ZonaTuristica("Catedral de Puno", -15.8406, -70.0221));
        zonasPuno.add(new ZonaTuristica("Mirador Kuntur Wasi", -15.8271, -70.0282));
        zonasPuno.add(new ZonaTuristica("Isla Taquile", -15.7744, -69.6856));
        puno.setZonasTuristicas(zonasPuno);
        ciudades.add(puno);

        Ciudad tacna = new Ciudad("Tacna", -18.0066, -70.2463);
        List<ZonaTuristica> zonasTacna = new ArrayList<>();
        zonasTacna.add(new ZonaTuristica("Plaza de Armas de Tacna", -18.0062, -70.2467));
        zonasTacna.add(new ZonaTuristica("Catedral de Tacna", -18.0064, -70.2470));
        zonasTacna.add(new ZonaTuristica("Museo Ferroviario", -18.0035, -70.2471));
        zonasTacna.add(new ZonaTuristica("Arco Parabólico", -18.0062, -70.2468));
        zonasTacna.add(new ZonaTuristica("Petroglifos de Miculla", -17.9200, -70.0486));
        tacna.setZonasTuristicas(zonasTacna);
        ciudades.add(tacna);

        Ciudad chimbote = new Ciudad("Chimbote", -9.0744, -78.5937);
        List<ZonaTuristica> zonasChimbote = new ArrayList<>();
        zonasChimbote.add(new ZonaTuristica("Catedral de Chimbote", -9.0853, -78.5789));
        zonasChimbote.add(new ZonaTuristica("Bahía de Chimbote", -9.0744, -78.5937));
        zonasChimbote.add(new ZonaTuristica("Isla Blanca", -9.0500, -78.6000));
        zonasChimbote.add(new ZonaTuristica("Vivero Forestal", -9.0862, -78.5965));
        zonasChimbote.add(new ZonaTuristica("Plaza de Armas de Chimbote", -9.0770, -78.5915));
        chimbote.setZonasTuristicas(zonasChimbote);
        ciudades.add(chimbote);

        Ciudad nuevaYork = new Ciudad("Nueva York", 40.7128, -74.0060);
        List<ZonaTuristica> zonasNuevaYork = new ArrayList<>();
        zonasNuevaYork.add(new ZonaTuristica("Times Square", 40.7580, -73.9855));
        zonasNuevaYork.add(new ZonaTuristica("Central Park", 40.7851, -73.9683));
        zonasNuevaYork.add(new ZonaTuristica("Estatua de la Libertad", 40.6892, -74.0445));
        zonasNuevaYork.add(new ZonaTuristica("Empire State Building", 40.7484, -73.9857));
        zonasNuevaYork.add(new ZonaTuristica("Brooklyn Bridge", 40.7061, -73.9969));
        nuevaYork.setZonasTuristicas(zonasNuevaYork);
        ciudades.add(nuevaYork);

        Ciudad paris = new Ciudad("París", 48.8566, 2.3522);
        List<ZonaTuristica> zonasParis = new ArrayList<>();
        zonasParis.add(new ZonaTuristica("Torre Eiffel", 48.8584, 2.2945));
        zonasParis.add(new ZonaTuristica("Museo del Louvre", 48.8606, 2.3376));
        zonasParis.add(new ZonaTuristica("Catedral de Notre-Dame", 48.8529, 2.3500));
        zonasParis.add(new ZonaTuristica("Campos Elíseos", 48.8698, 2.3078));
        zonasParis.add(new ZonaTuristica("Basílica del Sagrado Corazón", 48.8867, 2.3431));
        paris.setZonasTuristicas(zonasParis);
        ciudades.add(paris);

        Ciudad londres = new Ciudad("Londres", 51.5074, -0.1278);
        List<ZonaTuristica> zonasLondres = new ArrayList<>();
        zonasLondres.add(new ZonaTuristica("Big Ben", 51.5007, -0.1246));
        zonasLondres.add(new ZonaTuristica("London Eye", 51.5033, -0.1196));
        zonasLondres.add(new ZonaTuristica("Palacio de Buckingham", 51.5014, -0.1419));
        zonasLondres.add(new ZonaTuristica("Torre de Londres", 51.5081, -0.0759));
        zonasLondres.add(new ZonaTuristica("Puente de la Torre", 51.5055, -0.0754));
        londres.setZonasTuristicas(zonasLondres);
        ciudades.add(londres);

        Ciudad tokio = new Ciudad("Tokio", 35.6895, 139.6917);
        List<ZonaTuristica> zonasTokio = new ArrayList<>();
        zonasTokio.add(new ZonaTuristica("Torre de Tokio", 35.6586, 139.7454));
        zonasTokio.add(new ZonaTuristica("Templo Senso-ji", 35.7148, 139.7967));
        zonasTokio.add(new ZonaTuristica("Shibuya Crossing", 35.6595, 139.7005));
        zonasTokio.add(new ZonaTuristica("Palacio Imperial", 35.6852, 139.7528));
        zonasTokio.add(new ZonaTuristica("Parque Ueno", 35.7156, 139.7745));
        tokio.setZonasTuristicas(zonasTokio);
        ciudades.add(tokio);

        Ciudad sydney = new Ciudad("Sídney", -33.8688, 151.2093);
        List<ZonaTuristica> zonasSydney = new ArrayList<>();
        zonasSydney.add(new ZonaTuristica("Ópera de Sídney", -33.8568, 151.2153));
        zonasSydney.add(new ZonaTuristica("Puente de la Bahía de Sídney", -33.8523, 151.2108));
        zonasSydney.add(new ZonaTuristica("Bondi Beach", -33.8915, 151.2767));
        zonasSydney.add(new ZonaTuristica("Jardín Botánico Real", -33.8642, 151.2166));
        zonasSydney.add(new ZonaTuristica("Taronga Zoo", -33.8430, 151.2411));
        sydney.setZonasTuristicas(zonasSydney);
        ciudades.add(sydney);

        Ciudad roma = new Ciudad("Roma", 41.9028, 12.4964);
        List<ZonaTuristica> zonasRoma = new ArrayList<>();
        zonasRoma.add(new ZonaTuristica("Coliseo Romano", 41.8902, 12.4922));
        zonasRoma.add(new ZonaTuristica("Fontana di Trevi", 41.9009, 12.4833));
        zonasRoma.add(new ZonaTuristica("Plaza de San Pedro", 41.9022, 12.4539));
        zonasRoma.add(new ZonaTuristica("Panteón de Agripa", 41.8986, 12.4768));
        zonasRoma.add(new ZonaTuristica("Piazza Navona", 41.8992, 12.4731));
        roma.setZonasTuristicas(zonasRoma);
        ciudades.add(roma);

        Ciudad rio = new Ciudad("Río de Janeiro", -22.9068, -43.1729);
        List<ZonaTuristica> zonasRio = new ArrayList<>();
        zonasRio.add(new ZonaTuristica("Cristo Redentor", -22.9519, -43.2105));
        zonasRio.add(new ZonaTuristica("Pan de Azúcar", -22.9486, -43.1566));
        zonasRio.add(new ZonaTuristica("Copacabana", -22.9711, -43.1822));
        zonasRio.add(new ZonaTuristica("Ipanema", -22.9846, -43.2048));
        zonasRio.add(new ZonaTuristica("Maracaná", -22.9122, -43.2302));
        rio.setZonasTuristicas(zonasRio);
        ciudades.add(rio);





        return ciudades;
    }
}
