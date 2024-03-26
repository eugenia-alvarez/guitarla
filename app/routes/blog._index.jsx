import { useLoaderData } from "@remix-run/react";
import { getPosts } from "../models/blog.server";
import ListadoPosts from "../components/listado-posts";

export function meta(){
    return[
        {title: `GuitarLA - Nuestro Blog`},
        {description: `GuitarLA - Blog de Música y Venta de Guitarras`}
    ]
}


export async function loader(){
    const posts = await getPosts();
    
    return posts.data ;
}

function Blog(){

    const posts = useLoaderData();

    return(
           <ListadoPosts 
             posts={posts}
           />   
    )
}

export default Blog