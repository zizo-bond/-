
import React from 'react';
import type { AnalysisResult } from '../types';

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  results: AnalysisResult[] | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-16 h-16 border-4 border-cyan-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700" role="alert">
    <p className="font-bold">خطأ</p>
    <p>{message}</p>
  </div>
);

const ResultsTable: React.FC<{ results: AnalysisResult[] }> = ({ results }) => (
  <div className="mt-6 overflow-hidden border border-slate-200 rounded-lg">
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-100">
        <tr>
          <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider w-1/4">
            الكلمة
          </th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">
            الإعراب
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {results.map((result, index) => (
          <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
            <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold text-cyan-800">{result.word}</td>
            <td className="px-6 py-4 whitespace-normal text-md text-slate-700">{result.analysis}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InitialStateMessage: React.FC = () => (
    <div className="text-center py-10 text-slate-400">
        <p>ستظهر نتائج الإعراب هنا.</p>
    </div>
);


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, error, results }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  if (results) {
    return <ResultsTable results={results} />;
  }
  return <InitialStateMessage />;
};
