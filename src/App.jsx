import "./index.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DynamicBreadcrumb from "./components/DynamicBreadcrumb";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/Home/HomePage";
import HeaderComponent from "./components/navigation/HeaderComponent";
import ProtectedRoute from "./middleware/protectedRoute";
import { Layout } from "antd";
import { useGlobalContext } from "./hooks/context/useGlobalContext";

function ProtectedLayout() {
  const { isMobile } = useGlobalContext();

  return (
    <Layout className="h-screen flex flex-col">
      <Layout className="flex flex-1">
        <HeaderComponent />
        <Layout.Content
          className={`px-[1.6rem] py-6 w-full overflow-auto ${
            isMobile ? "rounded-4xl" : "rounded-tl-4xl"
          } bg-white`}
        >
          <DynamicBreadcrumb />
          <Outlet /> {/* <-- ini tempat munculnya HomePage */}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Halaman publik */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Halaman privat */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* Tambahkan lebih banyak route private di sini jika perlu */}
        </Route>
      </Route>

      {/* Fallback ke login jika route tidak cocok */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
