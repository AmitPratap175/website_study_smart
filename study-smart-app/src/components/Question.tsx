import React from 'react';
import { Question, Option } from '../types';

interface QuestionProps {
  question: Question;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg mb-4">
      <p className="text-gray-600 mb-2">{question.passage_text}</p>
      <h3 className="text-lg font-semibold mb-4">{question.question_text}</h3>
      <div className="space-y-2">
        {question.options.map((option) => (
          <div key={option.data_option} className="flex items-center">
            <input
              type="radio"
              name={question.qid}
              id={`${question.qid}-${option.data_option}`}
              className="mr-2"
            />
            <label htmlFor={`${question.qid}-${option.data_option}`}>
              {option.label}. {option.option_text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
