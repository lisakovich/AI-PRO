import React from 'react';

export default function App() {
  const currentView = { id: 'home' }; 

  return (
    <div className="min-h-screen bg-premium-dark text-gray-200 font-sans">
      <main className="pt-20">
        {currentView.id === 'home' && (
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-lg mx-auto py-8">
              {/* Здесь пусто для чистого дизайна */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}