import ConsultationProfile from "./consultation.profile"
import FreelanceProfile from "./freelance.profile"
import FullTimeProfile from "./full-time.profile"
import ServicesSection from "./service-section"

function Services() {
  return (
    <div>
      <div className="grid 2xl:grid-cols-7 xl:grid-cols-2 grid-cols-1 w-full gap-8">
        <div className="2xl:col-span-3 w-full card p-7">
          <FullTimeProfile />
        </div>
        <div className="2xl:col-span-4 w-full space-y-8">
          <div className="card p-7">
            <FreelanceProfile />
          </div>
          <div className="card p-7">
            <ConsultationProfile />
          </div>
        </div>
      </div>
      <ServicesSection />
    </div>
  )
}

export default Services
