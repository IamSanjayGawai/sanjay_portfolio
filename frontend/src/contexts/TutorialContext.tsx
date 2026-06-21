import { createContext, useContext, useState, ReactNode } from 'react';

export interface TutorialContextType {
  currentMission: number;
  isCompleted: boolean;
  completeMission: (missionId: number) => void;
  resetTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  // Always start at mission 1 on refresh
  const [currentMission, setCurrentMission] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const completeMission = (missionId: number) => {
    if (isCompleted || currentMission !== missionId) return;

    if (missionId >= 5) {
      setIsCompleted(true);
      setCurrentMission(6); // 6 means all done
    } else {
      setCurrentMission(missionId + 1);
    }
  };

  const resetTutorial = () => {
    setCurrentMission(1);
    setIsCompleted(false);
  };

  return (
    <TutorialContext.Provider value={{ currentMission, isCompleted, completeMission, resetTutorial }}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};
