import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhatIsItSection } from './components/WhatIsItSection';
import { BookExampleSection } from './components/BookExampleSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhatIsIncludedSection } from './components/WhatIsIncludedSection';
import { PricingSection } from './components/PricingSection';
import { WhyValueSection } from './components/WhyValueSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { SeoHead } from './components/SeoHead';
import { I18nProvider } from '../i18n';

export default function App() {
  return (
    <I18nProvider initialLocale='ru'>
      <div className='app-shell'>
        <SeoHead />
        <Navbar />

        <main className='app-main'>
          <section id='hero'>
            <HeroSection />
          </section>

          <section id='what' className='deferred-section'>
            <WhatIsItSection />
          </section>

          <section id='example' className='deferred-section'>
            <BeforeAfterSection />
            <BookExampleSection />
          </section>

          <div className='deferred-section'>
            <WhyValueSection />
          </div>

          <section id='how' className='deferred-section'>
            <HowItWorksSection />
          </section>

          <div className='deferred-section'>
            <WhatIsIncludedSection />
          </div>

          <section id='pricing' className='deferred-section'>
            <PricingSection />
          </section>

          <section id='faq' className='deferred-section'>
            <FAQSection />
          </section>

          <div className='deferred-section'>
            <CTASection />
          </div>
        </main>

        <Footer />
      </div>
    </I18nProvider>
  );
}
