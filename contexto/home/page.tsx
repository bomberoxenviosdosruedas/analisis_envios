import type { Metadata } from 'next';
import HeroAnimado from './HeroAnimado';
import SegmentosHome from './SegmentosHome';
import ServicesOverview from './ServicesOverview';
import LogisticaHomeSection from './LogisticaHomeSection';
import EmprendedoresHome from './EmprendedoresHome';
import MarDeliveryHomeSection from './MarDeliveryHomeSection';
import CtaSection from './CtaSection';
import SocialProofSection from './SocialProofSection';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  description:
    'Mensajería en moto y logística e-commerce en Mar del Plata. Envíos Express en franja de 3 hs, Mercado Envíos Flex en el día y reparto LowCost. Cotizá online.',
  alternates: {
    canonical: `${baseUrl}/`,
  },
  openGraph: {
    title: 'Mensajería en moto en Mar del Plata | Envíos DosRuedas',
    description:
      'La solución logística y última milla de mayor confianza en Mar del Plata. Envíos Express, MercadoLibre Flex, ruteo eficiente y cadetería inteligente.',
    url: `${baseUrl}/`,
    type: 'website',
    locale: 'es_AR',
    images: [`${baseUrl}/og-image.jpg`],
  },
};

export default function HomePage() {
  return (
    <div
      id="home-page-container"
      className="bg-brand-white text-brand-ink selection:bg-brand-yellow selection:text-brand-blue overflow-x-hidden"
    >
      <HeroAnimado />
      <SegmentosHome />
      <ServicesOverview />
      <LogisticaHomeSection />
      <EmprendedoresHome />
      <MarDeliveryHomeSection />
      <SocialProofSection />
      <CtaSection />
    </div>
  );
}
