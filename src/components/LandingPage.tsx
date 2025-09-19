import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, Users, Brain, Network, Mic, Camera, Settings } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const joinCall = () => {
    if (roomId.trim() && userName.trim()) {
      navigate(`/call/${roomId}?name=${encodeURIComponent(userName)}`);
    }
  };

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 15);
    setRoomId(newRoomId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Collab<span className="text-blue-400">AI</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            AI-Powered Real-Time Collaboration Platform with Smart Network Adaptation
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Smart Video Collaboration for Global Teams
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Adaptive Quality</h3>
                  <p className="text-gray-300">Automatically adjusts video/audio quality based on network conditions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">AI Analytics</h3>
                  <p className="text-gray-300">Real-time engagement tracking and participation insights</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Smart Minutes</h3>
                  <p className="text-gray-300">Automated meeting minutes and action item generation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Join Call Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Join or Create Meeting</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Room ID</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter room ID"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={createRoom}
                    className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>
              
              <button
                onClick={joinCall}
                disabled={!roomId.trim() || !userName.trim()}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Video className="w-5 h-5 inline mr-2" />
                Join Meeting
              </button>
            </div>

            {/* Quick Access */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-gray-300 mb-3">Quick Access:</p>
              <div className="flex space-x-2">
                <button className="flex-1 py-2 px-3 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors">
                  <Camera className="w-4 h-4 inline mr-1" />
                  Test Camera
                </button>
                <button className="flex-1 py-2 px-3 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors">
                  <Mic className="w-4 h-4 inline mr-1" />
                  Test Mic
                </button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 py-2 px-3 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors"
                >
                  <Settings className="w-4 h-4 inline mr-1" />
                  Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
