//aqui ira las rutas

import App from "@/App";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RoleRoute from "./roleRoute";
import { ROLES } from "@/common/utils/Roles";
import { HomeClient } from "@/common/widgets/clients/home_client";

export default function AuthRoutes  ()  {
    return (
            <Router>
                <Routes>
                    {/* PRIVATE ROUTES  */}

                    <Route element={<RoleRoute allowedRoles={[ROLES.CLIENTE]} />}>
                        <Route path="/home" element={<App />}>
                            <Route index element={<HomeClient />} />
                            
                        </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>

            </Router>


  
            )
               
                }