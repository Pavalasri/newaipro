import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Video, VideoOff, Phone, Settings, Users, 
  MessageSquare, Share, MoreVertical, Wifi, WifiOff,
  Monitor, Brain, FileText, ChevronRight
} from 'lucide-react';
import { NetworkStats } from './NetworkStats';
import { AIEngagement } from './AIEngagement';
import { MeetingMinutes } from './MeetingMinutes';
import { ParticipantsList } from './ParticipantsList';

export const VideoCall: React.FC = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userName = searchParams.get('name') || 'Anonymous';

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [showNetworkStats, setShowNetworkStats] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showMinutes, setShowMinutes] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [networkQuality, setNetworkQuality] = useState<'excellent' | 'good' | 'poor'>('good');

  // Simulate network quality changes
  useEffect(() => {
    const interval = setInterval(() => {
      const qualities: ('excellent' | 'good' | 'poor')[] = ['excellent', 'good', 'poor'];
      setNetworkQuality(qualities[Math.floor(Math.random() * qualities.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const endCall = () => {
    navigate('/');
  };

  const getNetworkColor = () => {
    switch (networkQuality) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
    }
  };

  const mockParticipants = [
    { id: '1', name: userName, isLocal: true, isMuted: isMuted, isVideoOff: isVideoOff },
    { id: '2', name: 'Sarah Chen', isLocal: false, isMuted: false, isVideoOff: false },
    { id: '3', name: 'Raj Patel', isLocal: false, isMuted: true, isVideoOff: false },
    { id: '4', name: 'Alex Johnson', isLocal: false, isMuted: false, isVideoOff: true },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-white font-semibold">Room: {roomId}</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${networkQuality === 'excellent' ? 'bg-green-400' : networkQuality === 'good' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              <span className={`text-sm ${getNetworkColor()}`}>
                {networkQuality.charAt(0).toUpperCase() + networkQuality.slice(1)} Connection
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowNetworkStats(!showNetworkStats)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              {networkQuality === 'poor' ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Brain className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowMinutes(!showMinutes)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Call Area */}
      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {mockParticipants.map((participant) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-gray-800 rounded-lg overflow-hidden"
              >
                {participant.isVideoOff ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-white">
                          {participant.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <p className="text-white font-medium">{participant.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white font-medium">{participant.name}</p>
                      <p className="text-gray-400 text-sm">Camera simulation</p>
                    </div>
                  </div>
                )}
                
                {/* Participant Controls */}
                <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                  <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                    {participant.name}
                  </span>
                  {participant.isMuted && (
                    <div className="bg-red-500 p-1 rounded">
                      <MicOff className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Speaking Indicator */}
                {!participant.isMuted && Math.random() > 0.7 && (
                  <div className="absolute inset-0 border-2 border-green-400 rounded-lg animate-pulse"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Side Panels */}
        <AnimatePresence>
          {showNetworkStats && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-80 bg-gray-800 border-l border-gray-700"
            >
              <NetworkStats networkQuality={networkQuality} />
            </motion.div>
          )}
          
          {showAIPanel && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-80 bg-gray-800 border-l border-gray-700"
            >
              <AIEngagement participants={mockParticipants} />
            </motion.div>
          )}
          
          {showMinutes && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-80 bg-gray-800 border-l border-gray-700"
            >
              <MeetingMinutes />
            </motion.div>
          )}
          
          {showParticipants && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-80 bg-gray-800 border-l border-gray-700"
            >
              <ParticipantsList participants={mockParticipants} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="bg-gray-800 px-4 py-4 border-t border-gray-700">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full transition-colors ${
              isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </button>
          
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3 rounded-full transition-colors ${
              isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
          </button>
          
          <button className="p-3 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors">
            <Share className="w-6 h-6 text-white" />
          </button>
          
          <button className="p-3 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors">
            <Monitor className="w-6 h-6 text-white" />
          </button>
          
          <button className="p-3 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors">
            <MessageSquare className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={endCall}
            className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
          >
            <Phone className="w-6 h-6 text-white transform rotate-135" />
          </button>
        </div>
      </div>
    </div>
  );
};
