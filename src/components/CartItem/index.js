import { Card, Typography } from "antd";

const CartItem = ({producto}) => {
    const {nombre, valor, precio, total, imagen} = producto;

    return (
      <div>
        <Card
          style={{
            width: 300,
          }}
        >   
            <img src={imagen} />
            <Typography.Title level={5}>{nombre}</Typography.Title>
            <div> S/ {precio.toFixed(2)}</div>
            <div>{valor} {
                valor > 1 ? "unidades" : "unidad"
            }</div>
        </Card>
      </div>
    );
}
 
export default CartItem;