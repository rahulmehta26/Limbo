import React from 'react'
import {motion, AnimatePresence } from 'motion/react'
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

const LossandProfit = ({history}) => {
    return (
      
        <div className=' mt-10 gap-4 grid md:grid-cols-2 lg:grid-cols-3 ' >

            <AnimatePresence>
                  {history.map((crash, index) => (
                    <motion.div
                      key={crash.timestamp.getTime()}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`flex justify-between items-center p-2 lg:px-3 gap-x-4 rounded-lg border ${
                        crash.won
                          ? 'bg-green-900/20 border-green-700/30 text-green-300'
                          : 'bg-red-900/20 border-red-700/30 text-red-300'
                      }`}
                    >
                      <div className="flex items-center gap-x-1 ">
                        {crash.won ? (
                          <IconTrendingUp className="w-4 h-4" />
                        ) : (
                          <IconTrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          ₹{crash.betAmount} @ {crash.userMultiplier.toFixed(2)}×
                        </span>
                      </div>
                          
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          Crashed: {crash.crashMultiplier.toFixed(2)}×
                        </div>
                        <div className="text-xs">
                          {crash.won ? `+₹${crash.payout.toFixed(2)}` : 'Lost'}
                        </div>
                      </div>
                    </motion.div>
                  ))}
             </AnimatePresence>
        </div>
            
  )
}

export default LossandProfit