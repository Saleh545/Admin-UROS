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
import OwnerDashboard from '../pages/Ownerdashboard'
import MarketingPromo from '../pages/MarketingPromo'
import StaffAccess from '../pages/StaffAccess'
import SecurityLogs from '../pages/SecurityLogs'
import VenueSettings from '../pages/VenueSettings'
import Analytics from '../pages/Analytics'
import WhatsNew from '../pages/WhatsNew'
import HelpSupport from '../pages/HelpSupport'
import Billing from '../pages/Billing'
import LiveOrders from '../pages/LiveOrders'
import StaffProfile from '../pages/StaffProfile'
import ChatCRM from '../pages/ChatCRM'
import ReviewsFeedback from '../pages/ReviewsFeedback'
import MenuManagement from '../pages/MenuManagement'
import ProfileSettings from '../pages/ProfileSettings'

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
      <Route path="/dashboard" element={<OwnerDashboard/>} />
      <Route path="/marketing" element={<MarketingPromo/>} />
      <Route path="/staff" element={<StaffAccess/>} />
      <Route path="/security" element={<SecurityLogs/>} />
      <Route path="/venue-settings" element={<VenueSettings/>} />
      <Route path="/analytics" element={<Analytics/>} />
      <Route path="/whats-new" element={<WhatsNew/>} />
      <Route path="/help-support" element={<HelpSupport/>} />
      <Route path="/billing" element={<Billing/>} />
      <Route path="/live-orders" element={<LiveOrders/>} />
      <Route path="/staff-profile" element={<StaffProfile/>} />
      <Route path="/chat" element={<ChatCRM/>} />
      <Route path="/reviews" element={<ReviewsFeedback/>} />
      <Route path="/menu-management" element={<MenuManagement/>} />
      <Route path="/profile-settings" element={<ProfileSettings/>} />
    </Routes>
  )
}

export default AppRoutes