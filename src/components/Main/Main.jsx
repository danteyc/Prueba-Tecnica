import { TableData } from "../TableData/TableData";
import "./Main.scss";

export function Main() {
  return (
    <main>
      <div className="container cnt-main">
        <h1>Proyectos</h1>
        <a className="nav-title" href="/">Inicio <span className="link"> > Proyectos</span></a>
        <div className="table">
          <TableData />
        </div>
      </div>
    </main>
  );
}
