import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { 
  ArrowLeft, Calendar, Clock, Users, Zap, 
  TrendingUp, Award, MessageSquare, Video 
} from 'lucide-react';
import { format, subDays } from 'date-fns';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const meetingData = [
    { date: format(subDays(new Date(), 6), 'MMM dd'), meetings: 3, duration: 120 },
    { date: format(subDays(new Date(), 5), 'MMM dd'), meetings: 5, duration: 180 },
    { date: format(subDays(new Date(), 4), 'MMM dd'), meetings: 2, duration: 90 },
    { date: format(subDays(new Date(), 3), 'MMM dd'), meetings: 4, duration: 150 },
    { date: format(subDays(new Date(), 2), 'MMM dd'), meetings: 6, duration: 240 },
    { date: format(subDays(new Date(), 1), 'MMM dd'), meetings: 3, duration: 135 },
    { date: format(new Date(), 'MMM dd'), meetings: 2, duration: 75 },
  ];

  const chartOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: { color: '#fff' }
    },
    legend: {
      data: ['Meetings', 'Duration (min)'],
      textStyle: { color: '#9CA3AF' }
    },
    xAxis: {
      type: 'category',
      data: meetingData.map(d => d.date),
      axisLabel: { color: '#9CA3AF' }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Meetings',
        axisLabel: { color: '#9CA3AF' }
      },
      {
        type: 'value',
        name: 'Duration (min)',
        axisLabel: { color: '#9CA3AF' }
      }
    ],
    series: [
      {
        name: 'Meetings',
        type: 'bar',
        data: meetingData.map(d => d.meetings),
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Duration (min)',
        type: 'line',
        yAxisIndex: 1,
        data: meetingData.map(d => d.duration),
        lineStyle: { color: '#10B981' },
        itemStyle: { color: '#10B981' }
      }
    ]
  };

  const recentMeetings = [
    {
      id: '1',
      title: 'Product Team Standup',
      date: format(new Date(), 'MMM dd, yyyy'),
      time: '09:00 AM',
      duration: '45 min',
      participants: 6,
      engagement: 87
    },
    {
      id: '2',
      title: 'Client Presentation',
      date: format(subDays(new Date(), 1), 'MMM dd, yyyy'),
      time: '02:30 PM',
      duration: '90 min',
      participants: 8,
      engagement: 92
    },
    {
      id: '3',
      title: 'Engineering Review',
      date: format(subDays(new Date(), 2), 'MMM dd, yyyy'),
      time: '11:00 AM',
      duration: '60 min',
      participants: 5,
      engagement: 78
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">CollabAI Dashboard</h1>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Meetings</p>
                <p className="text-3xl font-bold">25</p>
                <p className="text-blue-200 text-sm">This month</p>
              </div>
              <Video className="w-10 h-10 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Avg Engagement</p>
                <p className="text-3xl font-bold">84%</p>
                <p className="text-green-200 text-sm">+5% from last month</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Participants</p>
                <p className="text-3xl font-bold">156</p>
                <p className="text-purple-200 text-sm">Unique attendees</p>
              </div>
              <Users className="w-10 h-10 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600 to-orange-600 p-6 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Meeting Hours</p>
                <p className="text-3xl font-bold">42</p>
                <p className="text-yellow-200 text-sm">This month</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-200" />
            </div>
          </div>
        </div>

        {/* Charts and Recent Meetings */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Meeting Analytics Chart */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Meeting Analytics</h3>
            <ReactECharts option={chartOption} style={{ height: '300px' }} />
          </div>

          {/* Recent Meetings */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Meetings</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium">{meeting.title}</h4>
                      <p className="text-gray-400 text-sm">{meeting.date} at {meeting.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      meeting.engagement > 85 ? 'bg-green-600/20 text-green-400' :
                      meeting.engagement > 70 ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {meeting.engagement}% engaged
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {meeting.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {meeting.participants} participants
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-600/30 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-purple-400" />
            AI-Powered Insights
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Meeting Efficiency</h4>
              <p className="text-gray-300 text-sm">Your meetings are 23% more efficient than average, with high engagement rates and clear action items.</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Optimal Meeting Time</h4>
              <p className="text-gray-300 text-sm">Tuesdays at 10 AM show the highest engagement rates. Consider scheduling important meetings then.</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Participation Balance</h4>
              <p className="text-gray-300 text-sm">All team members contribute actively. Sarah and Raj are your most engaged participants.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
