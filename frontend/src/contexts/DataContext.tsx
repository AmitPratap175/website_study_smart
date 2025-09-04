import React, { createContext, useContext, useState, useEffect } from 'react';

interface Question {
  qid: string;
  question_text: string;
  passage_text?: string;
  options: Array<{
    data_option: string;
    label: string;
    option_text: string;
    is_correct: boolean;
  }>;
  correct_option_data: string;
  solution_text?: string;
  image_url?: string;
  full_markdown: string;
}

interface UserProgress {
  answered: Record<string, string>;
  completed: string[];
  scores: Record<string, number>;
  totalQuestions: number;
  correctAnswers: number;
}

interface DataContextType {
  questions: Record<string, Question[]>;
  userProgress: UserProgress;
  updateAnswer: (questionId: string, answer: string) => void;
  markComplete: (questionId: string) => void;
  getQuestionsBySubject: (subject: string) => Question[];
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

// Simulated API calls
const fetchQuestionsData = async (): Promise<Record<string, Question[]>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const subjects = ['quant', 'varc', 'dilr', 'essay', 'decision-making'];
  const data: Record<string, Question[]> = {};
  
  for (const subject of subjects) {
    try {
      const response = await fetch(`/data/final_${subject}.json`);
      const json = await response.json();
      data[subject] = json.questions || [];
    } catch (error) {
      console.error(`Failed to load ${subject} data:`, error);
      data[subject] = [];
    }
  }
  
  return data;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Record<string, Question[]>>({});
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : {
      answered: {},
      completed: [],
      scores: {},
      totalQuestions: 0,
      correctAnswers: 0
    };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestionsData()
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch questions:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const updateAnswer = (questionId: string, answer: string) => {
    setUserProgress(prev => ({
      ...prev,
      answered: { ...prev.answered, [questionId]: answer }
    }));
  };

  const markComplete = (questionId: string) => {
    setUserProgress(prev => ({
      ...prev,
      completed: [...prev.completed.filter(id => id !== questionId), questionId]
    }));
  };

  const getQuestionsBySubject = (subject: string): Question[] => {
    return questions[subject] || [];
  };

  return (
    <DataContext.Provider value={{
      questions,
      userProgress,
      updateAnswer,
      markComplete,
      getQuestionsBySubject,
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
};