import { Outlet } from "react-router-dom";

import { Footer } from "../Footer";
import { Header } from "../Header";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#071a2f]">
      <Header />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
