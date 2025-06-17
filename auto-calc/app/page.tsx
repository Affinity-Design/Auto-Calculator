'use client';

import { useState, useCallback } from 'react';
import DealershipForm, { FormData } from './components/DealershipForm';
import BreakEvenResults from './components/BreakEvenResults';
import AdSpendResults from './components/AdSpendResults';
import ScenarioGrid from './components/ScenarioGrid';
import { calcBreakEven, calcFromAdSpend, BreakEvenResult, AdSpendResult } from './lib/calc';

export default function Home() {
  const [breakEvenResult, setBreakEvenResult] = useState<BreakEvenResult | null>(null);
  const [adSpendResult, setAdSpendResult] = useState<AdSpendResult | null>(null);
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

  const handleFormChange = useCallback((data: FormData) => {
    try {
      setCurrentFormData(data);
      
      // Validate inputs before calculation
      if (!data.avgProfitPerSale || !data.bookedTestDriveCost || !data.closeRate || !data.adSpendBudget) {
        return;
      }

      // Calculate break-even analysis
      const breakEvenCalc = calcBreakEven({
        P: data.avgProfitPerSale,
        Cl: data.bookedTestDriveCost,
        r: data.closeRate / 100, // Convert percentage to decimal
      });
      setBreakEvenResult(breakEvenCalc);

      // Calculate ad spend projection
      const adSpendCalc = calcFromAdSpend({
        P: data.avgProfitPerSale,
        Cl: data.bookedTestDriveCost,
        r: data.closeRate / 100, // Convert percentage to decimal
        adSpend: data.adSpendBudget,
      });
      setAdSpendResult(adSpendCalc);
    } catch (error) {
      console.error('Error in form calculation:', error);
      // Reset results on error
      setBreakEvenResult(null);
      setAdSpendResult(null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              🚗 Dealership ROI Calculator
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Is the 4-Month Jump-Start Worth It for You?
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            <DealershipForm onFormChange={handleFormChange} />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <AdSpendResults 
              result={adSpendResult} 
              adSpendBudget={currentFormData?.adSpendBudget || 15000} 
            />
            <BreakEvenResults result={breakEvenResult} />
          </div>
        </div>

        {/* Full Width - Scenario Grid */}
        <div className="mt-8">
          <ScenarioGrid />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Calculate your dealership ROI with confidence. All calculations are estimates based on your inputs.
          </p>
        </div>
      </footer>
    </div>
  );
}
