import React, { Suspense, lazy } from "react";
import { io } from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoaderLayout from "./components/layout/LoaderLayout";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/Admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/Admin/MessageManagement"));

let user = true;

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoaderLayout />}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="admin" element={<AdminLogin />} />
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/messages" element={<MessageManagement />} />
          <Route path="admin/chats" element={<ChatManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
