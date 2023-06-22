import { useState } from 'react';
import { Button, Checkbox, Form, Input, notification} from 'antd'; //Para formulario de iniciar sesion
import { Modal } from 'antd'; //Para abrir modal
import validacionRegistrarse from '../../utils/Registrarse';

const Registrarse = ({isModalVisibleRegistrarse, setIsModalVisibleRegistrarse }) => {
  
  //Cierre de modal de registro
  const handleCancelRegistrarse = () => {
    setIsModalVisibleRegistrarse(false);
  };

  //Estilos para formulario de registro
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const notiRegistrarse = () => {
    const openNotificacion = (placement) => {
      notification.success({
        message: "Registro exitoso",
        placement,
      });
    };
    openNotificacion("top");
  };

  const listaUsuariosRegistrados = []; //Se guardan los usuarios registrados

  //Eventos
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const usersLocalStorage = JSON.parse(localStorage.getItem("usuarios"));
    if (usersLocalStorage == null) {
      listaUsuariosRegistrados.push(values);
      localStorage.setItem(
        "usuarios",
        JSON.stringify(listaUsuariosRegistrados)
      );
    } else {
      usersLocalStorage.push(values);
      localStorage.setItem("usuarios", JSON.stringify(usersLocalStorage));
    }
  };

  //Loadings - Registrarse
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
      setIsModalVisibleRegistrarse(false);
      notiRegistrarse("top"); //Notificacion de registro exitoso
    }, 4000);
  };

  return (
    <Modal
      title="Registrarse"
      visible={isModalVisibleRegistrarse}
      onCancel={handleCancelRegistrarse}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Ingrese un email válido!",
            },
            {
              required: true,
              message: "Ingresa tu email!",
            },
          ]}
        >
          <Input id="inputEmailRegistro" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: "Ingresa tu contraseña!",
            },
          ]}
          hasFeedback
        >
          <Input.Password id="inputPasswordRegistro" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirmar contraseña"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Confirma tu contraseña!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Las dos contraseñas ingresadas no coinciden!")
                );
              },
            }),
          ]}
        >
          <Input.Password id="inputPasswordConfirmRegistro" />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="Como quieres aparecer al iniciar tu sesión?"
          rules={[
            {
              required: true,
              message: "Ingresa un nombre de usuario!",
              whitespace: true,
            },
          ]}
        >
          <Input id="inputNicknameRegistro" />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox id="terminosCondiciones">
            He leído los <a href="">términos y condiciones</a>
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loadings[0]}
            onClick={() => {
              const resultado = validacionRegistrarse();
              if (resultado == true) {
                enterLoading(0);
              }
            }}
          >
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
 
export default Registrarse;