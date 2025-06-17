export type Inputs = {
  P: number;          // avgProfitPerSale
  Cl: number;         // bookedTestDriveCost
  r: number;          // closeRate (decimal 0-1)
  M?: number;         // marketingFee (default 15000)
};

export type AdSpendInputs = {
  P: number;          // avgProfitPerSale
  Cl: number;         // bookedTestDriveCost
  r: number;          // closeRate (decimal 0-1)
  adSpend: number;    // totalAdSpendBudget
  M?: number;         // marketingFee (default 15000)
};

export type BreakEvenResult = {
  viable: boolean;
  netPerSale: number;
  carsNeeded?: number;
  testDrives?: number;
  adSpend?: number;
};

export type AdSpendResult = {
  viable: boolean;
  netPerSale: number;
  testDrives: number;
  carsSold: number;
  totalProfit: number;
  totalRevenue: number;
  roi: number;
  roiVsMarketingFee: number;
  breaksEven: boolean;
};

export function calcBreakEven({
  P,
  Cl,
  r,
  M = 15000,
}: Inputs): BreakEvenResult {
  // Input validation
  if (!P || !Cl || !r || P <= 0 || Cl <= 0 || r <= 0 || r > 1) {
    return { viable: false, netPerSale: 0 };
  }

  const netPerSale = P - Cl / r;

  if (netPerSale <= 0) {
    return { viable: false, netPerSale };
  }

  const carsNeeded = Math.ceil(M / netPerSale);
  const testDrives = Math.ceil(carsNeeded / r);
  const adSpend = testDrives * Cl;

  return {
    viable: true,
    netPerSale,
    carsNeeded,
    testDrives,
    adSpend,
  };
}

export function calcFromAdSpend({
  P,
  Cl,
  r,
  adSpend,
  M = 15000,
}: AdSpendInputs): AdSpendResult {
  // Input validation
  if (!P || !Cl || !r || !adSpend || P <= 0 || Cl <= 0 || r <= 0 || r > 1 || adSpend <= 0) {
    return {
      viable: false,
      netPerSale: 0,
      testDrives: 0,
      carsSold: 0,
      totalProfit: 0,
      totalRevenue: 0,
      roi: 0,
      roiVsMarketingFee: 0,
      breaksEven: false,
    };
  }

  const netPerSale = P - Cl / r;

  if (netPerSale <= 0) {
    return {
      viable: false,
      netPerSale,
      testDrives: 0,
      carsSold: 0,
      totalProfit: 0,
      totalRevenue: 0,
      roi: 0,
      roiVsMarketingFee: 0,
      breaksEven: false,
    };
  }

  const testDrives = Math.floor(adSpend / Cl);
  const carsSold = Math.floor(testDrives * r);
  const totalRevenue = carsSold * P;
  const totalProfit = carsSold * netPerSale;
  const roi = adSpend > 0 ? ((totalProfit - adSpend) / adSpend) * 100 : 0;
  const roiVsMarketingFee = M > 0 ? ((totalProfit - M) / M) * 100 : 0;
  const breaksEven = totalProfit >= M;

  return {
    viable: true,
    netPerSale,
    testDrives,
    carsSold,
    totalProfit,
    totalRevenue,
    roi,
    roiVsMarketingFee,
    breaksEven,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(decimal: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(decimal);
}
