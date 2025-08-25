import React from 'react';

const HospitalSurvey = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 m-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Hospital Survey</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">2019</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">2020</span>
          </div>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="relative h-80 bg-gray-50 rounded-lg p-4">
        {/* Y-axis labels */}
        <div className="absolute left-4 top-4 space-y-8 text-xs font-bold text-gray-500">
          <div>300</div>
          <div>250</div>
          <div>200</div>
          <div>150</div>
          <div>100</div>
          <div>50</div>
          <div>0</div>
        </div>
        
        {/* Chart Area */}
        <div className="ml-16 h-full relative">
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="absolute w-full border-t border-gray-200"
                style={{ top: `${(i * 100) / 6}%` }}
              ></div>
            ))}
          </div>
          
          {/* Chart Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-8 pb-4">
            {/* January */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-1">
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
                <div className="w-8 bg-green-500 rounded-t" style={{ height: '80%' }}></div>
              </div>
              <span className="text-xs text-gray-600">Jan</span>
            </div>
            
            {/* February */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-1">
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '70%' }}></div>
                <div className="w-8 bg-green-500 rounded-t" style={{ height: '90%' }}></div>
              </div>
              <span className="text-xs text-gray-600">Feb</span>
            </div>
            
            {/* March */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-1">
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '50%' }}></div>
                <div className="w-8 bg-green-500 rounded-t" style={{ height: '70%' }}></div>
              </div>
              <span className="text-xs text-gray-600">Mar</span>
            </div>
            
            {/* April */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-1">
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '80%' }}></div>
                <div className="w-8 bg-green-500 rounded-t" style={{ height: '100%' }}></div>
              </div>
              <span className="text-xs text-gray-600">Apr</span>
            </div>
            
            {/* May */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-1">
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '90%' }}></div>
                <div className="w-8 bg-green-500 rounded-t" style={{ height: '85%' }}></div>
              </div>
              <span className="text-xs text-gray-600">May</span>
            </div>
            
            {/* June */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-1">
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '75%' }}></div>
                <div className="w-8 bg-green-500 rounded-t" style={{ height: '95%' }}></div>
              </div>
              <span className="text-xs text-gray-600">Jun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSurvey;
