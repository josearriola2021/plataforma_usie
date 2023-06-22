import { Collapse } from 'antd';
import { Checkbox } from 'antd';
import { useState, useEffect } from 'react';
const CheckboxGroup = Checkbox.Group;
const { Panel } = Collapse;

const CategoriaTemplate = ({
  setEstadoCategoria,
  setActiveBuscador,
  setCheckedList,
  checkedList,
  data,
}) => {

    const onChange = (e) => {
      setCheckedList(e); //Permite checkear el valor seleccionado
      setActiveBuscador(false); //Para renderizar en Tienda.js lo seleccionado en categorias
      setEstadoCategoria(e); //Asigna a estado categoria la lista de checkbox seleccionados, y por ende filtrar en Tienda.jsx
      e.length == 0
        ? setActiveBuscador(true)
        : console.log("Existen categorias seleccionadas");
    };

    let i = 1; //Para darle un key al Panel

  return (
    <Collapse accordion ghost>
      {data.categorias?.map((element) => {
        const { nombre } = element;
        i += 1;
        return (
          <Panel header={nombre} key={i}>
            <div className="flex flex-col">
              <CheckboxGroup
                options={element["subcategorias"]}
                value={checkedList}
                onChange={onChange}
                style={{ display: "flex", flexDirection: "column" }}
              />
            </div>
          </Panel>
        );
      })}
    </Collapse>
  );
};
 
export default CategoriaTemplate;