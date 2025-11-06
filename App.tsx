
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TextInputForm } from './components/TextInputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { analyzeArabicText } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('السماءُ صافيةٌ');
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (text: string) => {
    if (!text.trim()) {
      setError('الرجاء إدخال جملة لإعرابها.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const analysisResults = await analyzeArabicText(text);
      setResults(analysisResults);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء محاولة تحليل النص. قد تكون واجهة برمجة التطبيقات غير متاحة. يرجى المحاولة مرة أخرى لاحقًا.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200">
          <p className="text-center text-slate-600 mb-6 text-lg">
            أدخل جملة عربية في المربع أدناه لتحليلها إعرابيًا باستخدام الذكاء الاصطناعي.
          </p>
          <TextInputForm
            initialText={inputText}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onTextChange={setInputText}
          />
          <ResultsDisplay 
            isLoading={isLoading}
            error={error}
            results={results}
          />
        </div>
        <footer className="text-center mt-8 text-slate-500">
            <p>مدعوم بواسطة Gemini API</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
