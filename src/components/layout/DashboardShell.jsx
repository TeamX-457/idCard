import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardShell({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <Topbar />
        <main className="px-4 py-6 md:ml-64 md:pt-24 lg:px-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
