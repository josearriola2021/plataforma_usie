// import '../json/data.json';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, Divider, List, Modal, Skeleton} from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';
import "../../index.css";


const Card = ({producto}) => {

  const {id, nombre, imagen, precio} = producto;
  const [size, setSize] = useState('large');
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Borrar producto mediante el icono de delete
  // const deleteProducto = () => {
  //   setButtonSecondary(true);
  //   setNewValorInput(1); //Setea el valor del input a 1 luego de ser eliminado
  //   removeProducto(id);
  // }

  //Activa el boton secundario y agregar el producto
  // const activeButtonSecondary = () => {
  //   buttonSecondary ? 
  //   setButtonSecondary(false) : setButtonSecondary(true);
  //   if (buttonSecondary == true) {
  //     // setNewValorInput(1);
  //     addProducto(id, nombre, precio, imagen, buttonSecondary);
  //     setNewValorInput(1);
  //   }
  // }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  //Funciones del scroll de lista de informes
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    fetch('https://josearriola2021.github.io/data_informes/lista_informes.json')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
    
    useEffect(() => {
      loadMoreData();
    }, []);

    const data_informes = data?.filter((elemento) => {
      return elemento.id_inst == id
    });

   data_informes ? console.log(data):console.log(data_informes);
    
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
        <div className="card-actions justify-end agregar-button">
          <Button type="primary" shape="round" size={size} onClick={showModal}>
            ver Informes
          </Button>
          <Modal
            title="Informes de Supervisión - USIE"
            open={isModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
            footer={null}
          >
            <>
              <div
                id="scrollableDiv"
                style={{
                  height: 400,
                  overflow: "auto",
                  padding: "0 16px",
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
              >
                <InfiniteScroll
                  dataLength={data.length}
                  next={loadMoreData}
                  hasMore={data.length < 50}
                  loader={
                    <Skeleton
                      avatar
                      paragraph={{
                        rows: 1,
                      }}
                      active
                    />
                  }
                  endMessage={
                    <Divider plain>It is all, nothing more 🤐</Divider>
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <List
                    dataSource={data_informes}
                    renderItem={(item) => (
                      <List.Item key={item.email}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.picture.large} />}
                          title={
                            <a href="https://ant.design">{item.name.last}</a>
                          }
                          description={item.email}
                        />
                        <div>Content</div>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </>
          </Modal>

          {/* <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal> */}
        </div>
        <div></div>
      </div>
    </div>
  );
    
}
 
export default Card;