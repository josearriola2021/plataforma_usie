import { useState } from "react";
import {HeaderTemplate, IniciarSesion, Registrarse} from "../../components";


const HeaderProductoInfo = () => {
  //Estado inicial de modal: Iniciar Sesion
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Estado inicial de modal: Registrarse
  const [isModalVisibleRegistrarse, setIsModalVisibleRegistrarse] =
    useState(false);

  return (
    <>
      <HeaderTemplate setIsModalVisible={setIsModalVisible} />
      <Registrarse
        isModalVisibleRegistrarse={isModalVisibleRegistrarse}
        setIsModalVisibleRegistrarse={setIsModalVisibleRegistrarse}
      />
      <IniciarSesion
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsModalVisibleRegistrarse={setIsModalVisibleRegistrarse}
      />
    </>
  );
}
 
export default HeaderProductoInfo;