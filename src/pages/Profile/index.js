import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { Avatar, Card, Descriptions, Typography,  Radio, Space, Tabs, Divider } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { HeaderTemplate } from "../../components";
const { TabPane } = Tabs;

const Profile = () => {

    const {userAuth, users} = useContext(AuthContext);

    const datosPersonales = users.filter(user => user.nickname === userAuth); 
    //Traigo el objeto que coincide con el userAuth
    const tarjeta = datosPersonales[0].tarjeta;

    //Estado inicial de modal: Iniciar Sesion
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Estado inicial de modal: Registrarse
  const [isModalVisibleRegistrarse, setIsModalVisibleRegistrarse] =
    useState(false);

    return (
      <>
        <HeaderTemplate setIsModalVisible={setIsModalVisible}/>
        <Tabs tabPosition="left">
          <TabPane
            tab={
              <>
                <div class="avatar online mb-6">
                  <div class="w-24 rounded-full">
                    <img src={datosPersonales[0].imgUser} />
                  </div>
                </div>
                <div className="flex justify-start">
                  <i class="bi bi-person"></i>&nbsp; Perfil
                </div>
              </>
            }
            key="1"
          >
            <div>
              <Typography.Title level={2}>Perfil</Typography.Title>
              <Divider />
              <Typography.Text style={{ fontSize: "16px" }}>
                Visualiza tus datos de sesión, correo electrónico y contraseña
              </Typography.Text>
              <Card
                style={{
                  width: 300,
                  marginTop: "20px",
                }}
              >
                <Typography.Title level={4}>Datos Personales</Typography.Title>
                <div className="border-b-2 border-b-gray-100 border-dashed py-2">
                  <label className="font-semibold">Nombre</label>
                  <div>{datosPersonales[0].nombre}</div>
                </div>
                <div className="border-b-2 border-b-gray-100 border-dashed py-2">
                  <label className="font-semibold">Apellidos</label>
                  <div>{datosPersonales[0].apellidos}</div>
                </div>
                <div className="border-b-2 border-b-gray-100 border-dashed py-2">
                  <label className="font-semibold">E-mail</label>
                  <div>{datosPersonales[0].email}</div>
                </div>
                <div className="border-b-2 border-b-gray-100 border-dashed py-2">
                  <label className="font-semibold">
                    Documento de Identidad
                  </label>
                  <div>{datosPersonales[0].DNI}</div>
                </div>
                <div className="border-b-2 border-b-gray-100 border-dashed py-2">
                  <label className="font-semibold">Teléfono</label>
                  <div>{datosPersonales[0].telefono}</div>
                </div>
              </Card>
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <i class="bi bi-geo-alt"></i>&nbsp; Direcciones
              </span>
            }
            key="2"
          >
            <Typography.Title level={2}>Direcciones</Typography.Title>
            <Divider />
            <Card
              style={{
                width: "350px",
              }}
            >
              <Typography.Title level={4}>
                {datosPersonales[0].direccion}
              </Typography.Title>
              <Typography.Title level={5}>
                {datosPersonales[0].ciudad}
              </Typography.Title>
              <Typography.Text>
                {datosPersonales[0].distrito}, {datosPersonales[0].provincia},{" "}
                {datosPersonales[0].departamento}
              </Typography.Text>
            </Card>
          </TabPane>
          <TabPane
            tab={
              <span>
                <i class="bi bi-credit-card"></i>&nbsp; Tarjeta de Crédito
              </span>
            }
            key="3"
          >
            <Typography.Title level={2}>Tarjetas de Crédito</Typography.Title>
            <Divider />
            <Card
              style={{
                width: "350px",
              }}
            >
              <Typography.Title level={5}>Número de tarjeta</Typography.Title>
              <div className="flex justify-start items-center gap-2">
                <img src={datosPersonales[0].urlTarjeta} className="w-32" />
                <Typography.Text>
                  **** **** **** {tarjeta.slice(-4)}
                </Typography.Text>
              </div>
            </Card>
          </TabPane>
        </Tabs>

        {/* <div>{userAuth}</div>
            <Descriptions title="Perfil" layout="vertical">
                <Descriptions.Item label="UserName">{userAuth}</Descriptions.Item>
                <Descriptions.Item label="Teléfono">{datosPersonales[0].telefono}</Descriptions.Item>
                <Descriptions.Item label="Email">{datosPersonales[0].email}</Descriptions.Item>
                <Descriptions.Item label="Distrito">{datosPersonales[0].distrito}</Descriptions.Item>
                <Descriptions.Item label="Provincia">{datosPersonales[0].provincia}</Descriptions.Item>
                <Descriptions.Item label="Departamento">{datosPersonales[0].departamento}</Descriptions.Item>
                <Descriptions.Item label="País">{datosPersonales[0].pais}</Descriptions.Item>
                <Descriptions.Item label="Dirección" span={2}>
                {datosPersonales[0].pais}                
                </Descriptions.Item>
              </Descriptions> */}
      </>
    );
}
 
export default Profile;