export interface VisaDestination {
  name: string;
  slug: string;
  price: string;
  image: string;
  type: string;
  valid: string;
  docs: string[];
  flag: string;
  continent: string;
  startingPrice: string;
  partner: string;
  visaTypes: { name: string; pop: boolean; pTime: string; stay: string; valid: string; entry: string; fees: string }[];
  attractions: { title: string; desc: string }[];
  embassy: string;
  sampleVisaImg?: string;
}

export const destinations: VisaDestination[] = [
  {
    name: "Vietnam", slug: "vietnam", price: "2,100", 
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "vn", continent: "Asia",
    startingPrice: "2,100", partner: "Authorised Vietnam Visa Expert",
    visaTypes: [
      { name: "Tourist E-Visa (Single Entry)", pop: true, pTime: "3-5 days", stay: "30 days", valid: "30 days", entry: "Single", fees: "2,100" },
      { name: "Tourist E-Visa (Multiple Entry)", pop: false, pTime: "3-5 days", stay: "30 days", valid: "30 days", entry: "Multiple", fees: "4,500" }
    ],
    attractions: [
      { title: "Ha Long Bay", desc: "Thousands of towering limestone karsts and isles in various shapes and sizes." },
      { title: "Hoi An Ancient Town", desc: "An exceptionally well-preserved example of a South-East Asian trading port." },
      { title: "Cu Chi Tunnels", desc: "An immense network of connecting tunnels located in the Củ Chi District of Ho Chi Minh City." },
      { title: "Phong Nha-Ke Bang", desc: "Home to the oldest karst mountains in Asia and the world's largest cave." }
    ],
    embassy: "20, Kautilya Marg, Chanakyapuri, New Delhi – 110 021, India",
    sampleVisaImg: "/images/visas/vietnam.png"
  },
  {
    name: "Thailand", slug: "thailand", price: "0", 
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "60 DAYS", docs: ["Passport", "Tickets"], flag: "th", continent: "Asia",
    startingPrice: "0", partner: "Official Thailand Visa Facilitator",
    visaTypes: [
      { name: "Tourist Visa (Visa-Free)", pop: true, pTime: "Instant", stay: "60 days", valid: "60 days", entry: "Single", fees: "0" },
      { name: "E-Visa On Arrival", pop: false, pTime: "24-48 hours", stay: "15 days", valid: "30 days", entry: "Single", fees: "2,500" }
    ],
    attractions: [
      { title: "The Grand Palace", desc: "A complex of buildings at the heart of Bangkok, the official residence of the Kings of Siam." },
      { title: "Wat Arun", desc: "A Buddhist temple in Bangkok, located on the Thonburi west bank of the Chao Phraya River." },
      { title: "Phi Phi Islands", desc: "An island group in Thailand, between the large island of Phuket and the Straits of Malacca." },
      { title: "Railay Beach", desc: "A small peninsula between the city of Krabi and Ao Nang in Thailand." }
    ],
    embassy: "56-N, Nyaya Marg, Chanakyapuri, New Delhi – 110 021, India",
    sampleVisaImg: "/images/visas/thailand.png"
  },
  {
    name: "Dubai", slug: "dubai", price: "3,499", 
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA / VOA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "ae", continent: "Asia",
    startingPrice: "3,499", partner: "Authorised UAE Visa Agent",
    visaTypes: [
      { name: "48 Hours Transit Visa", pop: false, pTime: "Upto 3 days", stay: "2 days", valid: "30 days", entry: "Single", fees: "3,499" },
      { name: "30 Days Tourist Visa", pop: true, pTime: "Upto 5 days", stay: "30 days", valid: "30 days", entry: "Single", fees: "6,900" },
      { name: "60 Days Tourist Visa", pop: false, pTime: "Upto 5 days", stay: "60 days", valid: "60 days", entry: "Single", fees: "13,900" }
    ],
    attractions: [
      { title: "Burj Khalifa", desc: "The tallest building in the world, offering spectacular panoramic views of the city." },
      { title: "Dubai Mall", desc: "A massive shopping, entertainment, and leisure complex located next to the Burj Khalifa." },
      { title: "Palm Jumeirah", desc: "A phenomenal man-made island shaped like a palm tree, featuring luxury resorts." },
      { title: "Museum of the Future", desc: "A landmark devoted to innovative and futuristic ideologies." }
    ],
    embassy: "12, Chandragupta Marg, Chanakyapuri, New Delhi – 110 021, India",
    sampleVisaImg: "/images/visas/dubai.png"
  },
  {
    name: "Spain", slug: "spain", price: "8,900", 
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport", "Insurance"], flag: "es", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [
      { name: "Short-stay Schengen Visa (Tourism)", pop: true, pTime: "15-30 days", stay: "Up to 90 days", valid: "6 months", entry: "Single/Multiple", fees: "8,900" },
      { name: "Business Schengen Visa", pop: false, pTime: "15-30 days", stay: "Up to 90 days", valid: "6 months", entry: "Multiple", fees: "9,500" }
    ],
    attractions: [
      { title: "Sagrada Família", desc: "Gaudí's iconic unfinished basilica in Barcelona, a masterpiece of Modernism." },
      { title: "Park Güell", desc: "A public park system composed of gardens and architectural elements in Barcelona." },
      { title: "Alhambra", desc: "A palace and fortress complex located in Granada, Andalusia, Spain." },
      { title: "Museo del Prado", desc: "Spain's national art museum, located in central Madrid." }
    ],
    embassy: "12, Prithviraj Road, New Delhi – 110 011, India"
  },
  {
    name: "Singapore", slug: "singapore", price: "2,500", 
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "sg", continent: "Asia",
    startingPrice: "2,500", partner: "Authorised Singapore Visa Agent",
    visaTypes: [
      { name: "Tourist E-Visa", pop: true, pTime: "3-4 days", stay: "Up to 30 days", valid: "35 days", entry: "Multiple", fees: "2,500" }
    ],
    attractions: [
      { title: "Gardens by the Bay", desc: "A showpiece of horticulture and garden artistry that presents the plant kingdom in a whole new way." },
      { title: "Marina Bay Sands", desc: "An integrated resort fronting Marina Bay in Singapore." },
      { title: "Sentosa Island", desc: "An island resort off Singapore's southern coast, connected to the city by road and cable car." },
      { title: "Universal Studios", desc: "A theme park located within Resorts World Sentosa on Sentosa Island." }
    ],
    embassy: "E-6, Chandragupta Marg, Chanakyapuri, New Delhi – 110 021, India",
    sampleVisaImg: "/images/visas/singapore.png"
  },
  {
    name: "United Kingdom", slug: "united-kingdom", price: "12,500", 
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "6 MONTHS", docs: ["Photo", "Passport", "Bank Statement"], flag: "gb", continent: "Europe",
    startingPrice: "12,500", partner: "Authorised UK Visa Facilitator",
    visaTypes: [
      { name: "Standard Visitor Visa (6 Months)", pop: true, pTime: "15 days", stay: "6 months", valid: "6 months", entry: "Multiple", fees: "12,500" },
      { name: "Standard Visitor Visa (2 Years)", pop: false, pTime: "15 days", stay: "6 months", valid: "2 years", entry: "Multiple", fees: "45,800" }
    ],
    attractions: [
      { title: "Big Ben & Westminster", desc: "Iconic clock tower and the heart of British politics." },
      { title: "London Eye", desc: "A giant Ferris wheel on the South Bank of the River Thames in London." },
      { title: "Tower of London", desc: "A historic castle on the north bank of the River Thames in central London." },
      { title: "Buckingham Palace", desc: "The London residence and administrative headquarters of the monarch of the United Kingdom." }
    ],
    embassy: "Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "United States", slug: "united-states", price: "15,500", 
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=1200", 
    type: "B1/B2", valid: "10 YEARS", docs: ["Photo", "Passport", "Interview"], flag: "us", continent: "Americas",
    startingPrice: "15,500", partner: "Authorised US Visa Expert",
    visaTypes: [
      { name: "B1/B2 Visitor Visa", pop: true, pTime: "Varies", stay: "Up to 6 months", valid: "10 years", entry: "Multiple", fees: "15,500" }
    ],
    attractions: [
      { title: "Statue of Liberty", desc: "A colossal neoclassical sculpture on Liberty Island in New York Harbor." },
      { title: "Grand Canyon", desc: "A steep-sided canyon carved by the Colorado River in Arizona." },
      { title: "Times Square", desc: "A major commercial intersection, tourist destination, and entertainment center in New York City." },
      { title: "Golden Gate Bridge", desc: "A suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay." }
    ],
    embassy: "Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Japan", slug: "japan", price: "3,750", 
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "jp", continent: "Asia",
    startingPrice: "3,750", partner: "Authorised Japan Visa Facilitator",
    visaTypes: [
      { name: "Short-term Tourist E-Visa", pop: true, pTime: "5-6 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "3,750" }
    ],
    attractions: [
      { title: "Mount Fuji", desc: "Japan's highest mountain and the most iconic landmark in the country." },
      { title: "Fushimi Inari-taisha", desc: "An important Shinto shrine in southern Kyoto." },
      { title: "Kinkaku-ji", desc: "A Zen Buddhist temple in Kyoto, also known as the Golden Pavilion." },
      { title: "Tokyo Skytree", desc: "A broadcasting and observation tower in Sumida, Tokyo." }
    ],
    embassy: "50-G, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Malaysia", slug: "malaysia", price: "0", 
    image: "https://images.unsplash.com/photo-1596422846543-75c6fa190074?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "30 DAYS", docs: ["Passport", "MDAC"], flag: "my", continent: "Asia",
    startingPrice: "0", partner: "Official Malaysia Visa Facilitator",
    visaTypes: [
      { name: "Tourist Visa (Visa-Free)", pop: true, pTime: "Instant", stay: "30 days", valid: "30 days", entry: "Single", fees: "0" }
    ],
    attractions: [
      { title: "Petronas Twin Towers", desc: "Identical skyscrapers in Kuala Lumpur, among the tallest in the world." },
      { title: "Batu Caves", desc: "A limestone hill that has a series of caves and cave temples in Gombak." },
      { title: "Genting Highlands", desc: "An integrated hilltop leisure city comprising hotels, shopping malls, theme parks and casinos." },
      { title: "Langkawi Sky Bridge", desc: "A 125-metre curved pedestrian cable-stayed bridge in Malaysia." }
    ],
    embassy: "50-M, Satya Marg, Chanakyapuri, New Delhi – 110 021, India",
    sampleVisaImg: "/images/visas/malaysia.png"
  },
  {
    name: "France", slug: "france", price: "8,900", 
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport", "Insurance"], flag: "fr", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [
      { name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }
    ],
    attractions: [
      { title: "Eiffel Tower", desc: "A wrought-iron lattice tower on the Champ de Mars in Paris, France." },
      { title: "Louvre Museum", desc: "The world's largest art museum and a historic monument in Paris." },
      { title: "Palace of Versailles", desc: "A former royal residence built by King Louis XIV located in Versailles." },
      { title: "Mont Saint-Michel", desc: "A tidal island and mainland commune in Normandy, France." }
    ],
    embassy: "2/50-E, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Switzerland", slug: "switzerland", price: "8,900", 
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport", "Insurance"], flag: "ch", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Swiss Visa Expert",
    visaTypes: [
      { name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }
    ],
    attractions: [
      { title: "Mount Pilatus", desc: "A mountain massif overlooking Lucerne in Central Switzerland." },
      { title: "Jungfraujoch", desc: "The 'Top of Europe', home to the highest railway station in Europe." },
      { title: "Lake Geneva", desc: "A crescent-shaped lake that borders Switzerland and France." },
      { title: "The Matterhorn", desc: "A mountain of the Alps, straddling the main watershed and border between Switzerland and Italy." }
    ],
    embassy: "Nyaya Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Canada", slug: "canada", price: "16,200", 
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "10 YEARS", docs: ["Photo", "Passport", "Bank Statement"], flag: "ca", continent: "Americas",
    startingPrice: "16,200", partner: "Authorised Canada Visa Expert",
    visaTypes: [
      { name: "Tourist Visitor Visa", pop: true, pTime: "30-60 days", stay: "6 months", valid: "Up to 10 years", entry: "Multiple", fees: "16,200" }
    ],
    attractions: [
      { title: "Niagara Falls", desc: "Formed by three waterfalls straddling the international border between Canada and the US." },
      { title: "Banff National Park", desc: "Canada's oldest national park, located in the Rocky Mountains." },
      { title: "CN Tower", desc: "A concrete communications and observation tower in downtown Toronto." },
      { title: "Whistler", desc: "A town north of Vancouver, BC, home to one of the largest ski resorts in North America." }
    ],
    embassy: "7/8, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Australia", slug: "australia", price: "12,999", 
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "1 YEAR", docs: ["Photo", "Passport"], flag: "au", continent: "Asia",
    startingPrice: "12,999", partner: "Authorised Australia Visa Agent",
    visaTypes: [
      { name: "Tourist Stream (Subclass 600)", pop: true, pTime: "15-25 days", stay: "Up to 12 months", valid: "1 year", entry: "Multiple", fees: "12,999" }
    ],
    attractions: [
      { title: "Sydney Opera House", desc: "A multi-venue performing arts centre in Sydney, Australia." },
      { title: "Great Barrier Reef", desc: "The world's largest coral reef system, located in the Coral Sea, off the coast of Queensland." },
      { title: "Uluru", desc: "A massive sandstone monolith in the heart of the Northern Territory's Red Centre." },
      { title: "Great Ocean Road", desc: "An Australian National Heritage listed 243-kilometre stretch of road along the south-eastern coast." }
    ],
    embassy: "1/50-G, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "South Africa", slug: "south-africa", price: "3,500", 
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "za", continent: "Africa",
    startingPrice: "3,500", partner: "Official South Africa Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "5-10 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "3,500" }],
    attractions: [{ title: "Kruger National Park", desc: "One of Africa's largest game reserves." }, { title: "Table Mountain", desc: "A flat-topped mountain forming a prominent landmark overlooking Cape Town." }],
    embassy: "B-18, Vasant Marg, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Russia", slug: "russia", price: "4,500", 
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "16 DAYS", docs: ["Photo", "Passport"], flag: "ru", continent: "Europe",
    startingPrice: "4,500", partner: "Authorised Russia Visa Expert",
    visaTypes: [{ name: "Unified E-Visa", pop: true, pTime: "4 days", stay: "16 days", valid: "60 days", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Red Square", desc: "A city square in Moscow, the historic center of the city." }, { title: "Hermitage Museum", desc: "A museum of art and culture in Saint Petersburg." }],
    embassy: "Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Turkey", slug: "turkey", price: "14,000", 
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport", "ITR"], flag: "tr", continent: "Europe",
    startingPrice: "14,000", partner: "Authorised Turkey Visa Expert",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "7-10 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "14,000" }],
    attractions: [{ title: "Hagia Sophia", desc: "A great architectural beauty and an important monument for both Byzantine and Ottoman Empires." }, { title: "Cappadocia", desc: "Known for its unique 'fairy chimneys' and hot air balloon rides." }],
    embassy: "50-N, Nyaya Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Egypt", slug: "egypt", price: "4,500", 
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport", "Photo"], flag: "eg", continent: "Africa",
    startingPrice: "4,500", partner: "Official Egypt Visa Facilitator",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "5-7 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Giza Pyramid Complex", desc: "Includes the Great Pyramid of Giza and the Great Sphinx." }, { title: "Valley of the Kings", desc: "A valley in Egypt where tombs were excavated for the Pharaohs and powerful nobles." }],
    embassy: "1-50-G, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Azerbaijan", slug: "azerbaijan", price: "2,200", 
    image: "https://images.unsplash.com/photo-1524613032530-449a5d94c285?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport"], flag: "az", continent: "Asia",
    startingPrice: "2,200", partner: "Official Azerbaijan Visa Agency",
    visaTypes: [{ name: "ASAN E-Visa", pop: true, pTime: "3 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "2,200" }],
    attractions: [{ title: "Baku Old City", desc: "The historical core of Baku, the capital of Azerbaijan." }, { title: "Flame Towers", desc: "Trio of skyscrapers in Baku, Azerbaijan, the height of the tallest tower is 182 m." }],
    embassy: "41, Paschimi Marg, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Sri Lanka", slug: "sri-lanka", price: "0", 
    image: "https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&q=80&w=1200", 
    type: "ETA FREE", valid: "30 DAYS", docs: ["Passport"], flag: "lk", continent: "Asia",
    startingPrice: "0", partner: "Official Sri Lanka Visa Partner",
    visaTypes: [{ name: "Tourist ETA (Visa-Free)", pop: true, pTime: "Instant", stay: "30 days", valid: "30 days", entry: "Double", fees: "0" }],
    attractions: [{ title: "Sigiriya", desc: "An ancient rock fortress located in the northern Matale District." }, { title: "Temple of the Tooth", desc: "A Buddhist temple in the city of Kandy, Sri Lanka." }],
    embassy: "27, Kautilya Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Jordan", slug: "jordan", price: "4,500", 
    image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "jo", continent: "Asia",
    startingPrice: "4,500", partner: "Official Jordan Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3-5 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Petra", desc: "A historical and archaeological city in southern Jordan." }, { title: "Wadi Rum", desc: "A protected desert wilderness in southern Jordan." }],
    embassy: "30, Paschimi Marg, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "South Korea", slug: "south-korea", price: "4,500", 
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "kr", continent: "Asia",
    startingPrice: "4,500", partner: "Authorised South Korea Visa Agent",
    visaTypes: [{ name: "Short-term Tourist Visa (C-3-9)", pop: true, pTime: "7-10 days", stay: "90 days", valid: "3 months", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Gyeongbokgung Palace", desc: "The main royal palace of the Joseon dynasty." }, { title: "N Seoul Tower", desc: "A communication and observation tower located on Namsan Mountain in central Seoul." }],
    embassy: "9, Chandragupta Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Greece", slug: "greece", price: "8,900", 
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "gr", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Acropolis of Athens", desc: "An ancient citadel located on a rocky outcrop above the city of Athens." }, { title: "Santorini", desc: "One of the Cyclades islands in the Aegean Sea." }],
    embassy: "EP-32, Dr S. Radhakrishnan Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Italy", slug: "italy", price: "8,900", 
    image: "https://images.unsplash.com/photo-1529260839382-3fea4496a7c1?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "it", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Colosseum", desc: "An oval amphitheatre in the centre of the city of Rome, Italy." }, { title: "Florence Cathedral", desc: "The main church of Florence, Italy." }],
    embassy: "50-E, Chandragupta Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Ireland", slug: "ireland", price: "9,500", 
    image: "https://images.unsplash.com/photo-1590089415225-4fe3edbc700d?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "ie", continent: "Europe",
    startingPrice: "9,500", partner: "Authorised Ireland Visa Agent",
    visaTypes: [{ name: "Short Stay Tourist Visa (C)", pop: true, pTime: "15-20 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "9,500" }],
    attractions: [{ title: "Guinness Storehouse", desc: "A tourist attraction at St. James's Gate Brewery in Dublin, Ireland." }, { title: "Cliffs of Moher", desc: "Sea cliffs located at the southwestern edge of the Burren region in County Clare, Ireland." }],
    embassy: "230, Jor Bagh, New Delhi – 110 003, India"
  },
  {
    name: "Kenya", slug: "kenya", price: "2,500", 
    image: "https://images.unsplash.com/photo-1516422275524-11239174661c?auto=format&fit=crop&q=80&w=1200", 
    type: "ETA", valid: "90 DAYS", docs: ["Passport", "Photo"], flag: "ke", continent: "Africa",
    startingPrice: "2,500", partner: "Official Kenya ETA Partner",
    visaTypes: [{ name: "Tourist ETA", pop: true, pTime: "3-4 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "2,500" }],
    attractions: [{ title: "Maasai Mara National Reserve", desc: "A large game reserve in Narok County, Kenya." }, { title: "Amboseli National Park", desc: "Known for its large elephant herds and views of immense Mount Kilimanjaro across the border in Tanzania." }],
    embassy: "A-15, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Uzbekistan", slug: "uzbekistan", price: "1,800", 
    image: "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport"], flag: "uz", continent: "Asia",
    startingPrice: "1,800", partner: "Official Uzbekistan Visa Partner",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "1,800" }],
    attractions: [{ title: "Registan", desc: "The heart of the ancient city of Samarkand of the Timurid dynasty." }, { title: "Itchan Kala", desc: "The walled inner town of the city of Khiva, Uzbekistan." }],
    embassy: "EP-40, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Cambodia", slug: "cambodia", price: "3,000", 
    image: "https://images.unsplash.com/photo-1500045276664-5db4afea0210?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport", "Photo"], flag: "kh", continent: "Asia",
    startingPrice: "3,000", partner: "Official Cambodia Visa Facilitator",
    visaTypes: [{ name: "Tourist E-Visa (T)", pop: true, pTime: "3 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "3,000" }],
    attractions: [{ title: "Angkor Wat", desc: "A temple complex in Cambodia and the largest religious monument in the world by land area." }, { title: "Bayon Temple", desc: "A richly decorated Khmer temple at Angkor in Cambodia." }],
    embassy: "W-112, Greater Kailash-II, New Delhi – 110 048, India"
  },
  {
    name: "Laos", slug: "laos", price: "4,200", 
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport", "Photo"], flag: "la", continent: "Asia",
    startingPrice: "4,200", partner: "Official Laos Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3 days", stay: "30 days", valid: "60 days", entry: "Single", fees: "4,200" }],
    attractions: [{ title: "Kuang Si Falls", desc: "A three-tiered waterfall about 29 kilometres south of Luang Prabang." }, { title: "Pha That Luang", desc: "A gold-covered large Buddhist stupa in the centre of the city of Vientiane, Laos." }],
    embassy: "S-42, Panchsheel Park, New Delhi – 110 017, India"
  },
  {
    name: "Saudi Arabia", slug: "saudi-arabia", price: "10,200", 
    image: "https://images.unsplash.com/photo-1586724237569-f3d021dd4c37?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "sa", continent: "Asia",
    startingPrice: "10,200", partner: "Official Saudi Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "1-2 days", stay: "90 days", valid: "1 year", entry: "Multiple", fees: "10,200" }],
    attractions: [{ title: "Al Balad, Jeddah", desc: "The historical area of Jeddah, the second largest city in Saudi Arabia." }, { title: "Masmak Fortress", desc: "A clay and mud-brick fort in the old city of Riyadh." }],
    embassy: "Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Philippines", slug: "philippines", price: "2,700", 
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport", "Photo"], flag: "ph", continent: "Asia",
    startingPrice: "2,700", partner: "Official Philippines Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "5-7 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "2,700" }],
    attractions: [{ title: "Chocolate Hills", desc: "A geological formation in the Bohol province of the Philippines." }, { title: "Puerto Princesa Underground River", desc: "A protected area of the Philippines." }],
    embassy: "50-N, Nyaya Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Qatar", slug: "qatar", price: "0", 
    image: "https://images.unsplash.com/photo-1594911771144-482061699973?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "30 DAYS", docs: ["Passport", "Tickets"], flag: "qa", continent: "Asia",
    startingPrice: "0", partner: "Official Qatar Visa Facilitator",
    visaTypes: [{ name: "Tourist Waiver (Visa-Free)", pop: true, pTime: "Instant", stay: "30 days", valid: "30 days", entry: "Single", fees: "0" }],
    attractions: [{ title: "Museum of Islamic Art", desc: "Located on one end of the seven-kilometer-long Corniche in the Qatari capital Doha." }, { title: "Souq Waqif", desc: "A marketplace in Doha, in the state of Qatar." }],
    embassy: "EP-31A, Chandragupta Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Brazil", slug: "brazil", price: "0", 
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "90 DAYS", docs: ["Passport"], flag: "br", continent: "Americas",
    startingPrice: "0", partner: "Official Brazil Visa Partner",
    visaTypes: [{ name: "Tourist Visa (Visa-Free)", pop: true, pTime: "Instant", stay: "90 days", valid: "90 days", entry: "Single", fees: "0" }],
    attractions: [{ title: "Christ the Redeemer", desc: "An Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil." }, { title: "Iguazu Falls", desc: "Waterfalls of the Iguazu River on the border of the Argentine province of Misiones and the Brazilian state of Paraná." }],
    embassy: "8, Aurangzeb Road, New Delhi – 110 011, India"
  },
  {
    name: "Sweden", slug: "sweden", price: "8,900", 
    image: "https://images.unsplash.com/photo-1509356861248-03bcbc9cd3dd?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "se", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Vasa Museum", desc: "A maritime museum in Stockholm, Sweden, located on the island of Djurgården." }, { title: "Gamla stan", desc: "The old town of Stockholm, Sweden." }],
    embassy: "Nyaya Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Bahrain", slug: "bahrain", price: "6,500", 
    image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "bh", continent: "Asia",
    startingPrice: "6,500", partner: "Official Bahrain Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3-5 days", stay: "30 days", valid: "30 days", entry: "Single", fees: "6,500" }],
    attractions: [{ title: "Al Fateh Grand Mosque", desc: "One of the largest mosques in the world, encompassing 6,500 square meters." }, { title: "Bahrain International Circuit", desc: "A motorsport venue opened in 2004 and used for drag racing, GP2 Series and the annual Bahrain Grand Prix." }],
    embassy: "A-16, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Mexico", slug: "mexico", price: "3,500", 
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "180 DAYS", docs: ["Passport", "Photo"], flag: "mx", continent: "Americas",
    startingPrice: "3,500", partner: "Official Mexico Visa Agent",
    visaTypes: [{ name: "Visitor Visa (No Payment)", pop: true, pTime: "10-15 days", stay: "180 days", valid: "180 days", entry: "Multiple", fees: "3,500" }],
    attractions: [{ title: "Chichen Itza", desc: "A large pre-Columbian city built by the Maya people of the Terminal Classic period." }, { title: "Chapultepec Castle", desc: "Located on top of Chapultepec Hill in the Chapultepec park in Mexico City." }],
    embassy: "C-8, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Tanzania", slug: "tanzania", price: "4,200", 
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "90 DAYS", docs: ["Passport", "Photo"], flag: "tz", continent: "Africa",
    startingPrice: "4,200", partner: "Official Tanzania Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "5-7 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "4,200" }],
    attractions: [{ title: "Mount Kilimanjaro", desc: "A dormant volcano in Tanzania. It has three volcanic cones: Kibo, Mawenzi and Shira." }, { title: "Serengeti National Park", desc: "A Tanazanian national park in the Serengeti ecosystem in the Mara and Simiyu regions." }],
    embassy: "F-6/12, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Ethiopia", slug: "ethiopia", price: "6,800", 
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport", "Photo"], flag: "et", continent: "Africa",
    startingPrice: "6,800", partner: "Official Ethiopia Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3-5 days", stay: "30 days", valid: "30 days", entry: "Single", fees: "6,800" }],
    attractions: [{ title: "Lalibela", desc: "A town in the Lasta district and North Wollo Zone of the Amhara Region, Ethiopia." }, { title: "Simien Mountains National Park", desc: "One of the national parks of Ethiopia." }],
    embassy: "7/2, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Austria", slug: "austria", price: "8,900", 
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "at", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Schönbrunn Palace", desc: "The main summer residence of the Habsburg rulers, located in Hietzing, Vienna." }, { title: "Hallstatt", desc: "A village on Lake Hallstatt's western shore in Austria's mountainous Salzkammergut region." }],
    embassy: "EP-13, Chandragupta Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Hungary", slug: "hungary", price: "8,900", 
    image: "https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "hu", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Buda Castle", desc: "The historical castle and palace complex of the Hungarian kings in Budapest." }, { title: "Parliament Building", desc: "A notable landmark of Hungary and a popular tourist destination in Budapest." }],
    embassy: "2/50-G, Niti Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "China", slug: "china", price: "9,800", 
    image: "https://images.unsplash.com/photo-1508197149814-0cc02e8b7f74?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "30 DAYS", docs: ["Photo", "Passport", "ITR"], flag: "cn", continent: "Asia",
    startingPrice: "9,800", partner: "Authorised China Visa Expert",
    visaTypes: [{ name: "Tourist Visa (L)", pop: true, pTime: "7-10 days", stay: "30 days", valid: "3 months", entry: "Single", fees: "9,800" }],
    attractions: [{ title: "Great Wall of China", desc: "A series of fortifications that were built across the historical northern borders of ancient Chinese states." }, { title: "Forbidden City", desc: "A palace complex in central Beijing, China." }],
    embassy: "50-D, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Iceland", slug: "iceland", price: "8,900", 
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "is", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Blue Lagoon", desc: "A geothermal spa in southwestern Iceland." }, { title: "Golden Circle", desc: "A popular tourist route in southern Iceland, covering about 300 kilometres looping from Reykjavík into the southern uplands." }],
    embassy: "11, Aurangzeb Road, New Delhi – 110 011, India"
  },
  {
    name: "Rwanda", slug: "rwanda", price: "4,200", 
    image: "https://images.unsplash.com/photo-1489493512598-d08130f49bea?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport", "Photo"], flag: "rw", continent: "Africa",
    startingPrice: "4,200", partner: "Official Rwanda Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3-5 days", stay: "30 days", valid: "30 days", entry: "Single", fees: "4,200" }],
    attractions: [{ title: "Volcanoes National Park", desc: "A national park in northwestern Rwanda." }, { title: "Kigali Genocide Memorial", desc: "Commemorates the 1994 Rwandan genocide." }],
    embassy: "A-5/2, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Uganda", slug: "uganda", price: "4,200", 
    image: "https://images.unsplash.com/photo-150045276664-5db4afea0210?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "90 DAYS", docs: ["Passport"], flag: "ug", continent: "Africa",
    startingPrice: "4,200", partner: "Official Uganda Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3-5 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "4,200" }],
    attractions: [{ title: "Bwindi Impenetrable Forest", desc: "Located in southwestern Uganda in the Kanungu District." }, { title: "Murchison Falls National Park", desc: "A park in northwestern Uganda." }],
    embassy: "B-3/21, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Tajikistan", slug: "tajikistan", price: "2,500", 
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport"], flag: "tj", continent: "Asia",
    startingPrice: "2,500", partner: "Official Tajikistan Visa Partner",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "2,500" }],
    attractions: [{ title: "Pamir Highway", desc: "A road traversing the Pamir Mountains through Afghanistan, Uzbekistan, Tajikistan, and Kyrgyzstan." }, { title: "Iskanderkul", desc: "A mountain lake of glacial origin in Tajikistan's Sughd Province." }],
    embassy: "A-2/6, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Kyrgyzstan", slug: "kyrgyzstan", price: "4,200", 
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport"], flag: "kg", continent: "Asia",
    startingPrice: "4,200", partner: "Official Kyrgyzstan Visa Partner",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3 days", stay: "30 days", valid: "30 days", entry: "Single", fees: "4,200" }],
    attractions: [{ title: "Issyk-Kul", desc: "An endorheic lake in the Northern Tien Shan mountains in eastern Kyrgyzstan." }, { title: "Ala Archa National Park", desc: "An alpine national park in the Tian Shan mountains of Kyrgyzstan." }],
    embassy: "A-10, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Armenia", slug: "armenia", price: "600", 
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "21 DAYS", docs: ["Passport"], flag: "am", continent: "Asia",
    startingPrice: "600", partner: "Official Armenia Visa Partner",
    visaTypes: [{ name: "Tourist E-Visa (21 Days)", pop: true, pTime: "3 days", stay: "21 days", valid: "90 days", entry: "Single", fees: "600" }],
    attractions: [{ title: "Geghard Monastery", desc: "A medieval monastery in the Kotayk province of Armenia." }, { title: "Lake Sevan", desc: "The largest body of water in Armenia and the Caucasus region." }],
    embassy: "D-133, Anand Niketan, New Delhi – 110 021, India"
  },
  {
    name: "Bangladesh", slug: "bangladesh", price: "1,000", 
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "bd", continent: "Asia",
    startingPrice: "1,000", partner: "Official Bangladesh Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "7-10 days", stay: "30-90 days", valid: "90 days", entry: "Single", fees: "1,000" }],
    attractions: [{ title: "Sundarbans", desc: "A mangrove area in the delta formed by the confluence of the Ganges, Brahmaputra and Meghna Rivers in the Bay of Bengal." }, { title: "Cox's Bazar", desc: "A city, fishing port, tourism centre and district headquarters in southeastern Bangladesh." }],
    embassy: "EP-39, Dr. S. Radhakrishnan Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Montenegro", slug: "montenegro", price: "6,500", 
    image: "https://images.unsplash.com/photo-1555990540-1d3744cc488d?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "me", continent: "Europe",
    startingPrice: "6,500", partner: "Official Montenegro Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "7-15 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "6,500" }],
    attractions: [{ title: "Kotor Bay", desc: "A winding bay of the Adriatic Sea in southwestern Montenegro." }, { title: "Durmitor National Park", desc: "A massif located in northwestern Montenegro." }],
    embassy: "Contact our support for processing via the designated missions."
  },
  {
    name: "Mongolia", slug: "mongolia", price: "0", 
    image: "https://images.unsplash.com/photo-1527854611648-43959aa59d18?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "30 DAYS", docs: ["Passport"], flag: "mn", continent: "Asia",
    startingPrice: "0", partner: "Official Mongolia Visa Partner",
    visaTypes: [{ name: "Tourist Visa (Visa-Free)", pop: true, pTime: "Instant", stay: "30 days", valid: "30 days", entry: "Single", fees: "0" }],
    attractions: [{ title: "Gorkhi-Terelj National Park", desc: "One of the national parks of Mongolia." }, { title: "Genghis Khan Statue Complex", desc: "A 40-metre tall statue of Genghis Khan on horseback." }],
    embassy: "34, Archbishop Makarios Marg, New Delhi – 110 003, India"
  },
  {
    name: "Uruguay", slug: "uruguay", price: "3,500", 
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "uy", continent: "Americas",
    startingPrice: "3,500", partner: "Official Uruguay Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "10-20 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "3,500" }],
    attractions: [{ title: "Casapueblo", desc: "A building constructed by the Uruguayan artist Carlos Páez Vilaró." }, { title: "Punta del Este", desc: "A city and resort on the Atlantic Coast in the Maldonado Department of southeastern Uruguay." }],
    embassy: "A-16/2, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Namibia", slug: "namibia", price: "4,200", 
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "na", continent: "Africa",
    startingPrice: "4,200", partner: "Official Namibia Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "5-10 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "4,200" }],
    attractions: [{ title: "Etosha National Park", desc: "A national park in northwestern Namibia." }, { title: "Sossusvlei", desc: "A salt and clay pan surrounded by high red dunes, located in the southern part of the Namib Desert." }],
    embassy: "B-2/4, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Mozambique", slug: "mozambique", price: "4,200", 
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport", "Photo"], flag: "mz", continent: "Africa",
    startingPrice: "4,200", partner: "Official Mozambique Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3-5 days", stay: "30 days", valid: "30 days", entry: "Single", fees: "4,200" }],
    attractions: [{ title: "Bazaruto Archipelago", desc: "A group of six islands in Mozambique, near the mainland city of Vilankulo." }, { title: "Gorongosa National Park", desc: "A preserved area in the Great Rift Valley of central Mozambique." }],
    embassy: "B-3/24, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Togo", slug: "togo", price: "1,800", 
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport"], flag: "tg", continent: "Africa",
    startingPrice: "1,800", partner: "Official Togo Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "1,800" }],
    attractions: [{ title: "Lake Togo", desc: "The largest part of a lagoon in Togo, separated from the Atlantic Ocean by a narrow coastal strip." }, { title: "Koutammakou", desc: "A cultural landscape designated in 2004 as a UNESCO World Heritage Site in northern Togo." }],
    embassy: "Contact our support for processing via the designated missions."
  },
  {
    name: "Zambia", slug: "zambia", price: "4,200", 
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "zm", continent: "Africa",
    startingPrice: "4,200", partner: "Official Zambia Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3-5 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "4,200" }],
    attractions: [{ title: "Victoria Falls", desc: "A waterfall on the Zambezi River in southern Africa, which provides habitat for several unique species of plants and animals." }, { title: "South Luangwa National Park", desc: "In eastern Zambia, the southernmost of three national parks in the valley of the Luangwa River." }],
    embassy: "D-1/37, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Zimbabwe", slug: "zimbabwe", price: "4,500", 
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "zw", continent: "Africa",
    startingPrice: "4,500", partner: "Official Zimbabwe Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3-5 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Great Zimbabwe", desc: "A medieval city in the south-eastern hills of Zimbabwe near Lake Mutirikwe and the town of Masvingo." }, { title: "Hwange National Park", desc: "The largest natural reserve in Zimbabwe." }],
    embassy: "F-6/3, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Norway", slug: "norway", price: "8,900", 
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "no", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Geirangerfjord", desc: "A fjord in the Sunnmøre region of Møre og Romsdal county, Norway." }, { title: "Lofoten", desc: "An archipelago and a traditional district in the county of Nordland, Norway." }],
    embassy: "50-C, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Netherlands", slug: "netherlands", price: "8,900", 
    image: "https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "nl", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Rijksmuseum", desc: "A Dutch national museum dedicated to arts and history in Amsterdam." }, { title: "Keukenhof", desc: "Also known as the Garden of Europe, it is one of the world's largest flower gardens." }],
    embassy: "6/50-F, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Portugal", slug: "portugal", price: "8,900", 
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "pt", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Belem Tower", desc: "A 16th-century fortification located in Lisbon that served as a point of embarkation and disembarkation for Portuguese explorers." }, { title: "Pena Palace", desc: "A Romanticist castle in São Pedro de Penaferrim, in the municipality of Sintra, Portugal." }],
    embassy: "4, Panchsheel Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Finland", slug: "finland", price: "8,900", 
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "fi", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Santa Claus Village", desc: "An amusement park in Rovaniemi in the Lapland region of Finland." }, { title: "Suomenlinna", desc: "An inhabited sea fortress built on six islands and now a UNESCO World Heritage site." }],
    embassy: "E-3, Nyaya Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Denmark", slug: "denmark", price: "8,900", 
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "dk", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Tivoli Gardens", desc: "A famous amusement park and pleasure garden in Copenhagen, Denmark." }, { title: "The Little Mermaid", desc: "A bronze statue by Edvard Eriksen, depicting a mermaid becoming human." }],
    embassy: "11, Aurangzeb Road, New Delhi – 110 011, India"
  },
  {
    name: "Belgium", slug: "belgium", price: "8,900", 
    image: "https://images.unsplash.com/photo-1491557345352-5929e343d421?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "be", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Grand Place", desc: "The central square of Brussels, Belgium." }, { title: "Atomium", desc: "A landmark building in Brussels, originally constructed for the 1958 World's Fair." }],
    embassy: "50-N, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Argentina", slug: "argentina", price: "0", 
    image: "https://images.unsplash.com/photo-1518639199441-613bc9a3b632?auto=format&fit=crop&q=80&w=1200", 
    type: "ETA", valid: "90 DAYS", docs: ["Passport", "US/Schengen Visa"], flag: "ar", continent: "Americas",
    startingPrice: "0", partner: "Official Argentina Visa Agent",
    visaTypes: [{ name: "AVE (Electronic Travel Authorization)", pop: true, pTime: "5-10 days", stay: "90 days", valid: "3 months", entry: "Multiple", fees: "0" }],
    attractions: [{ title: "Iguazu Falls", desc: "Waterfalls of the Iguazu River on the border of the Argentine province of Misiones and the Brazilian state of Paraná." }, { title: "Perito Moreno Glacier", desc: "A glacier located in the Los Glaciares National Park in southwest Santa Cruz Province, Argentina." }],
    embassy: "F-3/3, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Chile", slug: "chile", price: "4,500", 
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "cl", continent: "Americas",
    startingPrice: "4,500", partner: "Official Chile Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "10-15 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Easter Island", desc: "A remote volcanic island in Polynesia and territory of Chile." }, { title: "Torres del Paine National Park", desc: "A national park encompassing mountains, glaciers, lakes, and rivers in southern Chilean Patagonia." }],
    embassy: "A-16/1, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Seychelles", slug: "seychelles", price: "0", 
    image: "https://images.unsplash.com/photo-1516422275524-11239174661c?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "30 DAYS", docs: ["Passport"], flag: "sc", continent: "Africa",
    startingPrice: "0", partner: "Official Seychelles Visa Partner",
    visaTypes: [{ name: "Tourist Visa (Visa-Free)", pop: true, pTime: "Instant", stay: "30 days", valid: "30 days", entry: "Single", fees: "0" }],
    attractions: [{ title: "Anse Source d'Argent", desc: "One of the most famous beaches in the world, located on the island of La Digue." }, { title: "Vallee de Mai", desc: "A nature reserve and UNESCO World Heritage Site on the island of Praslin, Seychelles." }],
    embassy: "Contact our support for details on mandatory travel authorization (TA)."
  },
  {
    name: "Mauritius", slug: "mauritius", price: "0", 
    image: "https://images.unsplash.com/photo-1589979482817-4fedafbc5f64?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "60 DAYS", docs: ["Passport"], flag: "mu", continent: "Africa",
    startingPrice: "0", partner: "Official Mauritius Visa Partner",
    visaTypes: [{ name: "Tourist Visa (Visa-Free)", pop: true, pTime: "Instant", stay: "60 days", valid: "60 days", entry: "Single", fees: "0" }],
    attractions: [{ title: "Seven Coloured Earths", desc: "A geological formation and prominent tourist attraction found in the Chamarel plain of the Rivière Noire District." }, { title: "Le Morne Brabant", desc: "A peninsula at the extreme southwestern tip of the Indian Ocean island of Mauritius." }],
    embassy: "EP-41, Jesús Capitan Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Taiwan", slug: "taiwan", price: "2,500", 
    image: "https://images.unsplash.com/photo-1501555088652-32a76fdbb85a?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "tw", continent: "Asia",
    startingPrice: "2,500", partner: "Official Taiwan Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "5-7 days", stay: "30 days", valid: "3 months", entry: "Single", fees: "2,500" }],
    attractions: [{ title: "Taipei 101", desc: "A landmark supertall skyscraper in Xinyi District, Taipei, Taiwan." }, { title: "Taroko National Park", desc: "One of the nine national parks in Taiwan and was named after the Taroko Gorge." }],
    embassy: "2, Paschimi Marg, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Oman", slug: "oman", price: "5,800", 
    image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "om", continent: "Asia",
    startingPrice: "5,800", partner: "Official Oman Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa (26B)", pop: true, pTime: "2-3 days", stay: "30 days", valid: "30 days", entry: "Single", fees: "5,800" }],
    attractions: [{ title: "Sultan Qaboos Grand Mosque", desc: "The main mosque in the Sultanate of Oman, located in the capital city of Muscat." }, { title: "Wahiba Sands", desc: "A region of desert in Oman, named after the Bani Wahiba tribe." }],
    embassy: "EP-24 & 25, Chandragupta Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Nepal", slug: "nepal", price: "0", 
    image: "https://images.unsplash.com/photo-1544735716-e575775317fe?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "UNLIMITED", docs: ["Election ID / Passport"], flag: "np", continent: "Asia",
    startingPrice: "0", partner: "Official Nepal Entry Partner",
    visaTypes: [{ name: "Tourist Entry (Visa-Free)", pop: true, pTime: "Instant", stay: "Unlimited", valid: "N/A", entry: "Multiple", fees: "0" }],
    attractions: [{ title: "Mount Everest", desc: "The highest mountain on Earth as measured by height above sea level." }, { title: "Kathmandu Valley", desc: "A cultural and political hub of Nepal." }],
    embassy: "Barakhamba Road, New Delhi – 110 001, India"
  },
  {
    name: "New Zealand", slug: "new-zealand", price: "12,500", 
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "6 MONTHS", docs: ["Photo", "Passport", "Evidence of Funds"], flag: "nz", continent: "Oceania",
    startingPrice: "12,500", partner: "Official New Zealand Visa Expert",
    visaTypes: [{ name: "Visitor Visa (Tourism)", pop: true, pTime: "15-25 days", stay: "Up to 6 months", valid: "6 months", entry: "Multiple", fees: "12,500" }],
    attractions: [{ title: "Milford Sound", desc: "A fjord in the southwest of New Zealand's South Island, within Fiordland National Park." }, { title: "Hobbiton Movie Set", desc: "A significant location used for The Lord of the Rings film trilogy and The Hobbit film trilogy." }],
    embassy: "Sir Edmund Hillary Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Israel", slug: "israel", price: "6,500", 
    image: "https://images.unsplash.com/photo-1542314831-2798e4f55f69?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport", "Itinerary"], flag: "il", continent: "Asia",
    startingPrice: "6,500", partner: "Authorised Israel Visa Agent",
    visaTypes: [{ name: "Tourist Visa (B/2)", pop: true, pTime: "7-12 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "6,500" }],
    attractions: [{ title: "Western Wall", desc: "An ancient limestone wall in the Old City of Jerusalem." }, { title: "Dead Sea", desc: "A salt lake bordered by Jordan to the east and Israel and the West Bank to the west." }],
    embassy: "3, Dr APJ Abdul Kalam Rd, Chanakyapuri, New Delhi – 110 011, India"
  },
  {
    name: "Morocco", slug: "morocco", price: "2,500", 
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "ma", continent: "Africa",
    startingPrice: "2,500", partner: "Official Morocco Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3-5 days", stay: "30 days", valid: "3 months", entry: "Single", fees: "2,500" }],
    attractions: [{ title: "Marrakesh Medina", desc: "Marrakesh's historic heart, famous for its winding alleys and vibrant souks." }, { title: "Chefchaouen", desc: "A city in northwest Morocco, known for its striking blue-washed buildings." }],
    embassy: "10, G-Block, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Fiji", slug: "fiji", price: "0", 
    image: "https://images.unsplash.com/photo-1510011572741-475c1c13d946?auto=format&fit=crop&q=80&w=1200", 
    type: "VOA FREE", valid: "4 MONTHS", docs: ["Passport", "Return Tickets"], flag: "fj", continent: "Oceania",
    startingPrice: "0", partner: "Official Fiji Entry Partner",
    visaTypes: [{ name: "Tourist Entry (Visa on Arrival)", pop: true, pTime: "Instant", stay: "4 months", valid: "N/A", entry: "Single", fees: "0" }],
    attractions: [{ title: "Mamanuca Islands", desc: "A volcanic archipelago lying to the west of Nadi and to the south of the Yasawa Islands." }, { title: "Cloud 9", desc: "Fiji's only two-level floating platform with an internationally stocked bar and Italian wood-fired pizzeria." }],
    embassy: "C-1/10, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Poland", slug: "poland", price: "8,900", 
    image: "https://images.unsplash.com/photo-1512100356956-c12872638f5f?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "pl", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Wawel Royal Castle", desc: "A castle residency located in central Kraków, Poland." }, { title: "Warsaw Old Town", desc: "The oldest part of Warsaw, Poland." }],
    embassy: "50-M, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Czech Republic", slug: "czech-republic", price: "8,900", 
    image: "https://images.unsplash.com/photo-1519677103973-1f1967269bb3?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "cz", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Charles Bridge", desc: "A medieval stone arch bridge that crosses the Vltava river in Prague." }, { title: "Old Town Square", desc: "A historic square in the Old Town quarter of Prague." }],
    embassy: "50-M, Niti Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Peru", slug: "peru", price: "3,500", 
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "pe", continent: "Americas",
    startingPrice: "3,500", partner: "Official Peru Visa Agent",
    visaTypes: [{ name: "Tourist Tourist Visa", pop: true, pTime: "7-10 days", stay: "90 days", valid: "90 days", entry: "Single/Multiple", fees: "3,500" }],
    attractions: [{ title: "Machu Picchu", desc: "A 15th-century Inca citadel located in the Eastern Cordillera of southern Peru." }, { title: "Rainbow Mountain", desc: "A mountain in Peru with an altitude of 5,200 metres above sea level." }],
    embassy: "D-2/5, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Colombia", slug: "colombia", price: "6,500", 
    image: "https://images.unsplash.com/photo-1533604133567-0efc0ec391ae?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "90 DAYS", docs: ["Passport", "Bank Stmt"], flag: "co", continent: "Americas",
    startingPrice: "6,500", partner: "Official Colombia Visa Agent",
    visaTypes: [{ name: "Tourist Visitor Visa (V)", pop: true, pTime: "10-15 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "6,500" }],
    attractions: [{ title: "Cartagena Old Town", desc: "A colonial city on the Caribbean coast of Colombia." }, { title: "Monserrate", desc: "A high mountain in Bogota, the capital of Colombia." }],
    embassy: "F-2/2, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Ecuador", slug: "ecuador", price: "4,500", 
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "ec", continent: "Americas",
    startingPrice: "4,500", partner: "Official Ecuador Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "10-15 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Galapagos Islands", desc: "An archipelago of volcanic islands distributed on either side of the equator in the Pacific Ocean." }, { title: "Quito Old Town", desc: "The historic centre of Quito, Ecuador." }],
    embassy: "F-3/11, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Bhutan", slug: "bhutan", price: "0", 
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=1200", 
    type: "PERMIT", valid: "15 DAYS", docs: ["Passport / Voter ID"], flag: "bt", continent: "Asia",
    startingPrice: "0", partner: "Official Bhutan Entry Partner",
    visaTypes: [{ name: "Tourist Entry Permit", pop: true, pTime: "Instant", stay: "15 days", valid: "N/A", entry: "Single", fees: "0" }],
    attractions: [{ title: "Paro Taktsang", desc: "Known as the Tiger's Nest, it is a prominent Himalayan Buddhist sacred site and temple complex located in the cliffside of the upper Paro valley in Bhutan." }, { title: "Punakha Dzong", desc: "An administrative centre of Punakha District in Punakha, Bhutan." }],
    embassy: "Chandragupta Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Myanmar", slug: "myanmar", price: "4,500", 
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "28 DAYS", docs: ["Photo", "Passport"], flag: "mm", continent: "Asia",
    startingPrice: "4,500", partner: "Official Myanmar Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3 days", stay: "28 days", valid: "90 days", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Bagan temples", desc: "An ancient city and a UNESCO World Heritage Site in the Mandalay Region of Myanmar." }, { title: "Shwedagon Pagoda", desc: "A gilded stupa located in Yangon, Myanmar." }],
    embassy: "10-P, Niti Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Bolivia", slug: "bolivia", price: "0", 
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=1200", 
    type: "VOA FREE", valid: "30 DAYS", docs: ["Passport", "Vaccination"], flag: "bo", continent: "Americas",
    startingPrice: "0", partner: "Official Bolivia Entry Partner",
    visaTypes: [{ name: "Tourist Entry (Visa on Arrival)", pop: true, pTime: "Instant", stay: "30 days", valid: "N/A", entry: "Single", fees: "0" }],
    attractions: [{ title: "Salar de Uyuni", desc: "The world's largest salt flat, located in southwestern Bolivia." }, { title: "Lake Titicaca", desc: "A large, deep lake in the Andes on the border of Bolivia and Peru." }],
    embassy: "F-16/1, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Madagascar", slug: "madagascar", price: "3,500", 
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport"], flag: "mg", continent: "Africa",
    startingPrice: "3,500", partner: "Official Madagascar Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "3 days", stay: "30-60 days", valid: "90 days", entry: "Single", fees: "3,500" }],
    attractions: [{ title: "Avenue of the Baobabs", desc: "A prominent group of Grandidier's baobabs lining the dirt road between Morondava and Belon'i Tsiribihina." }, { title: "Andasibe-Mantadia National Park", desc: "A protected rainforest area in eastern Madagascar." }],
    embassy: "A-2/13, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Tunisia", slug: "tunisia", price: "0", 
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "90 DAYS", docs: ["Passport"], flag: "tn", continent: "Africa",
    startingPrice: "0", partner: "Official Tunisia Entry Partner",
    visaTypes: [{ name: "Tourist Visa (Visa-Free)", pop: true, pTime: "Instant", stay: "90 days", valid: "90 days", entry: "Single", fees: "0" }],
    attractions: [{ title: "Amphitheatre of El Jem", desc: "An oval amphitheatre in the city of El Jem, Tunisia." }, { title: "Carthage", desc: "A settlement in Tunisia, founded by Phoenician colonists." }],
    embassy: "C-9/3, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Georgia", slug: "georgia", price: "2,200", 
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Passport"], flag: "ge", continent: "Asia",
    startingPrice: "2,200", partner: "Official Georgia Visa Partner",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "5 days", stay: "30 days", valid: "120 days", entry: "Multiple", fees: "2,200" }],
    attractions: [{ title: "Tbilisi Old Town", desc: "The historical district of Tbilisi, the capital of Georgia." }, { title: "Gergeti Trinity Church", desc: "A popular name for Holy Trinity Church near the village of Gergeti in Georgia." }],
    embassy: "B-2/2, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Lithuania", slug: "lithuania", price: "8,900", 
    image: "https://images.unsplash.com/photo-1512100356956-c12872638f5f?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "lt", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Trakai Island Castle", desc: "An island castle located in Trakai, Lithuania, on an island in Lake Galvė." }, { title: "Gediminas Tower", desc: "The remaining part of the Upper Castle in Vilnius, Lithuania." }],
    embassy: "C-9/2, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Slovenia", slug: "slovenia", price: "8,900", 
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "si", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Lake Bled", desc: "A lake in the Julian Alps of northwestern Slovenia, where it adjoins the town of Bled." }, { title: "Ljubljana Castle", desc: "A medieval castle complex on Castle Hill in Ljubljana, the capital of Slovenia." }],
    embassy: "F-10/4, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Malta", slug: "malta", price: "8,900", 
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "mt", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Valletta", desc: "The tiny capital of the Mediterranean island nation of Malta." }, { title: "Gozo", desc: "The second-largest island of the Maltese archipelago." }],
    embassy: "F-2/2, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Luxembourg", slug: "luxembourg", price: "8,900", 
    image: "https://images.unsplash.com/photo-1512100356956-c12872638f5f?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "lu", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Bock Casemates", desc: "A subterranean network of passages in Luxembourg City." }, { title: "Grand Ducal Palace", desc: "A palace in Luxembourg City, in southern Luxembourg." }],
    embassy: "8, Archbishop Makarios Marg, New Delhi – 110 003, India"
  },
  {
    name: "Romania", slug: "romania", price: "6,500", 
    image: "https://images.unsplash.com/photo-1555990540-1d3744cc488d?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "ro", continent: "Europe",
    startingPrice: "6,500", partner: "Official Romania Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "10-15 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "6,500" }],
    attractions: [{ title: "Bran Castle", desc: "A national monument and landmark in Romania, commonly known as Dracula's Castle." }, { title: "Palace of the Parliament", desc: "The seat of the Parliament of Romania, located on Dealul Arsenalului in central Bucharest." }],
    embassy: "D-6/6, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Bulgaria", slug: "bulgaria", price: "6,500", 
    image: "https://images.unsplash.com/photo-1512100356956-c12872638f5f?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "bg", continent: "Europe",
    startingPrice: "6,500", partner: "Official Bulgaria Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "10-15 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "6,500" }],
    attractions: [{ title: "Alexander Nevsky Cathedral", desc: "A Bulgarian Orthodox cathedral in Sofia, the capital of Bulgaria." }, { title: "Rila Monastery", desc: "The largest and most famous Eastern Orthodox monastery in Bulgaria." }],
    embassy: "149, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Slovakia", slug: "slovakia", price: "8,900", 
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=1200", 
    type: "SCHENGEN", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "sk", continent: "Europe",
    startingPrice: "8,900", partner: "Authorised Schengen Visa Expert",
    visaTypes: [{ name: "Short-stay Schengen Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "6 months", entry: "Multiple", fees: "8,900" }],
    attractions: [{ title: "Bratislava Castle", desc: "The main castle of Bratislava, the capital of Slovakia." }, { title: "High Tatras", desc: "A mountain range that forms a natural border between Slovakia and Poland." }],
    embassy: "50-M, Niti Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Serbia", slug: "serbia", price: "6,500", 
    image: "https://images.unsplash.com/photo-1512100356956-c12872638f5f?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "90 DAYS", docs: ["Photo", "Passport"], flag: "rs", continent: "Europe",
    startingPrice: "6,500", partner: "Official Serbia Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "15 days", stay: "90 days", valid: "90 days", entry: "Single", fees: "6,500" }],
    attractions: [{ title: "Belgrade Fortress", desc: "Consists of the old citadel and Kalemegdan Park on the confluence of the River Sava and Danube." }, { title: "Church of Saint Sava", desc: "A Serbian Orthodox church which is the largest Orthodox church in Serbia." }],
    embassy: "3/50-G, Niti Marg, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Costa Rica", slug: "costa-rica", price: "4,500", 
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER/VOA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "cr", continent: "Americas",
    startingPrice: "4,500", partner: "Official Costa Rica Visa Agent",
    visaTypes: [{ name: "Tourist Visa", pop: true, pTime: "10-15 days", stay: "30 days", valid: "30 days", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Arenal Volcano", desc: "An active andesitic stratovolcano in northwestern Costa Rica." }, { title: "Manuel Antonio National Park", desc: "A small National Park in the Central Pacific Conservation Area located on the Pacific coast of Costa Rica." }],
    embassy: "F-16/1, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Panama", slug: "panama", price: "5,500", 
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "pa", continent: "Americas",
    startingPrice: "5,500", partner: "Official Panama Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "10-15 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "5,500" }],
    attractions: [{ title: "Panama Canal", desc: "An artificial 82 km waterway in Panama that connects the Atlantic Ocean with the Pacific Ocean." }, { title: "Casco Viejo", desc: "The historic district of Panama City." }],
    embassy: "D-2/3, Vasant Vihar, New Delhi – 110 057, India"
  },
  {
    name: "Jamaica", slug: "jamaica", price: "0", 
    image: "https://images.unsplash.com/photo-1589979482817-4fedafbc5f64?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "30 DAYS", docs: ["Passport"], flag: "jm", continent: "Americas",
    startingPrice: "0", partner: "Official Jamaica Entry Partner",
    visaTypes: [{ name: "Tourist Visa (Visa-Free)", pop: true, pTime: "Instant", stay: "30 days", valid: "30 days", entry: "Single", fees: "0" }],
    attractions: [{ title: "Dunn's River Falls", desc: "A famous waterfall near Ocho Rios, Jamaica and a major Caribbean tourist attraction." }, { title: "Blue Mountains", desc: "The longest mountain range in Jamaica." }],
    embassy: "Contact our support for entry requirements via the designated missions."
  },
  {
    name: "Kuwait", slug: "kuwait", price: "4,500", 
    image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1200", 
    type: "E-VISA", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "kw", continent: "Asia",
    startingPrice: "4,500", partner: "Official Kuwait Visa Agent",
    visaTypes: [{ name: "Tourist E-Visa", pop: true, pTime: "2-3 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Kuwait Towers", desc: "A group of three slender towers in Kuwait City, standing on a promontory into the Persian Gulf." }, { title: "Grand Mosque", desc: "The largest mosque in Kuwait." }],
    embassy: "5-A, Shantipath, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Lebanon", slug: "lebanon", price: "3,500", 
    image: "https://images.unsplash.com/photo-1542314831-2798e4f55f69?auto=format&fit=crop&q=80&w=1200", 
    type: "STICKER", valid: "30 DAYS", docs: ["Photo", "Passport"], flag: "lb", continent: "Asia",
    startingPrice: "3,500", partner: "Official Lebanon Visa Agent",
    visaTypes: [{ name: "Tourist Sticker Visa", pop: true, pTime: "5-10 days", stay: "30 days", valid: "3 months", entry: "Single", fees: "3,500" }],
    attractions: [{ title: "Jeita Grotto", desc: "A system of two separate, but interconnected, karstic limestone caves spanning an overall length of nearly 9 kilometres." }, { title: "Byblos", desc: "One of the oldest continuously inhabited cities in the world." }],
    embassy: "D-32, Chanakyapuri, New Delhi – 110 021, India"
  },
  {
    name: "Kazakhstan", slug: "kazakhstan", price: "0", 
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1200", 
    type: "VISA FREE", valid: "14 DAYS", docs: ["Passport"], flag: "kz", continent: "Asia",
    startingPrice: "0", partner: "Official Kazakhstan Entry Partner",
    visaTypes: [{ name: "Tourist Visa (Visa-Free)", pop: true, pTime: "Instant", stay: "14 days", valid: "14 days", entry: "Single", fees: "0" }],
    attractions: [{ title: "Baiterek Tower", desc: "A monument and observation tower in Nur-Sultan, the capital city of Kazakhstan." }, { title: "Charyn Canyon", desc: "A canyon on the Sharyn River in Kazakhstan." }],
    embassy: "61, Poorvi Marg, Vasant Vihar, New Delhi – 110 057, India"
  }
];

export const getDestinationBySlug = (slug: string) => {
  const s = slug.toLowerCase();
  return destinations.find(d => d.slug === s) || destinations.find(d => d.name.toLowerCase() === s);
};
