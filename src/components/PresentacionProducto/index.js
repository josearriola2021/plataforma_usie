import { Breadcrumb, Button, Card, Divider, Image, Tabs, Typography } from 'antd';
import { AppleOutlined } from '@ant-design/icons';
import 'bootstrap-icons/font/bootstrap-icons.css';
const { Title } = Typography;
const { TabPane } = Tabs;

const PresentacionProducto = ({data, nombre, id}) => {

    const searchProductoId = data.productos?.filter((producto) => {
        return producto.id == id;
    })

    const searchEspecificacionesId = data.especificaciones?.filter((producto) => {
      return producto.id == id;
  })

    const PagosEntrega = () => {
      return (
        <Card>
          <Title level={5}>Empresa:</Title>
          <p>ENGIE ENERGÍA PERÚ</p>
          <Divider />
          <div>
            <Title level={5} strong>
              Ubicación
            </Title>
            <div className="mb-3">
              <i className="bi bi-truck text-3xl text-red-500"></i>
              &nbsp;&nbsp;&nbsp;
              <span className="text-gray-500">Campo</span>
            </div>
            <div>
              <i className="bi bi-shop text-3xl text-red-500"></i>
              &nbsp;&nbsp;&nbsp;
              <span className="text-gray-500">Gabinete</span>
            </div>
          </div>
          <Divider />
          <div>
            <Title level={5} strong>
              Última Actualización
            </Title>
            <p className="m-0">Junio 2023</p>
            <img
              className="mt-3"
              width="150"
              src="https://smaregi.jp/shared/img/cashless/cashless-logo-credit.png"
            />
          </div>
        </Card>
      );
    };

    return (
      <>
        {searchProductoId && (
          <>
            {/* Ruta */}
            <div className="ml-2 md:ml-52 my-3">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <i class="bi bi-house-door"></i>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span>{searchProductoId[0].categoria}</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {searchProductoId[0].itemcategoria}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/* Imagen de Producto */}
            <div className="flex flex-col gap-10 md:flex-row justify-center gap-4">
              <div className="mx-auto md:mx-0 col-span-1 ">
                <Image
                  width="25rem"
                  src={searchProductoId[0].imagen}
                  preview={false}
                />
              </div>
              {/* Nombres y precios */}
              <div className="ml-4 md:w-80 col-span-1">
                <Title level={3}>{nombre}</Title>
                <Divider style={{ width: "10px" }} />
                <Title level={4} type="danger" style={{ marginBottom: "20px" }}>
                  Avance Físico: {searchProductoId[0].precio} %
                </Title>
                <Title level={4} type="danger" style={{ marginBottom: "20px" }}>
                  Avance Económico: {searchProductoId[0].precio} MMUSS$
                </Title>
                {/* <Button
                  type="primary"
                  size="large"
                  shape="round"
                  style={{ width: "200px" }}
                >
                  Agregar
                </Button> */}
              </div>

              <div className="md:w-80 col-span-1 justify-center">
                <PagosEntrega />
              </div>
            </div>
            {/* Especificaciones */}
            <div className="mt-16 flex flex-col items-center">
              <div className="w-full md:w-3/5">
                <Title level={3} className="text-center">
                  Datos de la central
                </Title>
                <Tabs
                  defaultActiveKey="1"
                  size="large"
                  className="w-full"
                  centered
                >
                  <TabPane
                    tab={
                      <span>
                        <AppleOutlined />
                        Especificaciones
                      </span>
                    }
                    key="1"
                  >
                    {searchEspecificacionesId &&
                      searchEspecificacionesId[0].descripcion?.map(
                        (elemento, index) => {
                          return (
                            <div className="flex justify-center w-full border-b-2 border-b-gray-100 p-2" key={index}>
                              <div className="w-full font-semibold">{elemento.titulo}</div>
                              <div className="w-full">{elemento.detalle}</div>
                            </div>
                          );
                        }
                      )}
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </>
        )}
      </>
    );
}
 
export default PresentacionProducto;