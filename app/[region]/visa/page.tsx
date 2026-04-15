"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Star, MapPin, CheckCircle2, ShieldCheck, Globe, Building2, Map, Users, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

import { destinations } from '@/app/data/visaData';
import { getCountryConfig, formatRegionalPrice } from '@/config/country';
import VisaCard from '@/app/components/visa/VisaCard';

// Experts Data
const experts = [
  { name: "Rahim Sayyed", role: "Senior Visa Officer", exp: "5 yrs", img: "https://ui-avatars.com/api/?name=Rahim+Sayyed&background=f3f4f6&color=191974" },
  { name: "Sameer Kazi", role: "Senior Visa Officer", exp: "4 yrs", img: "https://ui-avatars.com/api/?name=Sameer+Kazi&background=f3f4f6&color=191974" },
  { name: "Adil Ansari", role: "Holiday Expert", exp: "3 yrs", img: "https://ui-avatars.com/api/?name=Adil+Ansari&background=f3f4f6&color=191974" },
  { name: "Anushree Manoj", role: "Visa Officer", exp: "2 yrs", img: "https://ui-avatars.com/api/?name=Anushree+Manoj&background=f3f4f6&color=ee2229" }
];

const allCountries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "Dubai (UAE)", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const sourceAwareData: Record<string, Record<string, any>> = {
  "United Arab Emirates": {
    "India": {
      name: "India",
      slug: "india",
      price: "180",
      image: "https://images.unsplash.com/photo-1524492707947-2f10a7b4dd30?auto=format&fit=crop&q=80&w=1200",
      type: "E-VISA",
      valid: "30 DAYS",
      docs: ["Passport Copy", "Photo", "UAE Residence Visa"],
      flag: "in",
      continent: "Asia",
      startingPrice: "180",
      partner: "Official India Visa Agent in UAE",
      visaTypes: [
        { name: "Tourist E-Visa (30 Days)", pop: true, pTime: "3-5 days", stay: "30 days", valid: "30 days", entry: "Double", fees: "180" },
        { name: "Business E-Visa", pop: false, pTime: "3-5 days", stay: "60 days", valid: "1 year", entry: "Multiple", fees: "350" }
      ],
      attractions: [
        { title: "Taj Mahal", desc: "The iconic ivory-white marble mausoleum in Agra." },
        { title: "Red Fort", desc: "Historical fortification in the city of Delhi." }
      ],
      embassy: "Embassy of India, Abu Dhabi, UAE"
    }
  },
  "Dubai (UAE)": {
    "India": {
      name: "India",
      slug: "india",
      price: "180",
      image: "https://images.unsplash.com/photo-1524492707947-2f10a7b4dd30?auto=format&fit=crop&q=80&w=1200",
      type: "E-VISA",
      valid: "30 DAYS",
      docs: ["Passport Copy", "Photo", "UAE Residence Visa"],
      flag: "in",
      continent: "Asia",
      startingPrice: "180",
      partner: "Official India Visa Agent in UAE",
      visaTypes: [
        { name: "Tourist E-Visa (30 Days)", pop: true, pTime: "3-5 days", stay: "30 days", valid: "30 days", entry: "Double", fees: "180" },
        { name: "Business E-Visa", pop: false, pTime: "3-5 days", stay: "60 days", valid: "1 year", entry: "Multiple", fees: "350" }
      ],
      attractions: [
        { title: "Taj Mahal", desc: "The iconic ivory-white marble mausoleum in Agra." },
        { title: "Red Fort", desc: "Historical fortification in the city of Delhi." }
      ],
      embassy: "Embassy of India, Abu Dhabi, UAE"
    }
  }
};

export default function VisaServicesPage() {
  const params = useParams();
  const region = params?.region as string || "en-in";
  const countryConfig = getCountryConfig(region);

  const [citizenOf, setCitizenOf] = useState(countryConfig.name);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeContinent, setActiveContinent] = useState("All");
  const [citizenOpen, setCitizenOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);

  const continents = ["All", "Asia", "Europe", "Americas", "Africa", "Oceania"];

  // Logic for accurate data based on source
  const getDisplayDestinations = () => {
    let baseDestinations = [...destinations];

    // Check if we have source-aware accurate data for the selected citizen country
    const sourceData = sourceAwareData[citizenOf];
    if (sourceData) {
      // If we have specific requirements for this citizen context, inject them
      Object.entries(sourceData).forEach(([destName, data]) => {
        const index = baseDestinations.findIndex(d => d.name === destName);
        if (index !== -1) {
          baseDestinations[index] = { ...baseDestinations[index], ...data };
        } else {
          baseDestinations.push(data as any);
        }
      });
    }

    return baseDestinations.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = activeContinent === "All" || dest.continent === activeContinent;
      return matchesSearch && matchesContinent;
    });
  };

  const filteredDestinations = getDisplayDestinations();

  const resetFilters = () => {
    setSearchQuery("");
    setCitizenOf(countryConfig.name);
    setActiveContinent("All");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="bg-[#191974] pt-24 pb-16 px-4 relative overflow-hidden flex-1">
        <div className="max-w-6xl mx-auto text-center relative z-10 pt-10">
          <motion.h5
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-3xl md:text-6xl mb-8 tracking-tight leading-tight"
          >
            Choose Destination.<br /> We'll Handle the <span className="text-[#ee2229]">Visa</span>
          </motion.h5>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-2xl md:rounded-full p-2 mb-8 shadow-2xl relative">
            {/* CITIZEN OF */}
            <div className="flex-1 relative flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-100 group">
              <MapPin className="text-[#ee2229] w-5 h-5 mr-3 shrink-0" />
              <div className="flex flex-col items-start text-left w-full">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-0.5">Citizen of</span>
                <input
                  type="text"
                  value={citizenOf}
                  onChange={(e) => { setCitizenOf(e.target.value); setCitizenOpen(true); }}
                  onFocus={() => setCitizenOpen(true)}
                  onBlur={() => setTimeout(() => setCitizenOpen(false), 200)}
                  className="w-full text-[#191974] font-bold p-0 border-none outline-none bg-transparent"
                />
              </div>

              {citizenOpen && (
                <div className="absolute top-full left-0 w-full md:w-64 bg-white shadow-2xl rounded-2xl mt-4 z-50 border border-gray-100 overflow-hidden py-2 text-left">
                  {allCountries.filter(c => c.toLowerCase().includes(citizenOf.toLowerCase())).map(country => (
                    <div
                      key={country}
                      onClick={() => { setCitizenOf(country); setCitizenOpen(false); }}
                      className="px-6 py-2.5 hover:bg-gray-50 cursor-pointer text-[#191974] font-medium text-sm transition-colors"
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TRAVELLING TO */}
            <div className="flex-[1.5] relative flex items-center px-6 py-4">
              <Search className="text-[#ee2229] w-5 h-5 mr-3 shrink-0" />
              <div className="flex flex-col items-start w-full text-left">
                <span className="text-[10px] text-gray-400 font-bold tracking-widest mb-0.5">Travelling to</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setDestinationOpen(true); }}
                  onFocus={() => setDestinationOpen(true)}
                  onBlur={() => setTimeout(() => setDestinationOpen(false), 200)}
                  placeholder="Enter country name..."
                  className="w-full text-[#191974] font-bold p-0 border-none outline-none bg-transparent placeholder-gray-300"
                />
              </div>

              {destinationOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-2xl mt-4 z-50 border border-gray-100 overflow-hidden py-2 text-left">
                  {destinations.map(d => d.name).filter(c => c.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8).map(country => (
                    <div
                      key={country}
                      onClick={() => { setSearchQuery(country); setDestinationOpen(false); }}
                      className="px-6 py-2.5 hover:bg-gray-50 cursor-pointer text-[#191974] font-medium text-sm transition-colors"
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="bg-[#ee2229] hover:bg-[#191974] active:scale-95 text-white font-bold py-4 px-12 rounded-xl md:rounded-full transition-all tracking-[0.2em] text-[13px] shadow-xl shadow-red-500/20">
              SEARCH
            </button>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </section>

      {/* 2. POPULAR DESTINATIONS */}
      <section className="py-16 px-4 bg-white min-h-[600px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-[32px] md:text-[42px]  text-[#191974] leading-tight ">Explore Destinations</h2>
              <p className="text-gray-400 mt-2 font-medium">Showing visa requirements for {citizenOf} citizens.</p>
            </div>

            {/* Continent Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
              {continents.map((continent) => (
                <button
                  key={continent}
                  onClick={() => setActiveContinent(continent)}
                  className={`px-5 py-2.5 rounded-xl text-[12px]   tracking-widest transition-all ${activeContinent === continent
                    ? 'bg-white text-[#ee2229] shadow-md shadow-black/5 border border-gray-100'
                    : 'text-gray-400 hover:text-[#191974]'
                    }`}
                >
                  {continent}
                </button>
              ))}
            </div>
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.map((dest, i) => (
                <VisaCard
                  key={`${dest.slug}-${citizenOf}`}
                  dest={dest}
                  region={region}
                  index={i}
                  citizenOf={citizenOf}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-24 text-center bg-gray-50 rounded-[48px] border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Globe className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-[22px]  text-[#191974] mb-3 tracking-tight">No destinations found</h3>
              <p className="text-gray-400 font-medium mb-10 max-w-md mx-auto">We couldn&apos;t find any visa services matching your criteria. Try adjusting your search or continent selection.</p>
              <button
                onClick={resetFilters}
                className="bg-[#191974] hover:bg-[#ee2229] text-white px-10 py-4 rounded-full  text-[13px]  tracking-widest transition-all shadow-xl shadow-blue-900/10 active:scale-95"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      3. MEET OUR VISA EXPERTS


      {/* 4. HOW IT WORKS */}






      {/* 8. COUNTRY DIRECTORY FOOTER */}
      < section className="py-20 px-4 bg-white border-t border-gray-200" >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl text-gray-300 mb-10 text-center  tracking-[0.3em]">Global Visa Directory</h3>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-b border-gray-100 mb-12">
            {["Asia", "Europe", "North America", "South America", "Australia", "Africa", "Gulf"].map((continent) => (
              <button
                key={continent}
                onClick={() => setActiveContinent(continent)}
                className={`pb-5 text-sm tracking-widest  transition-all relative ${activeContinent === continent ? 'text-[#ee2229]' : 'text-gray-400 hover:text-[#191974]'}`}
              >
                {continent}
                {activeContinent === continent && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ee2229] rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Directory Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {activeContinent === "Asia" && (
              <>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">East Asia</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/japan`} className="hover:text-[#ee2229] transition-colors">Japan Visa</Link></li>
                    <li><Link href={`/${region}/visa/china`} className="hover:text-[#ee2229] transition-colors">China Visa</Link></li>
                    <li><Link href={`/${region}/visa/south-korea`} className="hover:text-[#ee2229] transition-colors">South Korea Visa</Link></li>
                    <li><Link href={`/${region}/visa/taiwan`} className="hover:text-[#ee2229] transition-colors">Taiwan Visa</Link></li>
                    <li><Link href={`/${region}/visa/hong-kong`} className="hover:text-[#ee2229] transition-colors">Hong Kong Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Southeast Asia</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/singapore`} className="hover:text-[#ee2229] transition-colors">Singapore Visa</Link></li>
                    <li><Link href={`/${region}/visa/malaysia`} className="hover:text-[#ee2229] transition-colors">Malaysia Visa</Link></li>
                    <li><Link href={`/${region}/visa/thailand`} className="hover:text-[#ee2229] transition-colors">Thailand Visa</Link></li>
                    <li><Link href={`/${region}/visa/vietnam`} className="hover:text-[#ee2229] transition-colors">Vietnam Visa</Link></li>
                    <li><Link href={`/${region}/visa/indonesia`} className="hover:text-[#ee2229] transition-colors">Indonesia Visa</Link></li>
                    <li><Link href={`/${region}/visa/cambodia`} className="hover:text-[#ee2229] transition-colors">Cambodia Visa</Link></li>
                    <li><Link href={`/${region}/visa/laos`} className="hover:text-[#ee2229] transition-colors">Laos Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">West & Central Asia</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/united-arab-emirates`} className="hover:text-[#ee2229] transition-colors">UAE Visa</Link></li>
                    <li><Link href={`/${region}/visa/oman`} className="hover:text-[#ee2229] transition-colors">Oman Visa</Link></li>
                    <li><Link href={`/${region}/visa/turkey`} className="hover:text-[#ee2229] transition-colors">Turkey Visa</Link></li>
                    <li><Link href={`/${region}/visa/jordan`} className="hover:text-[#ee2229] transition-colors">Jordan Visa</Link></li>
                    <li><Link href={`/${region}/visa/uzbekistan`} className="hover:text-[#ee2229] transition-colors">Uzbekistan Visa</Link></li>
                    <li><Link href={`/${region}/visa/azerbaijan`} className="hover:text-[#ee2229] transition-colors">Azerbaijan Visa</Link></li>
                    <li><Link href={`/${region}/visa/georgia`} className="hover:text-[#ee2229] transition-colors">Georgia Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">South Asia</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/sri-lanka`} className="hover:text-[#ee2229] transition-colors">Sri Lanka Visa</Link></li>
                    <li><Link href={`/${region}/visa/russia`} className="hover:text-[#ee2229] transition-colors">Russia Visa</Link></li>
                  </ul>
                </div>
              </>
            )}
            {activeContinent === "Europe" && (
              <>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Western Europe</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/france`} className="hover:text-[#ee2229] transition-colors">France Visa</Link></li>
                    <li><Link href={`/${region}/visa/netherlands`} className="hover:text-[#ee2229] transition-colors">Netherlands Visa</Link></li>
                    <li><Link href={`/${region}/visa/switzerland`} className="hover:text-[#ee2229] transition-colors">Switzerland Visa</Link></li>
                    <li><Link href={`/${region}/visa/austria`} className="hover:text-[#ee2229] transition-colors">Austria Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">British Isles</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/united-kingdom`} className="hover:text-[#ee2229] transition-colors">United Kingdom Visa</Link></li>
                    <li><Link href={`/${region}/visa/ireland`} className="hover:text-[#ee2229] transition-colors">Ireland Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Southern Europe</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/spain`} className="hover:text-[#ee2229] transition-colors">Spain Visa</Link></li>
                    <li><Link href={`/${region}/visa/greece`} className="hover:text-[#ee2229] transition-colors">Greece Visa</Link></li>
                    <li><Link href={`/${region}/visa/italy`} className="hover:text-[#ee2229] transition-colors">Italy Visa</Link></li>
                  </ul>
                </div>
              </>
            )}
            {activeContinent === "North America" && (
              <>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Major Destinations</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/united-states`} className="hover:text-[#ee2229] transition-colors">United States Visa</Link></li>
                    <li><Link href={`/${region}/visa/canada`} className="hover:text-[#ee2229] transition-colors">Canada Visa</Link></li>
                  </ul>
                </div>
              </>
            )}
            {activeContinent === "Australia" && (
              <>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Oceania</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/australia`} className="hover:text-[#ee2229] transition-colors">Australia Visa</Link></li>
                    <li><Link href={`/${region}/visa/new-zealand`} className="hover:text-[#ee2229] transition-colors">New Zealand Visa</Link></li>
                  </ul>
                </div>
              </>
            )}
            {activeContinent === "Africa" && (
              <>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Sub-Saharan Africa</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/south-africa`} className="hover:text-[#ee2229] transition-colors">South Africa Visa</Link></li>
                    <li><Link href={`/${region}/visa/kenya`} className="hover:text-[#ee2229] transition-colors">Kenya Visa</Link></li>
                    <li><Link href={`/${region}/visa/zimbabwe`} className="hover:text-[#ee2229] transition-colors">Zimbabwe Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#191974] tracking-widest  text-xs mb-6">North Africa</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/egypt`} className="hover:text-[#ee2229] transition-colors">Egypt Visa</Link></li>
                    <li><Link href={`/${region}/visa/morocco`} className="hover:text-[#ee2229] transition-colors">Morocco Visa</Link></li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section >
    </div >
  );
}
