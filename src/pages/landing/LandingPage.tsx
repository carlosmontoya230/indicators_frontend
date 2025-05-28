import CompanySection from "../../components/organisms/landing/CompanySection";
import Footer from "../../components/organisms/landing/Footer";
import Header from "../../components/organisms/landing/Header";
import "./landing.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <Header />
      <main>
        <CompanySection />
      </main>
      <Footer />
    </div>
  );
}
