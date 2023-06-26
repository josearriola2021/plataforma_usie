// import '../json/data.json';
import {useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, List, Modal, Space} from "antd";
import {ConsoleSqlOutlined, CopyrightOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import React from "react";

import "../../index.css";


const Card = ({producto, data}) => {

  const {id, nombre, imagen, precio, sup} = producto;
  const [size, setSize] = useState('large');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indicador, setIndicador] = useState("");
  // const [filtro_informes, setFiltro_informes] = useState({});

  // async function exampleFetch() {
  //   const response = await fetch('https://josearriola2021.github.io/data_informes/lista_informes.json');
  //   const data = await response.json();
  //   const filtros = data.results?.filter((elemento) => {
  //     return elemento.id_inst == id;
  //   })
  //   setFiltro_data(filtros);
  //   console.log(filtro_data)
  // }

  // exampleFetch();

  

  const filtro_informes = data.productos?.filter((producto) =>
    producto.nombre.includes(indicador)
  );

  const array_informes = filtro_informes[0].informes;

  const capturar_evento = (e) => {
    setIndicador(e.currentTarget.id);
    console.log(indicador);
  }


  const showModal = (e) => {
    setIsModalOpen(true);
    capturar_evento(e);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  //  data_informes ? console.log(data_informes):console.log(data_informes);
    
  return (
    <div
      className="card bg-base-100 shadow-xl max-w-xs"
      style={{ maxHeight: "500px" }}
    >
      <Link to={`/${nombre}/${id}`}>
        <figure>
          <img src={imagen} alt="Nombre" />
        </figure>
      </Link>

      <div className="card-body flex-none">
        <h2 className="card-title text-base">{nombre}</h2>
        <p className="text-red-500 font-bold text-base">Avance: {precio}%</p>
        <div className="card-actions agregar-button">
          {/* Boton de Contratos */}
          <a type="primary" className="text-black">
            <CopyrightOutlined style={{ fontSize: "24px" }} />
          </a>

          {/* Boton de Informes */}
          <Button onClick={showModal} type="primary" shape="round" size={size} id={nombre}>
            ver Informes
          </Button>

          {/* Modal de Informes */}
          <Modal scrollable={true} title="Informes" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className="overflow-scroll h-72">{
              array_informes?.map((elemento) => (
                <p>{elemento.cod} - {elemento.sup}</p>
              )
                
              )
            }
            </div>
          </Modal>
        </div>  
      </div>
    </div>
  );
    
}
 
export default Card;