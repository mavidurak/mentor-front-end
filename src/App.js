import {  useRoutes } from "react-router-dom"
import routes from "./routes/routes";
import "./helpers/axios"

function App() {
  const routing = useRoutes(routes)
  return (
    <div>
      {routing}
    </div>
  );
}

export default App;
