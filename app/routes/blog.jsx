import { Outlet } from "@remix-run/react";
import stylesPost from "../styles/post.css";

export function links(){
    return[
        {
            rel: "stylesheet",
            href: stylesPost
        }
    ]
}

function Blog(){
    return(
        <main className="contenedor">
           <Outlet/>
        </main>
    )
}

export default Blog