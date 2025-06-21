import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = ({setShowLogin}) => {
  return (
    <div className="relative w-full h-screen bg-gray-100">
      {/* Bottom buttons, stacked */}
      <div className="absolute bottom-10 w-full flex flex-col items-center gap-4">
        <Link to="/sign-in" onClick={()=>setShowLogin(true)}  className="w-1/2">
          <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign in
          </button>
        </Link>
        <Link to="/home" className="w-1/2">
          <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Get started
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
