import React from "react";
import { Table, Divider, Button, Select, Input, Modal,message } from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";
import "./TableData.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormAdd } from "../FormAdd/FormAdd";
import { getColor, tableColumn } from "../../utils";
import { RowAction } from "../RowAction/RowAction";

const { Option } = Select;

export function TableData() {
  const baseURL = "http://localhost:3000/data";
  const [data, setData] = useState([]);
  const [typeFilter,setTypeFilter] = useState({});
  const [modalAdd, setModalAdd] = useState(false);

  const opencloseModalAdd = (e) => {
    setModalAdd(!modalAdd);
  };

  const columns = [
    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      align:"center",
      render: (text) => (
        <span style={{ color: getColor(text) }}>{text}</span>
      ),
    },
    {
      title: "Acción",
      key: "action",
      align:"center",
      render: (fila) => (
        <RowAction fila={fila} editData={editData} deleteData={deleteData}/>
      ),
    },
  ];


  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setTypeFilter({type:"search",value})
  };

  function handleChange(value) {
    setTypeFilter({type:"filter",value})
  }

  const Header = () => (
    <React.Fragment>
      <h3>Lista de Proyectos</h3>
      <Divider />
      <div className="table-options">
        <Select
          className="table-options_inpt table-select"
          size="large"
          placeholder="Proyecto"
          style={{ width: 190 }}
          onChange={handleChange}
        >
          <Option value="">
            Todos
          </Option>
          {data.map((project, k) => (
            <Option key={k} value={project.name}>
              {project.name}
            </Option>
          ))}
        </Select>
        <Input
          className="table-options_inpt table-inpt"
          size="large"
          suffix={<SearchOutlined style={{ color: "#E5E5E5" }} />}
          style={{ width: 190 }}
          onChange={handleSearch}
        />
        <Button
          className="table-options_inpt table-btn-search"
          size="large"
          type="primary"
          style={{ backgroundColor: "#0096BB", borderColor: "#0096BB" }}
        >
          Buscar
        </Button>
        <Button
          className="table-options_inpt"
          size="large"
          type="primary"
          style={{ backgroundColor: "#79BE21", borderColor: "#79BE21" }}
          onClick={opencloseModalAdd}
        >
          Añadir Proyecto
        </Button>
      </div>
    </React.Fragment>
  );

  const getData = async () => {
    await axios.get(baseURL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const postData = async (value) => {
    await axios.post(baseURL, value)
      .then((response) => {
        setData(data.concat(response.data));
        opencloseModalAdd();
        (() => message.success('Agregado satisfactoriamente'))();
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editData = async (id,value) => {
    await axios.put(`${baseURL}/${id}`,value)
      .then((response) => {
        setData(
          data.map((element) => {
            return element.id === id ? { ...response.data } : element;
          })
        );
        (() => message.success('Editado satisfactoriamente'))();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteData = async (id) => {
    await axios.delete(`${baseURL}/${id}`)
      .then((response) => {
        setData(data.filter((elemento) => elemento.id !== id));
        (() => message.success('Eliminado correctamente'))();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const dataFilter = ({ type, value})=>{
    switch(true){
      case type === "filter":
        return value ? data.filter((d)=> d.name === value) : data;
      case type === "search":
        return data.filter((element) => value ? element.name.toLowerCase().includes(value) : data);
      default:
        return data;
    }
  }
  return (
    <React.Fragment>
      <Table
        className="table"
        dataSource={dataFilter(typeFilter)}
        columns={[...tableColumn,...columns]}
        pagination={{ pageSize: 7 }}
        rowKey="id"
        title={Header}
      />
      <Modal
        visible={modalAdd}
        title="Nuevo Proyecto"
        destroyOnClose={true}
        onCancel={opencloseModalAdd}
        centered
        footer={null}
      >
        <FormAdd closeModal={opencloseModalAdd} post={postData}/>
      </Modal>

    </React.Fragment>
  );
}
