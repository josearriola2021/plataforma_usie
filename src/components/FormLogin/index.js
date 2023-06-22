import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {Button, Checkbox, Form, Input} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const FormLogin = ({loadings, enterLoading, showModalRegistrarse}) => {
    const { login, mensajeUserNoAuth } = useContext(AuthContext); //Funcion del context para actualizar el Usuario autenticado

    //Constante para validacion de iniciar Sesion
    const validacionIniciarSesion = (values) => {
      login(values, enterLoading);
    };

    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={validacionIniciarSesion}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Ingresa tu email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
            id="inputEmailIniciarSesion"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Ingresa tu contraseña!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            id="inputPasswordIniciarSesion"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loadings[0]}>
            Log in
          </Button>
          O{" "}
          <a href="#" onClick={showModalRegistrarse}>
            Registrarse!
          </a>
        </Form.Item>
      </Form>
    );
}
 
export default FormLogin;