import {Link} from "@remix-run/react";
import { formatearFecha } from "~/utils/helpers";

function Post({post}) {

    const {titulo, imagen, contenido, url, publishedAt} = post
    

  return (
    /**Usualmente las entradas de blog se colocan en un article */
    <article className="post">
   <img className="imagen" src={imagen.data.attributes.formats.small.url} alt={`Imagen blog ${titulo}`}/>

    <div className="contenido">
    <h3>{titulo}</h3>
    <p className="fecha">{formatearFecha(publishedAt)}</p>
     <p className="resumen">{contenido[0].children[0].text}</p>
     <Link className="enlace" to={`/blog/${url}`}>Leer Post</Link>
    </div>
    
   
    </article>
  )
}

export default Post
