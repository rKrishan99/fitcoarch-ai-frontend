import React from 'react'
import HeroSection from '../../components/homeSections/HeroSection';
import FeaturesSection from '../../components/homeSections/FeaturesSection';
import HowItWorksSection from '../../components/homeSections/HowItWorksSection';
import TestimonialsSection from '../../components/homeSections/TestimonialsSection';

const Home = () => {
  return (
    <div className=''>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <TestimonialsSection/>
    </div>
  )
}

export default Home;