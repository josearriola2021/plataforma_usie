// import '../json/data.json';
import {useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, List, Modal, Space} from "antd";
import {ConsoleSqlOutlined, CopyrightOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import React from "react";

import "../../index.css";


const Card = ({producto}) => {

  const {id, nombre, imagen, precio} = producto;
  const [size, setSize] = useState('large');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});

  async function exampleFetch() {
    const response = await fetch('https://josearriola2021.github.io/data_informes/lista_informes.json');
    const data = await response.json();
    setData(data);
  }

  exampleFetch();

  // const data_informes = data?.filter((elemento) =>
  //   elemento.id_inst = id,
  // );


  const showModal = () => {
    setIsModalOpen(true);
    console.log(data)
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
          <Button onClick={showModal} type="primary" shape="round" size={size}>
            ver Informes
          </Button>

          {/* Modal de Informes */}
          <Modal title="Informes" open={isModalOpen}>
            {
              data.results?.map((elemento) => (
                <p>{elemento.email}</p>
              ))
            }
          </Modal>
        </div>
      </div>
    </div>
  );
    
}
 
export default Card;