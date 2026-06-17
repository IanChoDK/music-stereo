"use client";
import { useState } from "react";
import axios from "axios";

export default function SearchBar() {
  // Estado para la busqueda
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Funcion para manejar la busqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      // Llamada a la API con el query de busqueda
      const response = await axios.get("/api/search", { params: { q: query } });
      setSearchResults(response.data.results || []);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };

  // Funcion para manejar la seleccion de un item de los resultados
  const handleSelectItem = async (id) => {
    try {
      // Llamada a la API con el id del item
      const response = await axios.get(`/api/artist/${id}`);
      setSelectedItem(response.data);
    } catch (error) {
      console.error("Error al seleccionar el item:", error);
    }
  };

  return (
    // Formulario de busqueda con input y boton
    <form onSubmit={handleSearch} className="relative w-80 z-50">
      <input
        className="w-full px-4 py-2 rounded-full focus:outline-none border border-gray-300 focus:border-blue-500 text-white"
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-0 top-0 mt-1 mr-2 text-gray-400 p-2 rounded-full hover:text-blue-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>

      {loading && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3 text-gray-500">
          Cargando...
        </div>
      )}

      {/* Resultados de la busqueda  */}
      {searchResults.length > 0 && !loading && (
        <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto text-black">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-none text-sm"
            >
              <span className="font-semibold">{result.title}</span>
              <span className="block text-xs text-gray-500 capitalize">
                {result.type}
              </span>

              <button
                className="cursor:pointer mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                onClick={() => handleSelectItem(result.id)}
              >
                Ver detalles
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
