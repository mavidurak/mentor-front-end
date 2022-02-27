import Sidebar from "../../components/core/Sidebar/Sidebar"
import { SLayout, SMain } from "./styles";

const MainLayout = ({children, header, sidebar, footer}) => {
  return (
        <SLayout>
            <Sidebar />
            <SMain>{children}</SMain>
        </SLayout>
  )
}

export default MainLayout