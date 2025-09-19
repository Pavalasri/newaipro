import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Brain, Eye, Mic, Clock, TrendingUp } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  isLocal: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
}

interface AIEngagementProps {
  participants: Participant[];
}

export const AIEngagement: React.FC<AIEngagementProps> = ({ participants }) => {
  const getEngagementScore = (participant: Participant) => {
    if (participant.isLocal) return 85;
    return Math.floor(Math.random() * 40) + 60;
  };

  const getSpeakingTime = (participant: Participant) => {
    if (participant.isLocal) return 4.2;
    return Math.random() * 8;
  };

  const engagementData = participants.map(p => ({
    ...p,
    engagement: getEngagementScore(p),
    speakingTime: getSpeakingTime(p),
    attentionScore: Math.floor(Math.random() * 30) + 70
  }));

  const chartOption = {
    title: {
      text: 'Engagement Over Time',
      textStyle: { color: '#fff', fontSize: 12 }
    },
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      data: ['10m', '8m', '6m', '4m', '2m', 'Now'],
      axisLabel: { color: '#9CA3AF', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { color: '#9CA3AF', fontSize: 10 }
    },
    series: engagementData.map((participant, index) => ({
      name: participant.name,
      type: 'line',
      data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 30) + 60),
      smooth: true,
      lineStyle: { 
        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4] 
      },
      itemStyle: { 
        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4] 
      }
    }))
  };

  const speakingChartOption = {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: { color: '#fff' }
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: engagementData.map((participant, index) => ({
        value: participant.speakingTime,
        name: participant.name,
        itemStyle: {
          color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4]
        }
      })),
      label: {
        show: false
      },
      labelLine: {
        show: false
      }
    }]
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          AI Engagement Analytics
        </h3>
      </div>

      <div className="p-4 space-y-6">
        {/* Overall Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 p-3 rounded-lg border border-blue-600/30">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-lg font-bold text-blue-400">78%</span>
            </div>
            <p className="text-xs text-gray-300">Avg Engagement</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 p-3 rounded-lg border border-green-600/30">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-4 h-4 text-green-400" />
              <span className="text-lg font-bold text-green-400">82%</span>
            </div>
            <p className="text-xs text-gray-300">Attention Score</p>
          </div>
        </div>

        {/* Engagement Chart */}
        <div className="bg-gray-900 p-3 rounded-lg">
          <ReactECharts option={chartOption} style={{ height: '180px' }} />
        </div>

        {/* Speaking Time Distribution */}
        <div className="bg-gray-900 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-3 flex items-center">
            <Mic className="w-4 h-4 mr-2" />
            Speaking Time
          </h4>
          <div className="flex items-center space-x-3">
            <div style={{ width: '120px', height: '120px' }}>
              <ReactECharts option={speakingChartOption} style={{ height: '100%' }} />
            </div>
            <div className="flex-1 space-y-1">
              {engagementData.map((participant, index) => (
                <div key={participant.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4] }}
                    ></div>
                    <span className="text-gray-300">{participant.name}</span>
                  </div>
                  <span className="text-white font-medium">{participant.speakingTime.toFixed(1)}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Individual Scores */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white">Individual Engagement</h4>
          {engagementData.map((participant, index) => (
            <div key={participant.id} className="bg-gray-900 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{participant.name}</span>
                <span className={`text-sm font-bold ${
                  participant.engagement > 80 ? 'text-green-400' : 
                  participant.engagement > 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {participant.engagement}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    participant.engagement > 80 ? 'bg-green-400' : 
                    participant.engagement > 60 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${participant.engagement}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Attention: {participant.attentionScore}%</span>
                <span>Speaking: {participant.speakingTime.toFixed(1)}m</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="bg-purple-900/30 border border-purple-600/30 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-purple-400 mb-2">AI Insights</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• High engagement in last 5 minutes</li>
            <li>• Sarah has been most active speaker</li>
            <li>• Consider asking Alex for input</li>
            <li>• Meeting energy is above average</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
