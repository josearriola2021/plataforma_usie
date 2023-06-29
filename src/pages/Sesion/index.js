import { useState } from 'react';
import { notification} from 'antd';
import {FormLogin} from '../../components';

const Sesion = ({isModalVisible, setIsModalVisible}) => {

    const handleCancel = () => {
        setIsModalVisible(true);
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
      <>
        <article className="flex justify-center h-screen bg-blue-500">
          <div className="w-60 h-72 m-36 p-4 border border-neutral-100 rounded-xl bg-white">
            <FormLogin
              loadings={loadings}
              enterLoading={enterLoading}
            />
          </div>
        </article>
      </>
    );
}

export default Sesion