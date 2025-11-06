
import React, { useState } from 'react';

interface TextInputFormProps {
  initialText: string;
  onSubmit: (text: string) => void;
  isLoading: boolean;
  onTextChange: (text: string) => void;
}

export const TextInputForm: React.FC<TextInputFormProps> = ({ initialText, onSubmit, isLoading, onTextChange }) => {

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialText);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label htmlFor="arabic-text" className="sr-only">
          النص العربي
        </label>
        <textarea
          id="arabic-text"
          value={initialText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="مثال: العلمُ نورٌ والجهلُ ظلامٌ..."
          className="w-full h-32 p-4 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 resize-y"
          dir="rtl"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
            <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>جاري الإعراب...</span>
            </>
        ) : (
            <span>أعرب الآن</span>
        )}
      </button>
    </form>
  );
};
