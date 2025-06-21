import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/frontend_assets/assets'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleClose = () => {
    setShowLogin(false)
    navigate('/home')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currState === "Login") {
        const res = await axios.post("http://localhost:4000/api/user/login", {
          email: formData.email,
          password: formData.password
        })
        toast.success("Login successful!")
      } else {
        const res = await axios.post("http://localhost:4000/api/user/regitser", {
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
        toast.success("Registration successful!")
      }
      handleClose()
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{currState}</h2>
          <img
            onClick={handleClose}
            src={assets.cross_icon}
            alt="close"
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        <div className="space-y-4">
          {currState !== "Login" && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {currState !== "Login" && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox" required className="w-4 h-4" />
              <p>
                By continuing, I agree to the{" "}
                <a href="#" className="underline text-blue-600">
                  Terms of Use
                </a>{" "}
                &{" "}
                <a href="#" className="underline text-blue-600">
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <p className="mt-4 text-center text-gray-700 text-sm">
          {currState === "Login" ? (
            <>
              Create a new account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="cursor-pointer text-blue-600 hover:underline"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="cursor-pointer text-blue-600 hover:underline"
              >
                Login here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default LoginPopup
