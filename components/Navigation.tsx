import SiteHeader from "@/components/site-chrome/SiteHeader";
import AcademySubnav from "@/components/site-chrome/AcademySubnav";

export default function Navigation() {
  return (
    <div className="sticky top-0 z-50">
      <SiteHeader />
      <AcademySubnav />
    </div>
  );
}
