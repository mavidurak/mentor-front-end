import { useRoutes } from "react-router-dom"
import routes from "./routes/routes";
import "./helpers/axios"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from "styled-components"
import {theme }from "./styles/theme";
import {Box} from "./elements"

function App() {
  const routing = useRoutes(routes)
  return (
    <ThemeProvider theme={theme}>
      <Box minHeight="100vh">
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
      </Box>
    </ThemeProvider>
  );
}

export default App;
