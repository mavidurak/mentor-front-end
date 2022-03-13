import { useRoutes } from "react-router-dom"
import routes from "./routes/routes";
import "./helpers/axios"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "./styles/theme";
import { Box } from "./elements"
import { useState, createContext } from "react";
import { GlobalStyle } from "./styles/globalStyles";
import UserProvider from "./helpers/UserProvider";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;
  const routing = useRoutes(routes)
  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <UserProvider>
          <GlobalStyle />
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
        </UserProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
