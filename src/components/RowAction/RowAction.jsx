import { FormEdit } from "../FormEdit/FormEdit";
import React from "react";
import { Divider, Button, Modal } from "antd";
import "./RowAction.scss"
import {
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useState } from "react";

export function RowAction({fila,editData,deleteData}) {
  const [showModal,setShowModal] = useState({});
  const selectProject = (project, action) => {
    setShowModal({type:action,project});
  };
  const deleteProject= (e)=>{
    deleteData(fila.id);
  }
  const closeModal= (e)=>{
    setShowModal({});
  }
  return (
    <React.Fragment>
      <EditOutlined
        className="icon icon-edit"
        onClick={() => selectProject(fila, "Edit")}
      />
      <Divider className="divider" type="vertical" />
      <DeleteOutlined
        className="icon icon-delete"
        onClick={() => selectProject(fila, "Delete")}
      />
            <Modal
        visible={showModal.type==="Edit"}
        title="Editar Proyecto"
        onCancel={closeModal}
        centered
        footer={null}
      >
        <FormEdit fila={fila} project={showModal.project} closeModal={closeModal} edit={editData} />
      </Modal>

      <Modal
        visible={showModal.type==="Delete"}
        onCancel={closeModal}
        centered
        footer={[
          <Button key="cancel" onClick={closeModal}>No</Button>,
          <Button key="delete" type="primary" danger onClick={deleteProject}>
            Sí
          </Button>,
        ]}
      >
        Estás seguro que deseas eliminar el proyecto{" "}
        <b>{showModal.project && showModal.project.name}</b>?
      </Modal>
    </React.Fragment>
  );
}
