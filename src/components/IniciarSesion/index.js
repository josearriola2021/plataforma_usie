import { useState } from 'react';
import { Modal } from 'antd'; 
import { notification} from 'antd';
import {FormLogin} from '../../components';

const IniciarSesion  = ({isModalVisible, setIsModalVisible, setIsModalVisibleRegistrarse}) => {

  //Cierre de login
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //Apertura de registrarse
  const showModalRegistrarse = () => {
    setIsModalVisibleRegistrarse(true);
  };

  const notiInicioSesion = () => {
    const openNotificacion = (placement) => {
      notification.success({
        message: 'Iniciaste sesión con éxito',
        placement,
      });
    }
    openNotificacion("top");
  }

  //Loadings - Iniciar Sesion
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      setIsModalVisible(false); //Desaparece el modal de iniciar sesion
      notiInicioSesion('top'); //Notificacion de inicio exitoso
    }, 4000);
  };

  return (
    <Modal
      title="Iniciar Sesión"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <article className="flex justify-center">
        <div className="w-60">
          <FormLogin loadings={loadings} enterLoading={enterLoading} showModalRegistrarse={showModalRegistrarse}/>
        </div>
      </article>
    </Modal>
  );
}
 
export default IniciarSesion;