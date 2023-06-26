import { useEffect } from 'react';
import {Card} from '../../components';
import { fetchApi } from '../../services';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Productos = ({ estadoBuscador, estadoCategoria, activeBuscador, estadoOrdenar, setData, data}) => {

  const fetchDataApi = async () => {
    const data = await fetchApi();
    setData(data);
  }

  useEffect(() => {
    fetchDataApi();
  },[]);

  // const agregarButton = document.querySelectorAll(".agregar-button");
  // const cantidadProductosAgregados = document.querySelectorAll(
  //   ".cantidad-productosagregados"
  // );

  // agregarButton.forEach((element, index) => {
  //   element.addEventListener("click", () => {
  //     element.classList.add("hidden");
  //     cantidadProductosAgregados[index].classList.remove("hidden");
  //   });
  // });

  const resultadoBuscador = data.productos?.filter((producto) =>
    producto.nombre.toLowerCase().includes(estadoBuscador.toLowerCase())
  );

  const resultadoCategoria = data.productos?.filter((producto) =>
    estadoCategoria.includes(producto.itemcategoria)
  );

  
  //Se seleccionan aquellos productos que coinciden con el estadoCategoria.
  
  switch (estadoOrdenar) {
    case "Precio alto":
      resultadoBuscador?.sort((a,b) => b.precio - a.precio);
      resultadoCategoria?.sort((a,b) => b.precio - a.precio);
      break;
    case "Precio bajo":
      resultadoBuscador?.sort((a,b) => a.precio - b.precio);
      resultadoCategoria?.sort((a,b) => a.precio - b.precio);
      break;
    case "Nombre creciente":
      resultadoBuscador?.sort((a,b) => a.nombre.localeCompare(b.nombre));
      resultadoCategoria?.sort((a,b) => a.nombre.localeCompare(b.nombre));
      break;
    case "Nombre decreciente":
      resultadoBuscador?.sort((a,b) => b.nombre.localeCompare(a.nombre));
      resultadoCategoria?.sort((a,b) => b.nombre.localeCompare(a.nombre));
      break;
  }

  return (
    <div className="mx-auto lg:px-12 sm:px-3 px-4 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-4">
      {activeBuscador ? (
        resultadoBuscador != "" ? (
          resultadoBuscador?.map((producto) => {
            return <Card producto={producto} data={data} key={producto.id} />;
          }) 
          )
         : (
          <div>No se encontraron coincidencias</div> //Si no se existen coincidencias en el buscador
        )
      ) : (
        resultadoCategoria?.map((producto) => {
          return <Card producto={producto} key={producto.id}/>;
        })
      )}
    </div>
  );
};
 
export default Productos;