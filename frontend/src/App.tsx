
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CustomCursor />
          <BrowserRouter>
            <ScrollToTop />
            <div className={`min-h-screen w-full relative bg-gradient-to-b from-sky-50 via-sky-100 to-sky-300 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 text-slate-900 dark:text-slate-100 transition-colors duration-700 ${loading ? 'h-screen overflow-hidden' : ''}`}>
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999]"
                  >
                    <Preloader onComplete={() => setLoading(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="relative z-10">
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
