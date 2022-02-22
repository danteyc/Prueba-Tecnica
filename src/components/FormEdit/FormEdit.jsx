import { Select, Input, Form,Button,Divider } from "antd";
const { Option } = Select;
const { TextArea } = Input;

export function FormEdit({fila,closeModal,edit}){

      const onFinish = (values) => {
        edit(fila.id,values);
        closeModal();
      };
      const onFinishFailed = () => {
        console.log("Formulario error");
      };
    return(
        <Form 
        layout="vertical"
        onFinish={onFinish} 
        onFinishFailed={onFinishFailed}
        initialValues={fila}
        >
        <Form.Item label="Nombre del Proyecto" name="name">
          <Input
            maxLength={20}
            disabled
          />
        </Form.Item>
        <Form.Item label="ID del proyecto" name="idProject">
          <Input
            maxLength={8}
            disabled
          />
        </Form.Item>
        <Form.Item label="Descripción" name="description">
          <TextArea
            placeholder="Descripción"
            autoSize={{ minRows: 5, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item
          label="Ubicación"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input
            maxLength={20}
          />
        </Form.Item>
        <Form.Item
          label="Estado"
          name="state"
          rules={[
            {
              required: true,
              message: "Selecciona el estado",
            },
          ]}
        >
          <Select
          >
            <Option value="En Proceso">En Proceso</Option>
            <Option value="Finalizado">Finalizado</Option>
          </Select>
        </Form.Item>
        <Divider />
        <div className="buttons-form">
            <Button onClick={closeModal} style={{marginRight:15}}>Cancelar</Button>
            <Button htmlType="submit" type="primary">
            Guardar
            </Button>
      </div>
      </Form>
    )
}