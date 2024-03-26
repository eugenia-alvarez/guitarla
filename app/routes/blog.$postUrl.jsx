import { getPost } from "~/models/blog.server"
import { useLoaderData, useNavigate } from "@remix-run/react"
import { formatearFecha } from "~/utils/helpers"

export function meta({data}){

    if (!data) { /**si data es undefined porque no hay resultados, es decir porque no se encontro la guitarra q se busca */
    return[
         {title: "GuitarLA - Entrada No Encontrada"},
        ]}
      
      /**para acceder debemos usar data (de remix) .data (de strapi) */
      return[
        {title: `GuitarLA - ${data.data[0].attributes.titulo}`},
        {description: `GuitarLA - Venta de Guitarras - Entrada ${data.data[0].attributes.titulo}`}
      ]
  }
  

export async function loader({params}){
    /**obtenemos la url */
const {postUrl} = params
const post = await getPost(postUrl)

if(post.data.length === 0){
    throw new Response("", {
        status: 404,
        statusText: "Post no encontrado"
    })
}
   return post
}

/**Manejo de Errores */
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
        <p className='error'> 404 - Entrada No Encontrada</p>,
        <button className="error-boton" onClick={() => navigate('/')}>Ir a la página principal</button>
        </div>
    )
        
  }


function Post() {

    const post = useLoaderData()

    const {titulo, contenido, publishedAt, imagen, url} = post.data[0].attributes

  return (
    <article className="post mt-3">
        <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen blog ${titulo}`}/>

      <div className="contenido">
      <h3>{titulo}</h3>
      <p className="fecha">{formatearFecha(publishedAt)}</p>
      <p className="texto">{contenido[0].children[0].text}</p>
      </div>


    </article>
  )
}

export default Post
