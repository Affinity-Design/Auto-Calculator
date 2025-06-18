'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

const formSchema = z.object({
  avgProfitPerSale: z.number().min(1, 'Profit per sale must be greater than 0'),
  bookedTestDriveCost: z.number().min(1, 'Test drive cost must be greater than 0'),
  closeRate: z.number().min(0.1).max(100, 'Close rate must be between 0.1% and 100%'),
  adSpendBudget: z.number().min(1000, 'Ad spend budget must be at least $1,000'),
});

export type FormData = z.infer<typeof formSchema>;

interface DealershipFormProps {
  onFormChange: (data: FormData) => void;
}

export default function DealershipForm({ onFormChange }: DealershipFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avgProfitPerSale: 1500,
      bookedTestDriveCost: 45,
      closeRate: 22.5,
      adSpendBudget: 15000,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = watch((value) => {
      // Check if all required values are present and valid
      if (
        value.avgProfitPerSale && 
        value.bookedTestDriveCost && 
        value.closeRate && 
        value.adSpendBudget &&
        value.avgProfitPerSale > 0 &&
        value.bookedTestDriveCost > 0 &&
        value.closeRate > 0 &&
        value.adSpendBudget > 0
      ) {
        onFormChange(value as FormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  // Trigger initial form change on mount
  useEffect(() => {
    const currentValues = watch();
    if (
      currentValues.avgProfitPerSale && 
      currentValues.bookedTestDriveCost && 
      currentValues.closeRate && 
      currentValues.adSpendBudget &&
      currentValues.avgProfitPerSale > 0 &&
      currentValues.bookedTestDriveCost > 0 &&
      currentValues.closeRate > 0 &&
      currentValues.adSpendBudget > 0
    ) {
      onFormChange(currentValues as FormData);
    }
  }, [watch, onFormChange]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Dealership Numbers</h2>
      
      <form className="space-y-6">
        <div>
          <label htmlFor="avgProfitPerSale" className="block text-sm font-medium text-gray-700 mb-2">
            Average Profit Per Sale
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              {...register('avgProfitPerSale', { valueAsNumber: true })}
              type="number"
              id="avgProfitPerSale"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1500"
              aria-describedby="profit-help"
            />
          </div>
          <p id="profit-help" className="mt-1 text-sm text-gray-500">
            Front-end gross per vehicle (exclude F&I if unsure)
          </p>
          {errors.avgProfitPerSale && (
            <p className="mt-1 text-sm text-red-600" role="alert" aria-live="polite">
              {errors.avgProfitPerSale.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bookedTestDriveCost" className="block text-sm font-medium text-gray-700 mb-2">
            Cost Per Booked Test Drive
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              {...register('bookedTestDriveCost', { valueAsNumber: true })}
              type="number"
              id="bookedTestDriveCost"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="45"
              aria-describedby="cost-help"
            />
          </div>
          <p id="cost-help" className="mt-1 text-sm text-gray-500">
            Average cost per BOOKED test-drive
          </p>
          {errors.bookedTestDriveCost && (
            <p className="mt-1 text-sm text-red-600" role="alert" aria-live="polite">
              {errors.bookedTestDriveCost.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="closeRate" className="block text-sm font-medium text-gray-700 mb-2">
            Close Rate
          </label>
          <div className="relative">
            <input
              {...register('closeRate', { valueAsNumber: true })}
              type="number"
              step="0.1"
              id="closeRate"
              className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="22.5"
              aria-describedby="rate-help"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
          <p id="rate-help" className="mt-1 text-sm text-gray-500">
            % of test-drives that close
          </p>
          {errors.closeRate && (
            <p className="mt-1 text-sm text-red-600" role="alert" aria-live="polite">
              {errors.closeRate.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="adSpendBudget" className="block text-sm font-medium text-gray-700 mb-2">
            Total Ad Spend Budget
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              {...register('adSpendBudget', { valueAsNumber: true })}
              type="number"
              id="adSpendBudget"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="15000"
              aria-describedby="budget-help"
            />
          </div>
          <p id="budget-help" className="mt-1 text-sm text-gray-500">
            How much you want to spend on ads over 4 months
          </p>
          {errors.adSpendBudget && (
            <p className="mt-1 text-sm text-red-600" role="alert" aria-live="polite">
              {errors.adSpendBudget.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            4-Month Marketing Fee
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="text"
              value="15,000"
              disabled
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Fixed program fee (for ROI comparison)
          </p>
        </div>
      </form>
    </div>
  );
}
