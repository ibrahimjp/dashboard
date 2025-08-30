import React from 'react';

const IncomeCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-6">
      {/* Monthly Income Chart */}
      <div className="bg-light-black rounded-xl shadow-sm border border-zinc-800 p-6">
      <h3 className="text-sm font-bold text-medium-gray mb-2">Income in current month</h3>
      <div className="text-2xl font-bold text-off-white mb-6">$ 100,000</div>
        
        {/* Chart Container */}
        <div className="relative h-64 bg-dark-bg rounded-lg p-4">
          {/* Y-axis labels */}
          <div className="absolute left-4 top-4 space-y-8 text-xs font-bold text-medium-gray">
            <div>$100,000</div>
            <div>$80,000</div>
            <div>$60,000</div>
            <div>$40,000</div>
            <div>$20,000</div>
            <div>$0</div>
          </div>
          
          {/* Chart Area */}
          <div className="ml-20 h-full relative">
            {/* Grid Lines */}
            <div className="absolute inset-0">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-gray-200"
                  style={{ top: `${(i * 100) / 5}%` }}
                ></div>
              ))}
            </div>
            
            {/* Chart Bars */}
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
              {[60, 80, 45, 90, 75, 65, 85].map((height, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div 
                    className="w-6 bg-blue-500 rounded-t" 
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-medium-gray">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Income Chart */}
      <div className="bg-light-black rounded-xl shadow-sm border border-zinc-800 p-6">
        <h3 className="text-sm font-bold text-medium-gray mb-2">Income in current week</h3>
        <div className="text-2xl font-bold text-off-white mb-6">$ 25,000</div>
        
        {/* Chart Container */}
        <div className="relative h-64 bg-dark-bg rounded-lg p-4">
          {/* Y-axis labels */}
          <div className="absolute left-4 top-4 space-y-8 text-xs font-bold text-medium-gray">
            <div>$25,000</div>
            <div>$20,000</div>
            <div>$15,000</div>
            <div>$10,000</div>
            <div>$5,000</div>
            <div>$0</div>
          </div>
          
          {/* Chart Area */}
          <div className="ml-20 h-full relative">
            {/* Grid Lines */}
            <div className="absolute inset-0">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-gray-200"
                  style={{ top: `${(i * 100) / 5}%` }}
                ></div>
              ))}
            </div>
            
            {/* Chart Bars */}
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div 
                    className="w-6 bg-green-500 rounded-t" 
                    style={{ height: `${Math.random() * 60 + 40}%` }}
                  ></div>
                  <span className="text-xs text-gray-600">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeCharts;
