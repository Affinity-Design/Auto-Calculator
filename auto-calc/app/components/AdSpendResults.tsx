'use client';

import { AdSpendResult, formatCurrency, formatPercent } from '@/app/lib/calc';

interface AdSpendResultsProps {
  result: AdSpendResult | null;
  adSpendBudget: number;
}

export default function AdSpendResults({ result, adSpendBudget }: AdSpendResultsProps) {
  if (!result) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ad Spend Projection</h2>
        <p className="text-gray-500">Enter your numbers above to see the projection</p>
      </div>
    );
  }

  if (!result.viable) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-red-900 mb-4">⚠️ Not Viable</h2>
        <div className="bg-red-100 border border-red-300 rounded-md p-4 mb-4">
          <p className="text-red-800 font-medium">
            Your ad cost per sold unit exceeds profit—not viable unless CPL drops or close-rate improves.
          </p>
        </div>
        <div className="text-red-700">
          <p className="text-lg">
            <span className="font-semibold">Net Loss Per Sale:</span> {formatCurrency(Math.abs(result.netPerSale))}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Ad Spend Projection: {formatCurrency(adSpendBudget)}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {result.carsSold}
          </div>
          <div className="text-sm text-gray-600">Cars You'll Sell</div>
          <div className="text-xs text-gray-500 mt-1">In 4 months</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {result.testDrives}
          </div>
          <div className="text-sm text-gray-600">Test Drives</div>
          <div className="text-xs text-gray-500 mt-1">Your budget buys</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {formatCurrency(result.totalProfit)}
          </div>
          <div className="text-sm text-gray-600">Total Profit</div>
          <div className="text-xs text-gray-500 mt-1">After ad costs</div>
        </div>

        <div className={`text-center ${result.breaksEven ? 'text-green-600' : 'text-red-600'}`}>
          <div className="text-3xl font-bold mb-2">
            {result.breaksEven ? '✅' : '❌'}
          </div>
          <div className="text-sm text-gray-600">Break Even</div>
          <div className="text-xs text-gray-500 mt-1">vs $15k fee</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">ROI on Ad Spend</h3>
          <div className="text-2xl font-bold text-blue-600">
            {formatPercent(result.roi / 100)}
          </div>
          <p className="text-blue-700 text-sm mt-1">
            Return on your {formatCurrency(adSpendBudget)} investment
          </p>
        </div>

        <div className={`rounded-lg p-4 ${result.breaksEven ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className={`font-semibold mb-2 ${result.breaksEven ? 'text-green-900' : 'text-red-900'}`}>
            ROI vs Marketing Fee
          </h3>
          <div className={`text-2xl font-bold ${result.breaksEven ? 'text-green-600' : 'text-red-600'}`}>
            {isFinite(result.roiVsMarketingFee) ? formatPercent(result.roiVsMarketingFee / 100) : 'N/A'}
          </div>
          <p className={`text-sm mt-1 ${result.breaksEven ? 'text-green-700' : 'text-red-700'}`}>
            Return on the $15,000 program fee
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
        <p className="text-gray-700 text-sm">
          With a {formatCurrency(adSpendBudget)} ad budget, you can afford{' '}
          <span className="font-semibold text-purple-600">{result.testDrives} test drives</span>, 
          which should result in <span className="font-semibold text-blue-600">{result.carsSold} car sales</span>{' '}
          and <span className="font-semibold text-green-600">{formatCurrency(result.totalProfit)} total profit</span>.
        </p>
        <p className="text-gray-700 text-sm mt-2">
          {result.breaksEven ? (
            <>This <span className="font-semibold text-green-600">covers the $15,000 marketing fee</span> with{' '}
            {formatCurrency(result.totalProfit - 15000)} to spare.</>
          ) : (
            <>This <span className="font-semibold text-red-600">falls short of the $15,000 marketing fee</span> by{' '}
            {formatCurrency(15000 - result.totalProfit)}.</>
          )}
        </p>
      </div>
    </div>
  );
}
