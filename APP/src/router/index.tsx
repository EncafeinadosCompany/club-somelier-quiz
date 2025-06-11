import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QuizLoader } from "@/common/atoms/QuizLoader";
import { useAppLoading } from "@/common/hooks/useAppLoading";
import PrivateRoute from "./token-route";
import App from "@/App";

// Lazy loaded components
const NotFoundPage = lazy(() => import("@/common/utils/404"));
const Navbar = lazy(() => import("@/common/widgets/admin/nav_widget"));
const QuestionsView = lazy(() => import("@/views/clients/question/questions-client.view"));
const HomeCuestion = lazy(() => import("@/views/admin/questionnaire/questionnaire-view"));
const QuestionnaireDetailPage = lazy(() => import("@/views/admin/questionnaire/questionnaire-details.view"));
const EventView = lazy(() => import("@/views/admin/event/events-view"));
const HomeQuestionsView = lazy(() => import("@/views/admin/question/questions-view"));
const WaitingViewTest = lazy(() => import("@/views/clients/question/waiting-room.test.view"));
const QuestionnaireFormView = lazy(() => import("@/common/widgets/admin/quetionnaire/form-quetionnaire.widgest"));
const QuestionnaireEditContainer = lazy(() => import("@/views/admin/questionnaire/questionnaire-edit.view"));
const AdminControlView = lazy(() => import("@/views/admin/questionnaire/questionnaire-control.view"));
const LoginPage = lazy(() => import("@/views/home/login-view"));
const LandingPage = lazy(() => import("@/views/home/landing-view"));
const ContactPage = lazy(() => import("@/views/home/contact-view"));
const HomeView = lazy(() => import("@/views/home/home-view"));

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
                        <Route path="404" element={<NotFoundPage />} />
                        <Route element={<HomeView />} />
                        <Route path="client" element={<HomeView />} />
                        <Route path="waiting" element={<WaitingViewTest />} />
                        <Route path="questions" element={<QuestionsView />} />

                        {/* RUTA LANDING AGREGADA */}
                        <Route index element={<LandingPage />} />
                        <Route path="contact" element={<ContactPage />} />

                        {/* LOGIN */}
                        <Route path="login" element={<LoginPage />} />
                        <Route element={<PrivateRoute/>}>
                            <Route path="admin" element={<Navbar />}>
                                <Route index element={<HomeCuestion />} />
                                <Route path="event" element={<EventView />} />
                                <Route path="questions" element={<HomeQuestionsView />} />
                                <Route path="questionnaireDetails" element={<QuestionnaireDetailPage />} />
                                <Route path="questionnaire/create" element={<QuestionnaireFormView />} />
                                <Route path="questionnaire/edit/:id" element={<QuestionnaireEditContainer />} />
                                <Route path="control" element={<AdminControlView />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </Suspense>
        </Router>
    );
}