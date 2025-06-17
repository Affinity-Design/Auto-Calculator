# 🚗 Dealership ROI Calculator

A lightweight Next.js 15.3.3 web app that helps car dealerships analyze the ROI of a 4-month $15,000 marketing program. Enter your real funnel numbers and instantly see:

- How many cars must be sold to break even
- Required ad spend and test drives
- Projected profit or loss analysis

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the calculator.

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.3 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts (for future enhancements)

## 📊 Features

### Real-Time Calculations
- Instant feedback as you type
- Live break-even analysis
- Automatic form validation

### Comprehensive Analysis
- **Net profit per sale** after ad costs
- **Cars needed** to break even in 4 months
- **Test drives required** based on close rate
- **Total ad spend** budget calculation

### Reference Benchmarks
Compare your numbers against industry scenarios:
- **Best-Case:** 30% close rate, $30 CPL, $2,000 profit
- **Optimistic-Mid:** 22.5% close rate, $30 CPL, $1,500 profit  
- **Conservative:** 22.5% close rate, $65 CPL, $1,500 profit

### Mobile-Optimized
- Responsive design for dealer iPads
- Touch-friendly interface
- Single-column stacking on mobile

## 🧮 How It Works

The calculator uses this core formula:

```
Net Profit Per Sale = Profit Per Sale - (Cost Per Lead ÷ Close Rate)
Cars Needed = Marketing Fee ÷ Net Profit Per Sale
Test Drives Needed = Cars Needed ÷ Close Rate
Total Ad Spend = Test Drives × Cost Per Lead
```

## 📱 Usage Examples

### Typical Dealership
- **Profit per sale:** $1,500
- **Test drive cost:** $45  
- **Close rate:** 22.5%
- **Result:** Need 11 cars, 49 test drives, $2,205 ad spend

### High-Performance Dealership
- **Profit per sale:** $2,000
- **Test drive cost:** $30
- **Close rate:** 30%
- **Result:** Need 8 cars, 27 test drives, $810 ad spend

### Warning Scenario
If your cost per acquisition exceeds profit margins, the app displays a clear warning with improvement suggestions.

## 🎯 Accessibility

- ARIA labels on all form inputs
- Live regions for error announcements
- Keyboard navigation support
- Screen reader friendly

## 📁 Project Structure

```
app/
├── components/
│   ├── DealershipForm.tsx      # Input form with validation
│   ├── BreakEvenResults.tsx    # Live results display
│   └── ScenarioGrid.tsx        # Reference benchmarks
├── lib/
│   └── calc.ts                 # Core calculation logic
├── layout.js                   # Root layout
└── page.tsx                    # Main calculator page
```

## 🔧 Development

```bash
# Type checking
npm run build

# Linting
npm run lint

# Development with Turbopack
npm run dev --turbopack
```

## 📈 Future Enhancements

- ROI visualization charts using Recharts
- Multiple marketing program comparisons
- Historical data tracking
- Export functionality for reports

---

**Built for car dealerships to make data-driven marketing decisions with confidence.**
