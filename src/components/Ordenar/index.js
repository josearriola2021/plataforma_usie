import { Select } from 'antd';
const { Option } = Select;


const Ordenar = ({setEstadoOrdenar}) => {

  const handleChange = (value) => {
    setEstadoOrdenar(value);
  };

    return (
        <div className='flex justify-end lg:px-12 sm:px-2 px-4 py-3'>
            <Select
                defaultValue="Ordenar por"
                style={{
                  width: 200,
                }}
                onChange={handleChange}
            >
                <Option value="Precio alto">Avance, decreciente</Option>
                <Option value="Precio bajo">Avance, creciente</Option>
                <Option value="Nombre creciente">Nombre, creciente</Option>
                <Option value="Nombre decreciente">Nombre, decreciente</Option>
            </Select>
        </div>
      );
}
 
export default Ordenar;