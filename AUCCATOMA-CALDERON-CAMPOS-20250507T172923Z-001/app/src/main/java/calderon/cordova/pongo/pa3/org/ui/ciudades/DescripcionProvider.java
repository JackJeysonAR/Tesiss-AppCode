package calderon.cordova.pongo.pa3.org.ui.ciudades;

public class DescripcionProvider {



    public static String obtenerDescripcion(String lugar) {

        String descripcion = null;
        switch (lugar) {
            case "Lima":
                descripcion="Lima es la vibrante capital de Perú, conocida por su rica historia, la Plaza Mayor, el Circuito Mágico del Agua, y distritos como Barranco y Miraflores, llenos de cultura.";
                break;
            case "Plaza Mayor de Lima":
                descripcion="La Plaza Mayor de Lima es el corazón histórico de la ciudad, rodeada por la imponente Catedral, el Palacio de Gobierno y la Municipalidad, reflejando su rica herencia colonial.";
                break;
            case "Museo Larco":
                descripcion="El Museo Larco alberga una impresionante colección de arte precolombino peruano, con destacadas piezas de cerámica, textiles y metales, ofreciendo una visión profunda de las culturas antiguas.";
                break;
            case "Barranco":
                descripcion="Barranco es un distrito bohemio de Lima, conocido por su vibrante vida nocturna, bares, galerías de arte, su emblemático puente de los suspiros y su arquitectura colonial colorida.";
                break;
            case "Miraflores":
                descripcion="Miraflores es un distrito turístico y moderno, famoso por su malecón frente al mar, parques bien cuidados, centros comerciales y una animada vida nocturna, ideal para turistas y locales.";
                break;
            case "Cusco":
                descripcion = "Cusco es la antigua capital del Imperio Inca, llena de historia, arquitectura colonial y paisajes impresionantes, conocida como la puerta de entrada a Machu Picchu.";
                break;
            case "Plaza de Armas de Cusco":
                descripcion = "La Plaza de Armas de Cusco es el centro histórico de la ciudad, rodeada por iglesias coloniales como la Catedral y la iglesia de La Compañía de Jesús.";
                break;
            case "Sacsayhuamán":
                descripcion = "Sacsayhuamán es una antigua fortaleza inca situada en las colinas de Cusco, famosa por sus enormes piedras talladas y su impresionante ingeniería.";
                break;
            case "Qoricancha":
                descripcion = "Qoricancha, o Templo del Sol, fue el templo más importante del Imperio Inca, dedicado al dios sol Inti, y actualmente alberga el Convento de Santo Domingo.";
                break;
            case "Barrio de San Blas":
                descripcion = "El Barrio de San Blas es conocido por sus estrechas calles empedradas, arte local, talleres de artesanos y su ambiente bohemio y tradicional.";
                break;
            case "Mercado de San Pedro":
                descripcion = "El Mercado de San Pedro es un colorido mercado tradicional de Cusco, famoso por sus productos frescos, artesanías y una auténtica experiencia local.";
                break;
            case "Arequipa":
                descripcion = "Arequipa es una ciudad colonial conocida por su arquitectura de sillar blanco, el majestuoso volcán Misti y su vibrante historia cultural.";
                break;
            case "Plaza de Armas Arequipa":
                descripcion = "La Plaza de Armas de Arequipa es el corazón de la ciudad, rodeada por edificaciones coloniales de sillar y la imponente Catedral de Arequipa.";
                break;
            case "Monasterio de Santa Catalina":
                descripcion = "El Monasterio de Santa Catalina es una ciudadela religiosa con hermosos pasillos y capillas, que permite explorar la historia monástica de Arequipa.";
                break;
            case "Mirador de Yanahuara":
                descripcion = "El Mirador de Yanahuara ofrece una vista panorámica de Arequipa, con una hermosa vista del volcán Misti y la ciudad rodeada de montañas.";
                break;
            case "Museo Santuarios Andinos":
                descripcion = "El Museo Santuarios Andinos alberga la famosa momia Juanita, una niña sacrificada en los Andes, y otras piezas precolombinas de gran valor histórico.";
                break;
            case "Volcán Misti":
                descripcion = "El Volcán Misti es uno de los principales atractivos naturales de Arequipa, conocido por su forma cónica perfecta y su imponente presencia en el paisaje local.";
                break;

            // INTERNACIONALES

            case "Nueva York":
                descripcion = "Nueva York es la ciudad que nunca duerme, famosa por su icónica arquitectura, diversidad cultural y atracciones como Times Square, Central Park y la Estatua de la Libertad.";
                break;
            case "Times Square":
                descripcion = "Times Square es el cruce más famoso de Nueva York, conocido por sus enormes pantallas digitales, teatros de Broadway y su vibrante ambiente durante todo el año.";
                break;
            case "Central Park":
                descripcion = "Central Park es un vasto oasis verde en el corazón de Manhattan, ideal para paseos, actividades al aire libre y ofrece un refugio natural en medio de la ciudad.";
                break;
            case "Estatua de la Libertad":
                descripcion = "La Estatua de la Libertad, situada en la isla de la Libertad, es un símbolo mundial de libertad y democracia, que ha dado la bienvenida a millones de inmigrantes en su llegada a Estados Unidos.";
                break;
            case "Empire State Building":
                descripcion = "El Empire State Building es un rascacielos emblemático de Nueva York, conocido por sus impresionantes vistas panorámicas de la ciudad desde su observatorio en el piso 86.";
                break;
            case "Brooklyn Bridge":
                descripcion = "El Brooklyn Bridge conecta Manhattan con Brooklyn, ofreciendo unas vistas impresionantes del horizonte de Nueva York y siendo uno de los puentes más antiguos y famosos de la ciudad.";
                break;
            case "París":
                descripcion = "París, la Ciudad de la Luz, es conocida por su romanticismo, monumentos emblemáticos como la Torre Eiffel, el Museo del Louvre y la Catedral de Notre-Dame.";
                break;
            case "Torre Eiffel":
                descripcion = "La Torre Eiffel es el ícono más reconocido de París, famosa por su estructura de hierro y las vistas panorámicas que ofrece de la ciudad desde sus diferentes niveles.";
                break;
            case "Museo del Louvre":
                descripcion = "El Museo del Louvre es uno de los museos más grandes y famosos del mundo, hogar de obras maestras como la Mona Lisa y la Venus de Milo.";
                break;
            case "Catedral de Notre-Dame":
                descripcion = "La Catedral de Notre-Dame es una de las catedrales góticas más impresionantes de Europa, famosa por su arquitectura, vitrales y su historia en la cultura francesa.";
                break;
            case "Campos Elíseos":
                descripcion = "Los Campos Elíseos son una de las avenidas más famosas del mundo, conocida por sus tiendas de lujo, teatros y su cercanía al Arco de Triunfo.";
                break;
            case "Basílica del Sagrado Corazón":
                descripcion = "La Basílica del Sagrado Corazón es un importante lugar de culto en París, ubicada en la colina de Montmartre, y ofrece una vista panorámica espectacular de la ciudad.";
                break;
            case "Londres":
                descripcion = "Londres, la capital de Inglaterra, es una ciudad llena de historia, cultura y monumentos emblemáticos como el Big Ben, el Palacio de Buckingham y la Torre de Londres.";
                break;
            case "Big Ben":
                descripcion = "Big Ben es uno de los relojes más famosos del mundo, ubicado en el Palacio de Westminster, y se ha convertido en un símbolo icónico de Londres.";
                break;
            case "London Eye":
                descripcion = "El London Eye es una noria gigante que ofrece unas vistas espectaculares de la ciudad, incluyendo el río Támesis y muchos de los puntos más emblemáticos de Londres.";
                break;
            case "Palacio de Buckingham":
                descripcion = "El Palacio de Buckingham es la residencia oficial de la Reina de Inglaterra, conocido por su famosa ceremonia de cambio de guardia y su grandiosa arquitectura.";
                break;
            case "Torre de Londres":
                descripcion = "La Torre de Londres es un histórico castillo que ha servido como prisión, palacio y casa de la moneda, además de albergar las joyas de la corona británica.";
                break;
            case "Puente de la Torre":
                descripcion = "El Puente de la Torre es un puente levadizo icónico de Londres, famoso por su arquitectura victoriana y por ser uno de los puntos más fotografiados de la ciudad.";
                break;


                default:
                descripcion = " Description Provider: No se encontró información sobre el lugar especificado.";
                break;











        }


        return descripcion;
    }
}
