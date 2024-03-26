import imagen from "../../public/img/nosotros.jpg"
import stylesNosotros from "../styles/nosotros.css"



export function meta(){
    return[
        {title: "GuitarLA - Sobre Nosotros "},
        {description: "Venta de Guitarras, Blog de Música y Más"}
    ]
}

export function links(){
    return[
        {
            rel: "stylesheet",
            href: stylesNosotros
        },
        {
            rel: "preload", /**agrega una img o video, un archivo de js o css y le dice al navegador
            q tan pronto como cargue la informacion, debe cargar esta imagen que puede ser muy pesada, por ej*/
            href: imagen,
            as: "image"
        }
    ]
}

function Nosotros(){


    return(
        <main className="contenedor nosotros">
           <h2 className="heading">Nosotros</h2>

           <div className="contenido">
              <img src={imagen} alt="Imagen sobre Nosotros"/>
     
           <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Morbi tincidunt justo non odio varius imperdiet. 
                 In hac habitasse platea dictumst. Donec viverra ultricies mattis. 
                 Morbi ipsum risus, iaculis non mauris eget, scelerisque condimentum dui. 
                 In sit amet dictum purus. Vestibulum eget convallis neque.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Morbi tincidunt justo non odio varius imperdiet. 
                 In hac habitasse platea dictumst. Donec viverra ultricies mattis. 
                 Morbi ipsum risus, iaculis non mauris eget, scelerisque condimentum dui. 
                 In sit amet dictum purus. Vestibulum eget convallis neque.
            </p>
           </div>
           </div>
        </main>
    )
}

export default Nosotros