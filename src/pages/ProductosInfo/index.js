import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { HeaderProductoInfo, PresentacionProducto} from "../../components";

const ProductosInfo = () => {
    const {nombre, id} = useParams();
    const [data, setData] = useState([]);

    const fetchProductosInfo = async () => {
        const res = await fetch("https://josearriola2021.github.io/USIE/data.json");
        const data = await res.json();
        setData(data);
    }

    useEffect(() => {
        fetchProductosInfo();
    }, []);
   

    return (
      <>
        <HeaderProductoInfo />
        <PresentacionProducto data={data} nombre={nombre} id={id} />
      </>
    );
}
 
export default ProductosInfo;