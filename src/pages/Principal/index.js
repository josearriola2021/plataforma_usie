import { useState } from 'react';
import {Productos, Categoria, Ordenar, HeaderPrincipal } from "../../components";
import '../../App.css';
import '../../index.css';
import 'antd/dist/antd.css';

function Principal() {

  const [data, setData] = useState({});
  const [estadoBuscador, setEstadoBuscador] = useState("");
  const [estadoCategoria, setEstadoCategoria] = useState([]);
  const [estadoOrdenar, setEstadoOrdenar] = useState("Precio bajo"); //Por defecto está ordenado por precio bajo

  const [activeBuscador, setActiveBuscador] = useState(true);
  const [checkedList, setCheckedList] = useState([]); //Permite establecer la lista de los checkbox checkeados

  return (
    <>
      <HeaderPrincipal
        setEstadoBuscador={setEstadoBuscador}
        setActiveBuscador={setActiveBuscador}
        setCheckedList={setCheckedList}
      />
      <Ordenar setEstadoOrdenar={setEstadoOrdenar} />
      <section className="flex py-3 relative">
        <Categoria
          data={data}
          setEstadoCategoria={setEstadoCategoria}
          setActiveBuscador={setActiveBuscador}
          setCheckedList={setCheckedList}
          checkedList={checkedList}
        />
        <Productos
          setData={setData}
          data={data}
          estadoBuscador={estadoBuscador}
          estadoCategoria={estadoCategoria}
          activeBuscador={activeBuscador}
          estadoOrdenar={estadoOrdenar}
        />
      </section>
    </>
  );
}

export default Principal;
