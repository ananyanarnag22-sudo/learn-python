import { ReactNode } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}