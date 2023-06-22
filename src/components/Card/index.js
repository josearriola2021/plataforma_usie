// import '../json/data.json';
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CarritoComprasContext} from "../../context";
import {Button, InputNumber} from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import "../../index.css";

const Card = ({producto}) => {

  const {id, nombre, imagen, precio} = producto;
  const [size, setSize] = useState('large');
  const [buttonSecondary, setButtonSecondary] = useState(true);
  const [newValorInput, setNewValorInput] = useState(1);

  const {addProducto, capturarValorInput, isIncludeInProductosAgregados, removeProducto, updateProducto} = useContext(CarritoComprasContext);

  //Remueve producto visual y del localStorage mediant el InputNumber
  const onChange = (value) => {
    setNewValorInput(value);
    if (value == 0) {
      value == 0 && setButtonSecondary(true);
      setNewValorInput(1); //Setea el valor del input a 1 luego de ser eliminado
      removeProducto(id);
      return;
    }
    updateProducto(id, value, precio);
  };

  //Borrar producto mediante el icono de delete
  const deleteProducto = () => {
    setButtonSecondary(true);
    setNewValorInput(1); //Setea el valor del input a 1 luego de ser eliminado
    removeProducto(id);
  }

  //Activa el boton secundario y agregar el producto
  const activeButtonSecondary = () => {
    buttonSecondary ? 
    setButtonSecondary(false) : setButtonSecondary(true);
    if (buttonSecondary == true) {
      // setNewValorInput(1);
      addProducto(id, nombre, precio, imagen, buttonSecondary);
      setNewValorInput(1);
    }
  }

  useEffect(() => {
    const estadoProductoSeleccionado = isIncludeInProductosAgregados(id);
    setButtonSecondary(estadoProductoSeleccionado); //Captura el boton al momento de refrescar
    const valorInput = capturarValorInput(id); //Captura el valor del Input al momento de refrescar
    valorInput !== undefined && setNewValorInput(valorInput);
  }, [])

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
        <p className="text-red-500 font-bold text-base">S/. {precio}</p>
        <div className="card-actions justify-end agregar-button">
          {buttonSecondary ? (
            <Button
              type="primary"
              shape="round"
              size={size}
              onClick={activeButtonSecondary}
            >
              Agregar
            </Button>
          ) : (
            <Button
              type="primary"
              shape="round"
              size={size}
            >
              <div className="flex justify-center items-center gap-2">
                <DeleteOutlined style={{fontSize:"20px"}} onClick={deleteProducto}/>
                <InputNumber min={0} max={100} defaultValue={1} value={newValorInput} onChange={onChange}/>
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
    
}
 
export default Card;