import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Flame, NotebookPen, Trophy, MessageCircle } from "lucide-react";
import { useStore } from "../lib/store";
import Welcome from "./Welcome";
import Toaster from "./Toaster";

const TABS = [
  { to: "/", label: "Today", icon: Flame, end: true },
  { to: "/moments", label: "Moments", icon: NotebookPen },
  { to: "/journey", label: "Journey", icon: Trophy },
  { to: "/community", label: "Community", icon: MessageCircle },
];

export default function AppShell() {
  const { onboarded } = useStore();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="shell">
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />

      <main className="page">
        <Outlet />
      </main>

      <nav className="tabbar" aria-label="Main">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="tab">
            <Icon size={22} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <Toaster />
      {!onboarded && <Welcome />}
    </div>
  );
}
