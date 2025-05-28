//aqui ira las rutas

import App from "@/App";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RoleRoute from "./roleRoute";
import { ROLES } from "@/common/utils/Roles";
import { HomeClient } from "@/common/widgets/clients/home_client";
import { HomeView } from "@/views/HomeView";
import { QuestionsView } from "@/views/QuestionsView";
import { NotFound } from "@/common/utils/404";
import HomeAdmin from "@/common/widgets/admin/home_admin.widget";
import Navbar from "@/common/widgets/nav_widget";

export default function AuthRoutes() {
    return (
        <Router>
            <Routes>
                {/* PRIVATE ROUTES  */}

                <Route path="/" element={<App />}>
                    <Route path="/404" element={<NotFound />} />
                    <Route element={<RoleRoute allowedRoles={[ROLES.CLIENTE]} />}>
                    <Route path="/client">
                        <Route index element={<HomeView />} />
                    </Route>
                    <Route path="/Questions">
                        <Route index element={<QuestionsView />} />
                    </Route>
                    </Route>
                    <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
                    <Route path="/admin" element={<Navbar/>}>
                        <Route index element={<HomeAdmin />} />
                    </Route>
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>

        </Router>



    )

}