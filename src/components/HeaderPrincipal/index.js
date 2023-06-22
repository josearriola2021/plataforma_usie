import React, {useContext, useState } from 'react';
import {HeaderTemplate} from '../../components';
import { AuthContext } from '../../context/AuthContext';
import {IniciarSesion, Registrarse} from "../../components";
import { Input } from 'antd';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../../json/data.json";
import "../../css/Header.css";

const Header = ({setEstadoBuscador, setActiveBuscador, setCheckedList }) => {

  // const {userAuth, logout} = useContext(AuthContext);

  //Estado inicial de modal: Iniciar Sesion
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Estado inicial de modal: Registrarse
  const [isModalVisibleRegistrarse, setIsModalVisibleRegistrarse] =
    useState(false);

  //buscador
  const { Search } = Input;
  const onSearch = (value) => {
    setActiveBuscador(true); //Para que se renderice en Tienda.js lo seleccionado en el buscador
    setEstadoBuscador(value); //Asigna a estadoBuscador el valor asignado en el input
    setCheckedList([]); //Limpia los checkbox cuando uso el buscador
  }; 

  //limpia el buscador cuando no existe ninguna entrada
  const onClear = (e) => {
    e.target.value === "" ? setEstadoBuscador(e.target.value) : console.log("");
  };

  return (
    <>
      <HeaderTemplate setIsModalVisible={setIsModalVisible}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          onChange={onClear}
        />
      </HeaderTemplate>
      <Registrarse
        isModalVisibleRegistrarse={isModalVisibleRegistrarse}
        setIsModalVisibleRegistrarse={setIsModalVisibleRegistrarse}
      />
      <IniciarSesion
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsModalVisibleRegistrarse={setIsModalVisibleRegistrarse}
      />
      {/* <Outlet /> */}
    </>
  );
}
 
export default Header;