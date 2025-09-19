import React from 'react'
import { IconTrendingUp } from '@tabler/icons-react'

const Header = ({ balance }) => {
    
  return (
  <div className="flex justify-between items-center max-w-7xl mx-auto p-6 border-b border-blue-800/30">

    <div className="flex items-center gap-2 text-md md:xl lg:text-2xl font-bold">
      <IconTrendingUp className="w-6 h-6 text-blue-400" />
      Limbo
    </div>

    <div className="flex items-center ">
      <span className="text-xs md:text-sm text-blue-300">Balance: ₹{balance.toFixed(2)}</span>
    </div>
  </div>
  )
}

export default Header