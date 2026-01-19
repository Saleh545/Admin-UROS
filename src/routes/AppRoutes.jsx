import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Restaurants from '../pages/Restaurants' // Bunu əlavə et
import VenueDashboard from '../pages/VenueDashboard'
import Users from '../pages/Users'
import PricingPlans from '../pages/PricingPlans'
import N8nAutomation from '../pages/N8nAutomation'
import SupportTickets from '../pages/SupportTickets'
import PushNotifications from '../pages/PushNotifications'
import SystemReleases from '../pages/SystemReleases'
import GlobalLogs from '../pages/GlobalLogs'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/restaurants" element={<Restaurants />} /> 
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/venue-dashboard" element={<VenueDashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/pricing" element={<PricingPlans/>} />
      <Route path="/automation" element={<N8nAutomation/>} />
      <Route path="/support" element={<SupportTickets/>} />
      <Route path="/push" element={<PushNotifications/>} />
      <Route path="/releases" element={<SystemReleases/>} />
      <Route path="/logs" element={<GlobalLogs/>} />
    </Routes>
  )
}

export default AppRoutes