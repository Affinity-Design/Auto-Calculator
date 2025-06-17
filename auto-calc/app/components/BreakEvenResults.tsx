'use client';

import { BreakEvenResult, formatCurrency } from '@/app/lib/calc';

interface BreakEvenResultsProps {
  result: BreakEvenResult | null;
}

export default function BreakEvenResults({ result }: BreakEvenResultsProps) {
  if (!result) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Break-Even Analysis</h2>
        <p className="text-gray-500">Enter your numbers above to see the analysis</p>
      </div>
    );
  }

  if (!result.viable) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-red-900 mb-4">⚠️ Program Not Viable</h2>
        <div className="bg-red-100 border border-red-300 rounded-md p-4 mb-4">
          <p className="text-red-800 font-medium">
            Your ad cost per sold unit exceeds profit—programme not viable unless CPL drops or close-rate improves.
          </p>
        </div>
        <div className="text-red-700">
          <p className="text-lg">
            <span className="font-semibold">Net Loss Per Sale:</span> {formatCurrency(Math.abs(result.netPerSale))}
          </p>
          <p className="text-sm mt-2">
            You would lose money on each sale with these numbers. Consider:
          </p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Reducing your cost per booked test drive</li>
            <li>Improving your close rate through better sales processes</li>
            <li>Increasing your profit margin per vehicle</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Break-Even Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            💰 {formatCurrency(result.netPerSale)}
          </div>
          <div className="text-sm text-gray-600">Net Profit Per Sale</div>
          <div className="text-xs text-gray-500 mt-1">After ad costs</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {result.carsNeeded}
          </div>
          <div className="text-sm text-gray-600">Cars to Break Even</div>
          <div className="text-xs text-gray-500 mt-1">In 4 months</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {result.testDrives}
          </div>
          <div className="text-sm text-gray-600">Test Drives Needed</div>
          <div className="text-xs text-gray-500 mt-1">Booked appointments</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {formatCurrency(result.adSpend || 0)}
          </div>
          <div className="text-sm text-gray-600">Total Ad Spend</div>
          <div className="text-xs text-gray-500 mt-1">4-month budget</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
        <p className="text-gray-700 text-sm">
          To break even on the $15,000 marketing fee, you need to sell{' '}
          <span className="font-semibold text-blue-600">{result.carsNeeded} cars</span> over 4 months.
          This requires <span className="font-semibold text-purple-600">{result.testDrives} booked test drives</span>{' '}
          with a total ad spend of <span className="font-semibold text-orange-600">{formatCurrency(result.adSpend || 0)}</span>.
        </p>
        <p className="text-gray-700 text-sm mt-2">
          Each sale will net you <span className="font-semibold text-green-600">{formatCurrency(result.netPerSale)}</span>{' '}
          after covering advertising costs.
        </p>
      </div>
    </div>
  );
}
