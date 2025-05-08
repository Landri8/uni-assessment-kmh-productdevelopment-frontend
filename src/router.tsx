import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import SolutionsScreen from './screens/SolutionsScreen'
import ContactScreen from './screens/ContactScreen'
import AdminLoginScreen from './screens/admin/AdminLoginScreen'
import GuestMiddleware from './middlewares/GuestMiddleware'
import AuthMiddleware from './middlewares/AuthMiddleware'
import AdminWelcomeScreen from './screens/admin/AdminWelcomeScreen'
import AdminCustomerQueriesListScreen from './screens/admin/AdminCustomerQueriesListScreen'
import AdminCustomerQueryDetailsScreen from './screens/admin/AdminCustomerQueryDetailsScreen'
import AdminUserListScreen from './screens/admin/AdminUserListScreen'
import AdminUserDetailsScreen from './screens/admin/AdminUserDetailsScreen'
import AdminUserCreationScreen from './screens/admin/AdminUserCreationScreen'
import EventsScreen from './screens/EventsScreen'
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen'
import AdminEventCreationScreen from './screens/admin/AdminEventCreationScreen'
import AdminEventListScreen from './screens/admin/AdminEventListScreen'
import AdminEventDetailsScreen from './screens/admin/AdminEventDetailsScreen'
import TestimonialsScreen from './screens/TestimonialsScreen'
import AdminFeedbackListScreen from './screens/admin/AdminFeedbackListScreen'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' Component={HomeScreen} />
      <Route path='/aboutus' Component={AboutScreen} />
      <Route path='/solutions' Component={SolutionsScreen} />
      <Route path='/events' Component={EventsScreen} />
      <Route path='/testimonials' Component={TestimonialsScreen} />
      <Route path='/contactus' Component={ContactScreen} />

      <Route path='/admin'>
        <Route Component={GuestMiddleware}>
          <Route path='login' Component={AdminLoginScreen} />
        </Route>

        <Route Component={AuthMiddleware}>
          <Route index Component={AdminWelcomeScreen} />
          <Route path='dashboard' Component={AdminDashboardScreen} />
          <Route path='queries' Component={AdminCustomerQueriesListScreen} />
          <Route path='queries/:id' Component={AdminCustomerQueryDetailsScreen} />
          <Route path='users' Component={AdminUserListScreen} />
          <Route path='users/create' Component={AdminUserCreationScreen} />
          <Route path='users/:id' Component={AdminUserDetailsScreen} />
          <Route path='events' Component={AdminEventListScreen} />
          <Route path='events/create' Component={AdminEventCreationScreen} />
          <Route path='events/:id' Component={AdminEventDetailsScreen} />
          <Route path='feedbacks' Component={AdminFeedbackListScreen} />
        </Route>

      </Route>

    </Routes>
  )
}

export default Router