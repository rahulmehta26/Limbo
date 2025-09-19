import React from 'react'

const TargetMultiplier = ({targetMultiplier, setTargetMultiplier, isPlaying }) => {
  return (
         <div className="bg-blue-950/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
        <h3 className="text-sm font-medium text-blue-300 mb-4">Target Multiplier</h3>

        <div className="relative">
          <input
            type="number"
            value={targetMultiplier}
            onChange={(e) => setTargetMultiplier(Number(e.target.value))}
            className="w-full bg-blue-900/50 border border-blue-700 rounded-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPlaying}
            min="1.01"
            step="0.01"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300">×</span>
        </div>

        <div className="mt-3 text-xs text-blue-400">
          Chance: {(100 / targetMultiplier).toFixed(2)}%
        </div>
      </div>
  )
}

export default TargetMultiplier