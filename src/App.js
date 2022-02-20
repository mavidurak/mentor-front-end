import { useRoutes } from "react-router-dom"
import routes from "./routes/routes";
import "./helpers/axios"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routing = useRoutes(routes)
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {routing}

    </div>
  );
}

export default App;
