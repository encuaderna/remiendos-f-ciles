import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import SideNav from "@/components/SideNav";
import MobileHeader from "@/components/MobileHeader";
import { useLocalStorage } from "@/lib/useLocalStorage";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: "easeIn" } },
};

export default function AppLayout() {
  const [darkPref, setDarkPref] = useLocalStorage("remiendos-dark", "system");
  const location = useLocation();

  useEffect(() => {
    if (darkPref === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = (e) => document.documentElement.classList.toggle("dark", e.matches);
      apply(mq);
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    } else {
      document.documentElement.classList.toggle("dark", darkPref === "dark");
    }
  }, [darkPref]);

  // Legacy boolean support
  const isDark = darkPref === "dark" || (darkPref === true);
  const setDark = (val) => {
    if (typeof val === "function") {
      setDarkPref((prev) => {
        const prevBool = prev === "dark" || prev === true;
        return val(prevBool) ? "dark" : "light";
      });
    } else {
      setDarkPref(val ? "dark" : "light");
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      <SideNav dark={isDark} setDark={setDark} />
      <MobileHeader dark={isDark} setDark={setDark} />
      <main className="md:ml-56 lg:ml-64 pb-24 md:pb-8">
        <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}