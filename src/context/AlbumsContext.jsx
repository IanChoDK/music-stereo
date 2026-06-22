"use client";                                                                  //esto le dice a next que tiene que ejecutarse en el navegador del usuario. ¿porque el context necesita use client? porque se usa usestate y useEffect, los hoocks de react solamente funcionan en componentes de clientes

import { createContext, useContext, useEffect, useState } from "react";         //se importan 4 herramientas (hoocks y funciones) que vienen incluidas en react. 1-createContext sirve para crear un contexto global, antes de context api, si un dato estaba en un componente padre y lo necesitaban mucho componentes hijos, habia que pasarlo por props. Con context API se crea un almacen global, luego cualquier componente puede acceder a los datos sin recibir props. 2-useContext sirve para leer datos del contexto, react va a buscar el valor que el provider esta compartiendo, es como decir "react dame los datos que estan guardados en albumcontext" 3- useState sirve para crear estados, por ejemplo, react crea "favoritos" que contiene los datos actuales y "setFavoritos" que sirven para modificarlos 4- useEffect sirve para ejecutar codigo cuando ocurre algo, "la pagina acaba de cargarse, voy a buscar si existen favoritos guardados" "cada vez que cambie favoritos, ejecuta este codigo " 
import { albums as defaultAlbums } from "@/lib/albums";

const AlbumsContext = createContext();                                          //crea un contenedor global donde react podra guardar informacion compartida 

export function AlbumsProvider({ children }) {                                  //crear el provider, en react children representa todo lo que este dentro de una etiqueta, el provider debe envolver los componentes que van a usar el contexto
  const [albums, setAlbums] = useState([])
  const [favorites, setFavorites] = useState([]);                               //esto crea: favorites -> contiene los favoritos y setFavorites -> permite modificarlos, 
  const [message, setMessage] = useState("");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {                
    setIsMounted(true);

    const savedAlbums = window.localStorage.getItem("my_albums")
    if (savedAlbums){
      setAlbums(JSON.parse(savedAlbums))
    } else {
      window.localStorage.setItem("my_albums", JSON.stringify(defaultAlbums));
      setAlbums(defaultAlbums);
    }


    const savedFavorites = localStorage.getItem("favorites");                   //
                                                                                //
    if (savedFavorites) {                                                       //  ------> Cargar el localStorage, suponiendo que localStorage tiene id:1 -> tittle:"thriller" entonces: savedFavorites=id:1, tittle:"thriller" pero eso es texto. Para convertirlo nuevamente a un array: JSON.parse(savedFavorites) y luego setFavorites actualiza el estado
      setFavorites(JSON.parse(savedFavorites));                                 //
    }                                                                           //
  }, []);   
                                                                      

  //guardar en localstorage 
  useEffect(() => {                                                             //
    localStorage.setItem("favorites", JSON.stringify(favorites));               // -----> cuando cambia favorites react ejecuta este efecto, ¿porqueJSON.stringify? pprque localstorage solo guarda texto, si tenemos id: 1 - tittle: "thriller" no puede guardarlo directamente, lo combierte en texto y recien ahi lo almacena 
  }, [favorites]);                                                              //


  const saveAlbums = (newAlbums) => {
    setAlbums(newAlbums);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("my_albums", JSON.stringify(newAlbums));
    }
  }

  const addAlbum = (album) => {
    const newAlbum = {
      ...album,
      id: Date.now(),
    };
    const newAlbums = [...albums, newAlbum];
    saveAlbums(newAlbums);
    
    setMessage("Álbum creado exitosamente");
    setTimeout(() => setMessage(""), 2000);
  }

  const deleteAlbum = (id) => {
    const filteredAlbums = albums.filter((album) => String(album.id) !== String(id));
    saveAlbums(filteredAlbums);

    removeFavorite(id);

    setMessage("Álbum eliminado");
    setTimeout(() => setMessage(""), 2000);
  }

  const getAlbumById = (id) => {
    return albums.find((album) => String(album.id) === String(id));
  }


  const addFavorite = (album) => {                                              // agregar favorito, se crea la funcion, por ejemplo "addFavorite(album)" 
    const exists = favorites.find((fav) => fav.id === album.id);                // buscar si ya existe, si por ejemplo favorites contiene id:1 tittle:"thriller" y queremos agregar id:1 tittle:"thriller" entonces exists contendra ese album

    if (!exists) {                                                              //evitar duplicados                                                          
      setFavorites([...favorites, album]);                                      // "...favorites" si tenemos favorites: id:1 entonces ...favorites, id:2 se convierte en id:1 id:2. Estamos agregando el nuevo album al final
      setMessage("Album agregado a favoritos");

      setTimeout(() => {
        setMessage("");

      }, 2000);

    }
  };



  const removeFavorite = (id) => {                                              //Eliminar favorito, Se recibe un id, por ejemplo: removeFavorite(3)                                      
    setFavorites(favorites.filter((album) => album.id !== id));                 // supongamos que favorites [{id:1}, {id:2}, {id:3}] y ejecutamos removeFavorite(3) entonces album.id !==3 deja pasar [{id:1}, {id:2}] el album 3 desaparece, luego el setFavorites actualiza el estado
  
    setMessage("Album eliminado de favoritos");

    setTimeout(() => {
      setMessage("");
    }, 2000);

  };

  if (!isMounted) return null;

  return (
    <AlbumsContext.Provider                                                     // el provider. Aca estamos diciendo por ejemplo "voy a compartir informacion con todos los componenetes que esten dentro"
      value={{                          //
        albums,
        addAlbum,
        deleteAlbum,
        getAlbumById,
        favorites,                      //
        addFavorite,                    //  -----> es lo que se va a compartir, estamos exponiendo favorites, addFavorites(), removeFavorites() a toda la aplicacion
        removeFavorite,                 //
        message,                        //
      }}                                //

    >
      {children}                                                                
    </AlbumsContext.Provider>
  );
}

// children: renderiza todo lo que esta dentro del provider, ejemplo:

//<AlbumsProvider>
//  <NavBar />
//  <Albums />
//  <Footer />
//</AlbumsProvider>

// con {children} equivale a:
//<NavBar />
//<Albums />
//<Footer />

//cerrar el provider: </Almbumscontext.provider> (fin del contexto compartido)


export function useAlbums() {                                                      //creamos una funcion personalizada
  return useContext(AlbumsContext);                                                //usecontext() le pide a react que le de el valor que esta compartiendo el provider de albumscontext, gracias a esta linea cualquer componente puede acceder al estado global (favorites) y a las funciones (addfavorite, removefavorites) 
}