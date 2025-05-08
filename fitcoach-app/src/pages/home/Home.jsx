import React from 'react'
import HeroSection from '../../components/homeSections/HeroSection';
import FeaturesSection from '../../components/homeSections/FeaturesSection';
import HowItWorksSection from '../../components/homeSections/HowItWorksSection';
import TestimonialsSection from '../../components/homeSections/TestimonialsSection';
import CTSSection from '../../components/homeSections/CTSSection';

const Home = () => {
  return (
    <div className='min-h-screen'>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <TestimonialsSection/>
      <CTSSection/>
    </div>
  )
}

export default Home;