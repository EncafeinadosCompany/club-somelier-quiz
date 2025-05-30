import App from "@/App";
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";
import { HomeView } from "@/views/HomeView";
import { QuestionsView } from "@/views/QuestionsView";
import { NotFound } from "@/common/utils/404";
import Navbar from "@/common/widgets/admin/nav_widget";
import HomeCuestion from "@/views/cuestions-view";
import { QuizLoader } from "@/common/atoms/QuizLoader";
import { useAppLoading } from "@/common/hooks/useAppLoading";
import { Suspense } from "react";
import QuestionnaireDetailPage from "@/views/questionnaire-details.page";
import EventView from "@/views/events-view";
import HomeQuestionsView from "@/views/questions-view";
import { WaitingViewTest } from "@/views/waiting-room.test.view";
import QuestionnaireFormView from "@/common/widgets/admin/quetionnaire/form-quetionnaire.widgest";
import QuestionnaireEditContainer from "@/views/questionnaire.view";
import AdminControlView from "@/views/admin-control.view";
import LoginPage from "@/views/login-view";



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
                        <Route path="404" element={<NotFound />} />

                        <Route index element={<HomeView />} />
        <Route path="client" element={<HomeView />} />
                        <Route path="waiting" element={<WaitingViewTest />} />
                        <Route path="questions" element={<QuestionsView />} />

                        {/* LOGIN */}
                        <Route path="login" element={<LoginPage />} />

                        
                        {/* <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}> */}
                        <Route path="admin" element={<Navbar />}>
                            <Route index element={<HomeCuestion />} />
                            <Route path="event" element={<EventView />} />
                            <Route path="questions" element={<HomeQuestionsView />} />
                            <Route path="questionnaireDetails" element={<QuestionnaireDetailPage />} />
                            <Route path="questionnaire/create" element={<QuestionnaireFormView />} />
                            <Route path="questionnaire/edit/:id" element={<QuestionnaireEditContainer />} />
                            <Route path="control" element={<AdminControlView />} />

                        </Route>
                        {/* </Route> */}
                    </Route>

                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </Suspense>
        </Router>
    );
}