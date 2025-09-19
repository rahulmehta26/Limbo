import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconRotateClockwise, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import Header from '../Header';
import BettingControls from './BettingControls';
import RecentCrashes from './RecentCrashes';
import LossandProfit from './LossandProfit';

function Limbo() {
    const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameResult, setGameResult] = useState(null);
    const [balance, setBalance] = useState(1000);
    const [history, setHistory] = useState([]);
    const [crashMultiplier, setCrashMultiplier] = useState(0);
    const [betAmount, setBetAmount] = useState(10);
    const [autoToggle, setAutoToggle] = useState("Manual")

    const resetGame = () => {
        setCurrentMultiplier(1.0);
        setGameResult(null);
        setIsPlaying(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">

            <Header balance = {balance} />

            <div className="md:grid grid-cols-12 gap-6 p-6 max-w-7xl mx-auto">

                <div className=' col-span-4 flex flex-col items-center md:items-start space-y-6' >

                    <div className="flex items-center gap-4">
                      <div className="flex bg-blue-600/20 rounded-lg p-1">
                            <button
                                onClick={() => setAutoToggle("Manual") }
                                className={`px-6 py-2 text-blue-300 cursor-pointer hover:text-white  ${ autoToggle === "Manual" ? "bg-blue-600 text-white " : "" } rounded-md text-sm font-medium`}>
                          Manual
                        </button>
                            <button
                                onClick={() => setAutoToggle("Auto") }                                
                                className={`px-6 py-2 text-blue-300 cursor-pointer ${ autoToggle !== "Manual" ? "bg-blue-600 text-white " : "" } hover:text-white rounded-md transition-colors text-sm`}>
                          Auto
                        </button>
                      </div>
                    </div>

                <BettingControls
                    isPlaying={isPlaying}
                    setCurrentMultiplier={setCurrentMultiplier}
                    setCrashMultiplier={setCrashMultiplier}
                    balance={balance}
                    setBalance={setBalance}
                    setHistory={setHistory}
                    setBetAmount={setBetAmount}
                    betAmount={betAmount}
                    setIsPlaying={setIsPlaying}
                    setGameResult={setGameResult}
                    crashMultiplier={crashMultiplier}
                    autoToggle = {autoToggle}
                />  
                    
                </div>


                <div className="bg-blue-950/50 col-span-8 py-8 md:py-0 ">

                    <div className=" flex space-y-12 flex-col items-center justify-between md:justify-evenly h-full relative backdrop-blur-sm rounded-xl p-2 py-8 md:p-4 lg:p-8 border border-blue-800/30 text-center">
                        
                        <RecentCrashes crashHistory={history} />

                        <div>

                            <div className="mb-4 ">
                                
                            <span className="px-4 py-2 bg-blue-800/50 rounded-full text-sm font-medium">
                                Demo Mode
                            </span>
                        </div>

                        <motion.div
                            animate={{
                                scale: isPlaying ? [1, 1.05, 1] : 1,
                                color: gameResult?.won ? '#22c55e' : gameResult?.won === false ? '#ef4444' : '#ffffff'
                            }}
                            transition={{
                                scale: { duration: 0.5, repeat: isPlaying ? Infinity : 0 },
                                color: { duration: 0.3 }
                            }}
                            className="text-6xl font-bold mb-4"
                        >
                            {currentMultiplier.toFixed(2)}×
                        </motion.div>

                        {gameResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-2xl font-bold ${gameResult.won ? 'text-green-400' : 'text-red-400'}`}
                            >
                                {gameResult.won ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <IconTrendingUp className="w-6 h-6" />
                                        WIN! +₹{gameResult.payout.toFixed(2)}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <IconTrendingDown className="w-6 h-6" />
                                        CRASHED at {gameResult.crashMultiplier.toFixed(2)}×
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {!isPlaying && gameResult && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                onClick={resetGame}
                                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                            >
                                <IconRotateClockwise className="w-4 h-4" />
                                Play Again
                            </motion.button>
                            )}
                            
                            <LossandProfit history={history} />
                            
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Limbo;