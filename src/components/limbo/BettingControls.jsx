import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import TargetMultiplier from "./TargetMultiplier";


const BettingControls = ({ isPlaying, setCurrentMultiplier, setCrashMultiplier, balance, setBalance, setHistory, setBetAmount, betAmount, setIsPlaying, setGameResult, crashMultiplier, autoToggle }) => {
  
  const [targetMultiplier, setTargetMultiplier] = useState(2.0);
  
  const generateCrashMultiplier = () => {
    const random = Math.random();
    // Weight towards lower multipliers for realistic casino odds
    if (random < 0.4) return 1.01 + Math.random() * 0.99; // 1.01-2.0
    if (random < 0.7) return 2.0 + Math.random() * 1.0; // 2.0-3.0
    if (random < 0.9) return 3.0 + Math.random() * 2.0; // 3.0-5.0
    return 5.0 + Math.random() * 5.0; // 5.0-10.0
  };

  const startGame = () => {
    if (betAmount > balance || betAmount <= 0) return;

    setIsPlaying(true);
    setGameResult(null);
    setCurrentMultiplier(1.0);

    const crashPoint = generateCrashMultiplier();
    setCrashMultiplier(crashPoint);

    setBalance((prev) => prev - betAmount);

    let multiplier = 1.0;
    const increment = 0.01;
    const speed = 50; 

    const timer = setInterval(() => {
      multiplier += increment;
      setCurrentMultiplier(multiplier);

      // Check if user wins (reached target before crash)
      if (multiplier >= targetMultiplier && multiplier < crashPoint) {
        const payout = betAmount * targetMultiplier;
        const result = {
          crashMultiplier: crashPoint,
          userMultiplier: targetMultiplier,
          betAmount,
          won: true,
          payout,
          timestamp: new Date(),
        };

        setGameResult(result);
        setBalance((prev) => prev + payout);
        setHistory(prev => [result, ...prev].slice(0, 5));
        setIsPlaying(false);
        clearInterval(timer);
        return;
      }

      // Checking if crashed
      if (multiplier >= crashPoint) {
        const result = {
          crashMultiplier: crashPoint,
          userMultiplier: targetMultiplier,
          betAmount,
          won: false,
          payout: 0,
          timestamp: new Date(),
        };

        setGameResult(result);
        setHistory(prev => [result, ...prev].slice(0, 5));
        setIsPlaying(false);
        clearInterval(timer);
      }
    }, speed);
  };

  const adjustBetAmount = (multiplier) => {
    setBetAmount((prev) => Math.max(1, prev * multiplier));
  };

  useEffect(() => {
  if (autoToggle === "Auto") {
    const interval = setInterval(() => {
      startGame();
    }, 5000);

    return () => clearInterval(interval);
  }
}, [autoToggle]);

  return (
    <div className="w-full space-y-6">
      <div className="bg-blue-950/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
        <h3 className="text-sm font-medium text-blue-300 mb-4">Bet Amount</h3>

        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">₹</span>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-full bg-blue-900/50 border border-blue-700 rounded-lg pl-8 pr-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPlaying}
            min="0.01"
            step="0.01"
          />
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => adjustBetAmount(0.5)}
            disabled={isPlaying}
            className="flex-1 py-2 cursor-pointer bg-blue-800/50 hover:bg-blue-700/50 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            1/2
          </button>
          <button
            onClick={() => adjustBetAmount(2)}
            disabled={isPlaying}
            className="flex-1 py-2 cursor-pointer bg-blue-800/50 hover:bg-blue-700/50 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            2×
          </button>
        </div>

        <motion.button
          whileHover={{ scale: isPlaying ? 1 : 1.02 }}
          whileTap={{ scale: isPlaying ? 1 : 0.98 }}
          onClick={isPlaying ? undefined : startGame}
          disabled={isPlaying || betAmount > balance || betAmount <= 0}
          className={`w-full py-4 rounded-lg font-medium transition-all ${
            isPlaying
              ? "bg-red-600 hover:bg-red-700 cursor-not-allowed"
              : betAmount > balance || betAmount <= 0
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isPlaying ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Playing...
            </div>
          ) : (
            <div className="flex cursor-pointer items-center justify-center gap-2">
              <IconPlayerPlayFilled className="w-4 h-4" />
              Place Demo Bet
            </div>
          )}
        </motion.button>

        <p className="text-xs text-blue-400 text-center mt-3">
          Enter Bet Amount For Real Play
        </p>
      </div>

      <TargetMultiplier setTargetMultiplier={ setTargetMultiplier } targetMultiplier={targetMultiplier} isPlaying = {isPlaying} />
    </div>
  );
};

export default BettingControls;