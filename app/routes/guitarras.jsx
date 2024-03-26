import {Outlet, useOutletContext } from "@remix-run/react";

import stylesGuitarra from "~/styles/guitarras.css";




export function links(){
    return[
        {
            rel: "stylesheet",
            href: stylesGuitarra
        }
    ]
 }    
function Tienda(){

    return(
        <main className="contenedor">
            <Outlet
                context={useOutletContext()}
            />
        </main>
    )
}

export default Tienda