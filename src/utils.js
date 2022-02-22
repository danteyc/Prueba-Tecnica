export const tableColumn = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Id.",
    dataIndex: "idProject",
    key: "idProject",
    responsive: ['md']
  },
  {
    title: "Descripción",
    dataIndex: "description",
    key: "description",
    width: 400,
    responsive: ['lg'],
  },
  {
    title: "Ubicación",
    dataIndex: "location",
    key: "location",
    align:"center",
  },
];

export const getColor = (text) =>{
  if (text === "Finalizado") {
    return "#FF2E00";
  } else{
    return "#79BE21";
  }
}