import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Restaurants from '../pages/Restaurants' // Bunu əlavə et
import VenueDashboard from '../pages/VenueDashboard'
import Users from '../pages/Users'
import PricingPlans from '../pages/PricingPlans'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/restaurants" element={<Restaurants />} /> {/* Yeni Səhifə */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/venue-dashboard" element={<VenueDashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/pricing" element={<PricingPlans/>} />
    </Routes>
  )
}

export default AppRoutes