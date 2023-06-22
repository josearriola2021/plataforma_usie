import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CarritoComprasContext = createContext();

export const CarritoComprasProvider = ({children}) => {

    //Captura los productos guardados en el local Storage cuando refrezco mi navegador
    const agregados = JSON.parse(localStorage.getItem("carritoCompras")) || [];
    const [productosAgregados, setProductosAgregados] = useState(agregados);
    const [productosOfUser, setProductosOfUser] = useState(agregados);
    const [totalProductos, setTotalProductos] = useState(0); //Para el contador del header
    const [sumaProductos, setSumaProductos] = useState(0); //Para del contador del header

    const {userAuth} = useContext(AuthContext);

    //para poder guardar el producto agregado en el carrito de compras
    /**
     * id del producto
     * fecha en la que agregué el producto
     */

     const saveInLocalStorage = (productosAgregados) => {
        localStorage.setItem("carritoCompras", JSON.stringify(productosAgregados))
    }

    const contador = (productosAgregados) => {
        const productosUser = productosAgregados.filter(producto => producto.user === userAuth);
        const contadorCantidadProductos = productosUser.map(producto =>producto.valor).reduce((a,b) => a+b,0);
        const contadorPrecioProductos = productosUser.map(producto => producto.total).reduce((a,b) => a+b,0);
        setTotalProductos(contadorCantidadProductos);
        setSumaProductos(contadorPrecioProductos.toFixed(2));
        setProductosOfUser(productosUser); //Actualiza los productos por usuario
    }

    const addProducto = (id, nombre, precio, imagen, buttonSecondary) => {
      const valor=1;
      const productoAgregado = {
        id,
        user: userAuth,
        imagen: imagen,
        created_add: new Date(),
        nombre,
        precio,
        valor: valor,
        total: precio * valor,
      };
      // if (buttonSecondary == true) {
      //   const indexNewProducto = productosAgregados.findIndex(
      //     (producto) => producto.id === id
      //   );
      //   productosAgregados[indexNewProducto] = {
      //     ...productosAgregados[indexNewProducto],
      //     valor: 1,
      //   };
      // }
      if (productosAgregados.length === 0) {
        setProductosAgregados([productoAgregado]);
        saveInLocalStorage([productoAgregado]);
        contador([productoAgregado]);
        return;
      }
      productosAgregados[productosAgregados.length] = productoAgregado;
      setProductosAgregados(productosAgregados);
      saveInLocalStorage(productosAgregados);
      contador(productosAgregados);
    };

    const updateProducto = (id, newValue, precio) => {
      const indexNewProducto = productosAgregados.findIndex(
        (producto) => producto.id === id && producto.user === userAuth
      );
      productosAgregados[indexNewProducto] = {
        ...productosAgregados[indexNewProducto],
        valor: newValue,
        total: precio * newValue
      };
      setProductosAgregados(productosAgregados);
      saveInLocalStorage(productosAgregados);
      contador(productosAgregados);
    };

    const removeProducto = (id) => {
      const indexNewProductoRemoved = productosAgregados.findIndex(producto => producto.id === id && producto.user === userAuth);
      productosAgregados.splice(indexNewProductoRemoved, 1);
        // const newProductosAgregados = productosAgregados.filter((producto) => producto.id !==id );
        setProductosAgregados(productosAgregados);
        saveInLocalStorage(productosAgregados);
        contador(productosAgregados);
    }

    const isIncludeInProductosAgregados = (id) => {
        const producto = productosAgregados.findIndex((producto) => producto.id === id && producto.user === userAuth);
        return producto === -1 ? true : false;
    }

    const capturarValorInput = (id) => {
        const indexNewProducto = productosAgregados.findIndex((producto) => producto.id === id);
        if (indexNewProducto !== -1) {
            const valorInput = productosAgregados[indexNewProducto].valor;
            return valorInput; 
        }
    }

    return (
        <CarritoComprasContext.Provider value={{productosAgregados, productosOfUser, addProducto, capturarValorInput, contador, isIncludeInProductosAgregados, removeProducto, sumaProductos, totalProductos, updateProducto}}>
            {children}
        </CarritoComprasContext.Provider>
    );
};
 