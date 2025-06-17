'use client';

import { calcBreakEven, calcFromAdSpend, formatCurrency, formatPercent } from '@/app/lib/calc';

const scenarios = [
  {
    name: 'Best-Case',
    cpl: 30,
    closeRate: 30,
    profit: 2000,
    className: 'bg-green-50 border-green-200',
  },
  {
    name: 'Optimistic-Mid',
    cpl: 30,
    closeRate: 22.5,
    profit: 1500,
    className: 'bg-blue-50 border-blue-200',
  },
  {
    name: 'Conservative',
    cpl: 65,
    closeRate: 22.5,
    profit: 1500,
    className: 'bg-yellow-50 border-yellow-200',
  },
];

const adSpendScenarios = [
  { name: 'Conservative', adSpend: 10000, className: 'bg-yellow-50 border-yellow-200' },
  { name: 'Moderate', adSpend: 15000, className: 'bg-blue-50 border-blue-200' },
  { name: 'Aggressive', adSpend: 20000, className: 'bg-green-50 border-green-200' },
  { name: 'Maximum', adSpend: 30000, className: 'bg-purple-50 border-purple-200' },
];

export default function ScenarioGrid() {
  return (
    <div className="space-y-8">
      {/* Break-Even Scenarios */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Break-Even Reference Benchmarks</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Scenario</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">CPL</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Close Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Profit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Cars Needed</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((scenario, index) => {
                const result = calcBreakEven({
                  P: scenario.profit,
                  Cl: scenario.cpl,
                  r: scenario.closeRate / 100,
                });

                return (
                  <tr
                    key={scenario.name}
                    className={`border-b border-gray-100 ${scenario.className} ${
                      index === scenarios.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {scenario.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {formatCurrency(scenario.cpl)}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {formatPercent(scenario.closeRate / 100)}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {formatCurrency(scenario.profit)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {result.viable ? result.carsNeeded : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>
            <strong>CPL:</strong> Cost Per Lead (booked test drive) |{' '}
            <strong>Close Rate:</strong> Percentage of test drives that result in sales |{' '}
            <strong>Profit:</strong> Average profit per vehicle sold
          </p>
        </div>
      </div>

      {/* Ad Spend Scenarios */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ad Spend Budget Scenarios</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Based on typical dealership metrics: $45 CPL, 22.5% close rate, $1,500 profit per sale
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Budget</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Ad Spend</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Test Drives</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Cars Sold</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Profit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Breaks Even?</th>
              </tr>
            </thead>
            <tbody>
              {adSpendScenarios.map((scenario, index) => {
                const result = calcFromAdSpend({
                  P: 1500,
                  Cl: 45,
                  r: 0.225,
                  adSpend: scenario.adSpend,
                });

                return (
                  <tr
                    key={scenario.name}
                    className={`border-b border-gray-100 ${scenario.className} ${
                      index === adSpendScenarios.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {scenario.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {formatCurrency(scenario.adSpend)}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {result.testDrives}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {result.carsSold}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {formatCurrency(result.totalProfit)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${result.breaksEven ? 'text-green-600' : 'text-red-600'}`}>
                        {result.breaksEven ? '✅ Yes' : '❌ No'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>
            <strong>Breaks Even:</strong> Whether total profit covers the $15,000 marketing fee |{' '}
            All scenarios assume standard metrics for comparison
          </p>
        </div>
      </div>
    </div>
  );
}
