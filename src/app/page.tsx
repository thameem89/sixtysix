import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import {
  Hero,
  Introduction,
  FeaturedServices,
  GroomingCampaign,
  Experience,
  PeopleAndProducts,
  LaunchCampaign,
  InstagramSection,
  Visit,
  PrioritySection,
} from "@/components/HomeSections";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Introduction />
      <FeaturedServices />
      <GroomingCampaign />
      <Experience />
      <Gallery />
      <PeopleAndProducts />
      <InstagramSection />
      <LaunchCampaign />
      <PrioritySection />
      <FAQ />
      <Visit />
    </main>
  );
}
