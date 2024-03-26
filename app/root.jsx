import { useState, useEffect } from "react";
import { Meta, Links, Outlet, Scripts, LiveReload} from "@remix-run/react";

import styles from "./styles/index.css";
import Header from "./components/header";
import Footer from "./components/footer";

export function meta(){

    return(
        //Esto seria el DOCTYPE que encontrariamos en cualq proyecto de HTML
        [
            {charset: "utf-8"},
            {title: "GuitarLA - Remix"},
            { name: "viewport", content: "width=device-width,initial-scale=1" }
        ]
    )
}

export function links(){
    return(
        [
            {
                rel: 'stylesheet',
                href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
            },
            {
                rel: 'stylesheet',
                href: styles
            },

            //Agregamos una fuente de Google Font 
    /**Google Fonts nos da 3 enlaces, uno para conectarse, otro para gstatic y otro hacia la fuente que hemos agregado.
     por ello debemos crear un objeto por cada enlace*/
     {
         rel:'preconnect',
         href:'https://fonts.googleapis.com'

     },
     {
        rel:'preconnect', 
        href:'https://fonts.gstatic.com',
        crossOrigin: "true"
     },
     {
        rel:'stylesheet',
        href:'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'

     }
        ]
    )
}

export default function App(){

    const carritoLS =
    typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("car")) ?? []
        : []
    ;

  const [carrito, setCarrito] = useState(carritoLS);
 
  useEffect(() => {
    localStorage.setItem("car", JSON.stringify(carrito));
  }, [carrito]);


    const agregarCarrito = (guitarra) => {
       if(carrito.some(guitarraState => guitarraState.id === guitarra.id)){
            
        //Iterar sobre el arreglo e identificar el elemento duplicado
            const carritoActualizado = carrito.map(guitarraState => {
                if(guitarraState.id === guitarra.id){
                    //Reescribir la cantidad
                    guitarraState.cantidad = guitarra.cantidad
                }
                return guitarraState
            })
          //  Añadir al carrito
            setCarrito(carritoActualizado)
       }else{
        //Si no existe una guitarra con el id, es un registro nuevo y lo agregamos al carrito
        setCarrito([...carrito, guitarra])
       }
    }
   

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState =>{
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
            setCarrito(carritoActualizado)
    }

    return(
       <Document>
           <Outlet 
                context={{
                    agregarCarrito : agregarCarrito,
                    carrito : carrito,
                    actualizarCantidad : actualizarCantidad,
                    eliminarGuitarra : eliminarGuitarra
                }}
           />
       </Document>
    )
}

//Podemos nombrar esta función como "Document" o "Layout"
function Document({children}){

    return(
        <html lang="es">
            <head>
              <Meta />
              <Links />
            </head>
            <body>
                <Header/>
               {children}

              <Footer/>
               <Scripts/>
               <LiveReload/>
            </body>
        </html>
    )
}

