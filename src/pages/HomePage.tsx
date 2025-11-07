import Hero from '../components/Hero';
import Solutions from '../components/Solutions';
import Process from '../components/Process';
import Industries from '../components/Industries';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Resources from '../components/Resources';
import CostCalculator from '../components/CostCalculator';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Solutions />
      <Process />
      <Industries />
      <About />
      <Testimonials />
      <CostCalculator />
      <Resources />
      <Contact />
    </>
  );
}
