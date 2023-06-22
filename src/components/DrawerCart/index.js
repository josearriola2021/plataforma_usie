import { useContext, useEffect, useState } from "react";
import { CarritoComprasContext } from "../../context";
import { Alert, Button, Drawer, Typography } from 'antd';
import { UserAddOutlined } from "@ant-design/icons";
import {CartItem} from "../../components";

const DrawerCart = ({onClose, visible}) => {
    const {contador, productosAgregados, productosOfUser, sumaProductos, totalProductos} = useContext(CarritoComprasContext);

    const title=`Tienes agregado ${totalProductos} ${totalProductos > 1 ? "productos" : "producto"}`;

    useEffect(() => {
      contador(productosAgregados)
    }, [])

    return (
      <Drawer
        title={title}
        placement="right"
        zIndex={0}
        onClose={onClose}
        visible={visible}
        className="mt-12 mb-32"
      >
        <Alert message="Listo para comprar" type="success" showIcon style={{marginBottom:"10px"}} />
        <Typography.Title level={4}>Resume de compra</Typography.Title>
        {/* <Typography.Text >Resumen de productos</Typography.Text> */}
        <Typography.Title level={4} style={{marginTop:"10px"}}>Total: S/{sumaProductos}</Typography.Title>
        {productosOfUser.length > 0 &&
          productosOfUser.map((producto, index) => (
            <CartItem producto={producto} index={index} />
          ))}
        {/* <Button type="primary" shape="round" size="large">
          Continuar
        </Button> */}
      </Drawer>
    );
}
 
export default DrawerCart;