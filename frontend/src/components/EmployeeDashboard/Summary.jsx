import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const SummaryCard = () => {
    const {user} = useAuth();
    
    return (
        <div className='p-6'>
            <div className="rounded-lg flex bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-lg">
                <div className={`text-3xl flex justify-center items-center bg-purple-600/20 text-purple-400 px-6 py-4 border-r border-gray-700/50`}>
                    <FaUser />
                </div>
                <div className="pl-6 py-4">
                    <p className="text-lg font-medium text-gray-300">Welcome Back</p>
                    <p className="text-xl font-bold text-white bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                        {user.name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;