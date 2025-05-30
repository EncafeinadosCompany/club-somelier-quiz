import App from "@/App";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import RoleRoute from "./roleRoute";
import { ROLES } from "@/common/utils/Roles";
import { HomeView } from "@/views/HomeView";
import { QuestionsView } from "@/views/QuestionsView";
import { WaitingView } from "@/views/WaitingView";
import { NotFound } from "@/common/utils/404";
import Navbar from "@/common/widgets/nav_widget";
import HomeCuestion from "@/views/cuestions-view";
import { QuizLoader } from "@/common/atoms/QuizLoader";
import { useAppLoading } from "@/common/hooks/useAppLoading";
import { Suspense } from "react";
import QuestionnaireDetailPage from "@/views/questionnaire-details.page";
import EventView  from "@/views/events-view";
import AnimatedBackground from "@/common/atoms/animated-background";

function AppWithLoading() {
    const { isLoading } = useAppLoading(3000);

    if (isLoading) {
        return <QuizLoader />;
    }

    return <App />;
}

function SuspenseLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
            <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[var(--text-secondary)]">Cargando...</span>
            </div>
        </div>
    );
}

export default function AuthRoutes() {
    return (
        <Router>
            <Suspense fallback={<SuspenseLoader />}>
                <Routes>
                    <Route path="/" element={<AppWithLoading />}>
                        <Route path="404" element={<AnimatedBackground />} />
                        
                        <Route index element={<HomeView />} />             
                        <Route path="client/:questionnaireId" element={<HomeView />} />                        
                        <Route path="waiting" element={<WaitingView />} />
                        <Route path="questions" element={<QuestionsView />} />   
                        {/* <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}> */}
                            <Route path="admin" element={<Navbar />}>
                                <Route index element={<HomeCuestion />} />
                                 <Route path="event" element={<EventView />} />
                                <Route path="questionnaireDetails" element={<QuestionnaireDetailPage />} />
                                 
                            </Route>
                        {/* </Route> */}
                    </Route>

                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </Suspense>
        </Router>
    );
}