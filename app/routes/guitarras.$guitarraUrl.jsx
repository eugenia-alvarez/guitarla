import {useState} from "react"
import { useLoaderData, useNavigate, useOutletContext} from "@remix-run/react";
import {getGuitarra} from "~/models/guitarras.server";


export async function loader({params}){
    const {guitarraUrl} = params
    
    const guitarra = await getGuitarra(guitarraUrl)
  
    if(guitarra.data.length === 0){
        throw new Response("", {
            status: 404,
            statusText: "Guitarra no encontrada"
        })
    }
    return guitarra;
}

/** Manejo de errores */

export function ErrorBoundary() {
    const navigate = useNavigate();
    const error = navigate.data && navigate.data.error;
   
    if (error && error.status === 404) {
      return (
        <p className='error'>
          {error.status} {error.statusText}
        </p>
        
      );
    }
    return (
        <div>
        <p className='error'> 404 - Guitarra No Encontrada</p>,
        <button className="error-boton" onClick={() => navigate('/')}>Ir a la página principal</button>
        </div>
    )
        
  }


export function meta({data}){

  if (!data) { /**si data es undefined porque no hay resultados, es decir porque no se encontro la guitarra q se busca */
  return[
       {title: "Guitarra No Encontrada"},
        {description: `GuitarLA - Venta de Guitarras - Guitarra No encontrada` }
      ]}
    
    /**para acceder debemos usar data (de remix) .data (de strapi) */
    return[
        {title: `GuitarLA - ${data.data[0].attributes.nombre}`},
        {description: `GuitarLA - Venta de Guitarras - Guitarra ${data.data[0].attributes.nombre}`}
    ]
}



function Guitarra() {
  const {agregarCarrito} = useOutletContext() //aplicamos destructuring
  

    const[cantidad, setCantidad] = useState(0)

    const guitarra = useLoaderData();
    const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes

    const handleSubmit = e => {
      e.preventDefault();
  
      if(cantidad < 1){
        alert("Debes seleccionar una cantidad")
        return
      }

      /**Una vez pasada la valdiación, vamos a tener un objeto con todo lo que vamos
       almacenar en LocalStorage*/
       const guitarraSeleccionada = {
        id: guitarra.data[0].id,
        imagen: imagen.data.attributes.url,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
       }
    
       agregarCarrito(guitarraSeleccionada)
    }  
  
    

  return (
     <div className="guitarra">
       <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`}/>
    
        <div className="contenido">
            <h3>{nombre}</h3>
            <p className="texto">{descripcion[0].children[0].text}</p>
            <p className="precio">${precio}</p>

            <form onSubmit={(e) => { handleSubmit(e) }}  className="formulario">
              <label htmlFor="cantidad">Cantidad</label>

              <select
                onChange={e => setCantidad(parseInt(e.target.value))} /**el value es un string, entonces lo convertimos a entero */
                id="cantidad">
                <option value="0">-- Seleccione --</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <input
                type="submit"
                value="Agregar al Carrito"
              />

            </form>
        </div>
     </div>
  )
}

export default Guitarra
