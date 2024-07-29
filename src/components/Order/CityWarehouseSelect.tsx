import { useRef, useEffect, useState } from 'react';
import { NpCitySelect, NpWarehouseSelect, utils } from 'np-select';
import './OrderForm.scss';
const CityWarehouseSelect = ({ onSelectCity, onSelectWarehouse }: any) => {
  const cityRef = useRef(null);
  const warehouseRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    let warehouseSelect: any;

    if (cityRef.current) {
      NpCitySelect({
        apiKey: 'ecc59edd4f62784d05d24fcdd8eec7f7',
        input: {
          name: 'city',
          placeholder: 'місто',
        },
        button: {
          text: 'Введіть назву населеного пункту',
        },
        root: cityRef.current,

        onSelect: async (item, select) => {
          const warehouses = await select.api.getNpWarehouses(item.value);
          warehouseSelect.setOptions(warehouses);
          warehouseSelect.setDisabled(false);
          warehouseSelect.setOpen(true);
          setSelectedCity(item.value);
          onSelectCity(item.value);
        },
      });
    }

    if (warehouseRef.current) {
      warehouseSelect = NpWarehouseSelect({
        apiKey: 'ecc59edd4f62784d05d24fcdd8eec7f7',
        input: {
          name: 'відділення',
        },
        button: {
          text: 'Введіть назву відділення',
        },
        root: warehouseRef.current,
        onMounted: (select) => select.setDisabled(true),
        onSelect: (item) => {
          onSelectWarehouse(item.value);
        },
      });
    }
  }, [onSelectCity, onSelectWarehouse]);

  return (
    <div className="np-container">
      <p>Місто*</p>
      <div ref={cityRef} className="np-city"></div>
      <p>Відділення*</p>
      <div ref={warehouseRef} className="np-warehouse"></div>
    </div>
  );
};

export default CityWarehouseSelect;
