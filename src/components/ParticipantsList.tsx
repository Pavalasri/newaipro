import React from 'react';
import { Users, Mic, MicOff, Video, VideoOff, Crown, Hand, MoreVertical } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  isLocal: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
}

interface ParticipantsListProps {
  participants: Participant[];
}

export const ParticipantsList: React.FC<ParticipantsListProps> = ({ participants }) => {
  const getParticipantStatus = (participant: Participant) => {
    if (participant.isMuted && participant.isVideoOff) return 'audio-video-off';
    if (participant.isMuted) return 'audio-off';
    if (participant.isVideoOff) return 'video-off';
    return 'active';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'audio-off': return 'text-yellow-400';
      case 'video-off': return 'text-blue-400';
      case 'audio-video-off': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-400" />
          Participants ({participants.length})
        </h3>
      </div>

      <div className="p-4 space-y-3">
        {/* Meeting Host */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
            <Crown className="w-4 h-4 mr-1 text-yellow-400" />
            Meeting Host
          </h4>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">S</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Sarah Chen</p>
                  <p className="text-xs text-gray-400">Host</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="p-1 bg-green-600 rounded">
                  <Mic className="w-3 h-3 text-white" />
                </div>
                <div className="p-1 bg-green-600 rounded">
                  <Video className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Participants */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">All Participants</h4>
          <div className="space-y-2">
            {participants.map((participant) => {
              const status = getParticipantStatus(participant);
              return (
                <div key={participant.id} className="bg-gray-900 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-white">
                            {participant.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(status)} rounded-full border-2 border-gray-900`}>
                          <div className="w-full h-full bg-current rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {participant.name}
                          {participant.isLocal && <span className="text-blue-400 ml-1">(You)</span>}
                        </p>
                        <p className="text-xs text-gray-400 capitalize">
                          {status.replace('-', ' & ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <div className={`p-1 rounded ${participant.isMuted ? 'bg-red-600' : 'bg-green-600'}`}>
                        {participant.isMuted ? 
                          <MicOff className="w-3 h-3 text-white" /> : 
                          <Mic className="w-3 h-3 text-white" />
                        }
                      </div>
                      <div className={`p-1 rounded ${participant.isVideoOff ? 'bg-red-600' : 'bg-green-600'}`}>
                        {participant.isVideoOff ? 
                          <VideoOff className="w-3 h-3 text-white" /> : 
                          <Video className="w-3 h-3 text-white" />
                        }
                      </div>
                      {!participant.isLocal && (
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <MoreVertical className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Speaking Indicator */}
                  {!participant.isMuted && Math.random() > 0.8 && (
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-green-400 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 16 + 8}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          ></div>
                        ))}
                      </div>
                      <span className="text-xs text-green-400">Speaking...</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Participant Actions */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Host Actions</h4>
          <div className="space-y-2">
            <button className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
              Invite Participants
            </button>
            <button className="w-full py-2 px-3 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
              Lock Meeting
            </button>
            <button className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
              End for All
            </button>
          </div>
        </div>

        {/* Meeting Stats */}
        <div className="mt-6 bg-gray-900 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-2">Meeting Stats</h4>
          <div className="space-y-1 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="text-white">23:45</span>
            </div>
            <div className="flex justify-between">
              <span>Active Speakers:</span>
              <span className="text-white">3</span>
            </div>
            <div className="flex justify-between">
              <span>Quality:</span>
              <span className="text-green-400">Good</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
