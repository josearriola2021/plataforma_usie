import React, {useState} from 'react';
import { Button, Drawer } from 'antd';
import CategoriaTemplate from '../CategoriaTemplate';

const Categoria = ({setEstadoCategoria, setActiveBuscador, setCheckedList, checkedList, data}) => {

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

    return (
      <>
        <div className="hidden md:block lg:pl-12 sm:pl-3 pl-4">
          <CategoriaTemplate
            setEstadoCategoria={setEstadoCategoria}
            setActiveBuscador={setActiveBuscador}
            setCheckedList={setCheckedList}
            checkedList={checkedList}
            data={data}
          />
        </div>
        <div className="sm: absolute -mt-14 ml-4 w-40 md:hidden">
          <Button size="base" onClick={showDrawer} style={{ width: "150px" }}>
            <i class="bi bi-list"></i>&nbsp;<span>Categorías</span>
          </Button>
        </div>
        <Drawer
          title="Basic Drawer"
          placement="left"
          onClose={onClose}
          visible={visible}
          className="md:hidden"
        >
          <CategoriaTemplate
            setEstadoCategoria={setEstadoCategoria}
            setActiveBuscador={setActiveBuscador}
            setCheckedList={setCheckedList}
            checkedList={checkedList}
            data={data}
          />
        </Drawer>
      </>
    );
}
 
export default Categoria;