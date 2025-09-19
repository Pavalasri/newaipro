import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Wifi, Activity, Clock, Zap } from 'lucide-react';

interface NetworkStatsProps {
  networkQuality: 'excellent' | 'good' | 'poor';
}

export const NetworkStats: React.FC<NetworkStatsProps> = ({ networkQuality }) => {
  const getLatency = () => {
    switch (networkQuality) {
      case 'excellent': return Math.floor(Math.random() * 20) + 10;
      case 'good': return Math.floor(Math.random() * 50) + 30;
      case 'poor': return Math.floor(Math.random() * 200) + 100;
    }
  };

  const getPacketLoss = () => {
    switch (networkQuality) {
      case 'excellent': return Math.random() * 0.1;
      case 'good': return Math.random() * 1;
      case 'poor': return Math.random() * 5 + 2;
    }
  };

  const getBandwidth = () => {
    switch (networkQuality) {
      case 'excellent': return Math.floor(Math.random() * 50) + 80;
      case 'good': return Math.floor(Math.random() * 30) + 40;
      case 'poor': return Math.floor(Math.random() * 20) + 10;
    }
  };

  const latency = getLatency();
  const packetLoss = getPacketLoss();
  const bandwidth = getBandwidth();

  const chartOption = {
    title: {
      text: 'Network Performance',
      textStyle: { color: '#fff', fontSize: 14 }
    },
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      data: ['10s', '8s', '6s', '4s', '2s', 'Now'],
      axisLabel: { color: '#9CA3AF' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#9CA3AF' }
    },
    series: [
      {
        name: 'Latency (ms)',
        type: 'line',
        data: [45, 52, 38, latency - 10, latency - 5, latency],
        smooth: true,
        lineStyle: { color: '#3B82F6' },
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Packet Loss (%)',
        type: 'line',
        data: [0.5, 1.2, 0.8, packetLoss + 0.3, packetLoss + 0.1, packetLoss],
        smooth: true,
        lineStyle: { color: '#EF4444' },
        itemStyle: { color: '#EF4444' }
      }
    ]
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Network Analytics
        </h3>
      </div>

      <div className="p-4 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className={`text-sm font-medium ${latency < 50 ? 'text-green-400' : latency < 100 ? 'text-yellow-400' : 'text-red-400'}`}>
                {latency}ms
              </span>
            </div>
            <p className="text-xs text-gray-400">Latency</p>
          </div>

          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-4 h-4 text-red-400" />
              <span className={`text-sm font-medium ${packetLoss < 1 ? 'text-green-400' : packetLoss < 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                {packetLoss.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-gray-400">Packet Loss</p>
          </div>

          <div className="bg-gray-900 p-3 rounded-lg col-span-2">
            <div className="flex items-center justify-between mb-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className={`text-sm font-medium ${bandwidth > 60 ? 'text-green-400' : bandwidth > 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                {bandwidth} Mbps
              </span>
            </div>
            <p className="text-xs text-gray-400">Bandwidth Available</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-900 p-3 rounded-lg">
          <ReactECharts option={chartOption} style={{ height: '200px' }} />
        </div>

        {/* Adaptive Quality Status */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-3">Quality Adaptation</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Video Quality</span>
              <span className={`text-xs font-medium ${networkQuality === 'excellent' ? 'text-green-400' : networkQuality === 'good' ? 'text-yellow-400' : 'text-red-400'}`}>
                {networkQuality === 'excellent' ? '1080p' : networkQuality === 'good' ? '720p' : '480p'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Audio Quality</span>
              <span className={`text-xs font-medium ${networkQuality === 'poor' ? 'text-yellow-400' : 'text-green-400'}`}>
                {networkQuality === 'poor' ? 'Compressed' : 'High'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Frame Rate</span>
              <span className={`text-xs font-medium ${networkQuality === 'excellent' ? 'text-green-400' : networkQuality === 'good' ? 'text-yellow-400' : 'text-red-400'}`}>
                {networkQuality === 'excellent' ? '60fps' : networkQuality === 'good' ? '30fps' : '15fps'}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {networkQuality === 'poor' && (
          <div className="bg-red-900/30 border border-red-600/30 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-red-400 mb-2">Network Issues Detected</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Switched to audio-only mode</li>
              <li>• Reduced video quality to 480p</li>
              <li>• Enabled aggressive compression</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
