
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { TutorialProvider } from "./contexts/TutorialContext";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import { GlobalQuestMarker } from "./components/ui/QuestMarker";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader";
import WeatherEffects from "./components/WeatherEffects";

const queryClient = new QueryClient();

const AppContent = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        <BrowserRouter>
          <ScrollToTop />

          <div className="relative w-full z-0">
            {/* Fixed Atmospheric Background covering all sections realistically */}
            <div className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-b from-sky-400 via-sky-200 to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-[30000ms] ease-in-out" />

            <div className={`min-h-screen w-full relative bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-[30000ms] ease-in-out ${loading ? 'h-screen overflow-hidden' : ''}`}>
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
                <WeatherEffects />
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TutorialProvider>
          <GlobalQuestMarker />
          <AppContent />
        </TutorialProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
