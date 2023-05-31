import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ProtectedRoute } from "./components/routes/protected-route"
import { AuthLayout } from "./layouts/auth-layout"
import Layout from "./layouts/layout"
import LoginPage from "./pages/login/page"
import RegisterPage from "./pages/register/page"
import ServersPage from "./pages/servers/page"
import { Toaster } from "./providers/toast-provider"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/servers"
              element={
                <ProtectedRoute>
                  <ServersPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
    <Toaster />
  </React.StrictMode>
)
