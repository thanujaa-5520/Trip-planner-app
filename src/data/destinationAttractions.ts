import type { Interest } from "@/components/steps/InterestsStep";

export interface AttractionData {
  title: string;
  location: string;
  duration: string;
  travelTime?: string;
}

export interface BudgetConfig {
  min: number;
  max: number;
  default: number;
  step: number;
  currency: string; // label hint like "Affordable SE Asia"
}

export interface DestinationData {
  mustVisit: AttractionData[];
  interestActivities: Record<Interest, AttractionData[]>;
  meals: Record<string, { title: string; location: string }[]>;
  budgetConfig: BudgetConfig;
}

const bali: DestinationData = {
  budgetConfig: {
    min: 20000,
    max: 300000,
    default: 60000,
    step: 5000,
    currency: "Affordable — SE Asia",
  },
  mustVisit: [
    { title: "Tanah Lot Temple", location: "Tabanan", duration: "2 hours" },
    { title: "Uluwatu Temple & Kecak Dance", location: "Uluwatu Cliff", duration: "2.5 hours", travelTime: "45 min drive" },
    { title: "Tegallalang Rice Terraces", location: "Ubud", duration: "1.5 hours", travelTime: "30 min drive" },
    { title: "Tirta Empul Holy Water Temple", location: "Tampaksiring", duration: "1.5 hours", travelTime: "20 min drive" },
    { title: "Besakih Mother Temple", location: "Mount Agung", duration: "2 hours", travelTime: "1 hour drive" },
    { title: "Sacred Monkey Forest Sanctuary", location: "Ubud Center", duration: "1.5 hours", travelTime: "10 min walk" },
    { title: "Handara Gate & Twin Lakes", location: "Bedugul", duration: "2 hours", travelTime: "1.5 hour drive" },
    { title: "Garuda Wisnu Kencana Cultural Park", location: "Jimbaran", duration: "2 hours", travelTime: "30 min drive" },
  ],
  interestActivities: {
    gardens: [
      { title: "Bali Botanic Garden", location: "Bedugul", duration: "2 hours", travelTime: "1 hour drive" },
      { title: "Taman Ujung Water Palace", location: "Karangasem", duration: "1.5 hours", travelTime: "1.5 hour drive" },
      { title: "Tirta Gangga Royal Garden", location: "East Bali", duration: "1.5 hours", travelTime: "20 min drive" },
      { title: "Bali Orchid Garden", location: "Sanur", duration: "1 hour", travelTime: "25 min drive" },
    ],
    amusement: [
      { title: "Waterbom Bali", location: "Kuta", duration: "4 hours", travelTime: "20 min drive" },
      { title: "Bali Swing", location: "Ubud", duration: "1.5 hours", travelTime: "30 min drive" },
      { title: "Bali Treetop Adventure Park", location: "Bedugul", duration: "2 hours", travelTime: "1 hour drive" },
      { title: "Mason Adventures ATV Ride", location: "Gianyar", duration: "2 hours", travelTime: "40 min drive" },
    ],
    lakes: [
      { title: "Lake Beratan & Pura Danu", location: "Bedugul", duration: "2 hours", travelTime: "1 hour drive" },
      { title: "Nusa Penida Beach Day", location: "Nusa Penida Island", duration: "Full day", travelTime: "45 min boat" },
      { title: "Tegenungan Waterfall", location: "Gianyar", duration: "1.5 hours", travelTime: "30 min drive" },
      { title: "Aling-Aling Waterfall Cliff Jump", location: "Singaraja", duration: "2 hours", travelTime: "2 hour drive" },
    ],
    cultural: [
      { title: "Ubud Art Market & Palace", location: "Ubud Center", duration: "2 hours", travelTime: "10 min walk" },
      { title: "Batik & Silver Workshop", location: "Celuk Village", duration: "1.5 hours", travelTime: "20 min drive" },
      { title: "Balinese Cooking Class", location: "Ubud", duration: "3 hours", travelTime: "15 min drive" },
      { title: "Traditional Legong Dance Show", location: "Ubud Palace", duration: "1.5 hours", travelTime: "10 min walk" },
    ],
    shopping: [
      { title: "Ubud Art Market", location: "Jalan Raya Ubud", duration: "2 hours", travelTime: "10 min walk" },
      { title: "Seminyak Boutique Shopping", location: "Jalan Kayu Aya", duration: "2 hours", travelTime: "40 min drive" },
      { title: "Sukawati Art Market", location: "Sukawati", duration: "1.5 hours", travelTime: "25 min drive" },
      { title: "Beachwalk Shopping Center", location: "Kuta Beach", duration: "2 hours", travelTime: "30 min drive" },
    ],
    food: [
      { title: "Jimbaran Seafood Beach BBQ", location: "Jimbaran Bay", duration: "2 hours", travelTime: "30 min drive" },
      { title: "Balinese Cooking Class", location: "Ubud", duration: "3 hours", travelTime: "15 min drive" },
      { title: "Coffee Plantation & Luwak Tasting", location: "Kintamani", duration: "1.5 hours", travelTime: "1 hour drive" },
      { title: "Gianyar Night Market", location: "Gianyar Town", duration: "1.5 hours", travelTime: "25 min drive" },
    ],
  },
  meals: {
    vegetarian: [
      { title: "Nasi Campur at Moksa", location: "Moksa Plant-Based, Ubud" },
      { title: "Raw Bowl at Alchemy", location: "Alchemy Café, Ubud" },
    ],
    "non-veg": [
      { title: "Babi Guling (Suckling Pig)", location: "Ibu Oka, Ubud" },
      { title: "Nasi Ayam Kedewatan", location: "Warung Kedewatan, Ubud" },
    ],
    seafood: [
      { title: "Grilled Fish at Jimbaran Bay", location: "Jimbaran Seafood Café" },
      { title: "Lobster Dinner", location: "Menega Café, Jimbaran" },
    ],
    vegan: [
      { title: "Buddha Bowl at Sage", location: "Sage Bali, Seminyak" },
      { title: "Raw Vegan Platter", location: "Sayuri Healing Food, Ubud" },
    ],
    "local-cuisine": [
      { title: "Nasi Goreng & Satay", location: "Warung Babi Guling, Gianyar" },
      { title: "Bebek Betutu (Slow-Cooked Duck)", location: "Warung Teges, Ubud" },
    ],
    "no-preference": [
      { title: "Breakfast at Revolver Espresso", location: "Seminyak" },
      { title: "Dinner at Locavore", location: "Ubud" },
    ],
  },
};

const paris: DestinationData = {
  budgetConfig: {
    min: 80000,
    max: 800000,
    default: 250000,
    step: 10000,
    currency: "Expensive — Western Europe",
  },
  mustVisit: [
    { title: "Eiffel Tower", location: "Champ de Mars, 7th Arr.", duration: "2 hours" },
    { title: "Louvre Museum", location: "Rue de Rivoli, 1st Arr.", duration: "3 hours", travelTime: "20 min metro" },
    { title: "Notre-Dame Cathedral", location: "Île de la Cité, 4th Arr.", duration: "1.5 hours", travelTime: "15 min walk" },
    { title: "Arc de Triomphe & Champs-Élysées", location: "Place Charles de Gaulle, 8th Arr.", duration: "1.5 hours", travelTime: "20 min metro" },
    { title: "Sacré-Cœur Basilica", location: "Montmartre, 18th Arr.", duration: "1.5 hours", travelTime: "25 min metro" },
    { title: "Musée d'Orsay", location: "Rue de la Légion d'Honneur, 7th Arr.", duration: "2 hours", travelTime: "15 min walk" },
    { title: "Palace of Versailles", location: "Versailles (Day Trip)", duration: "4 hours", travelTime: "45 min RER" },
    { title: "Sainte-Chapelle", location: "Île de la Cité, 1st Arr.", duration: "1 hour", travelTime: "10 min walk" },
  ],
  interestActivities: {
    gardens: [
      { title: "Luxembourg Gardens Stroll", location: "6th Arr.", duration: "1.5 hours", travelTime: "10 min walk" },
      { title: "Tuileries Garden & Orangerie", location: "1st Arr.", duration: "2 hours", travelTime: "15 min walk" },
      { title: "Giverny – Monet's Garden", location: "Giverny (Day Trip)", duration: "3 hours", travelTime: "1 hour train" },
      { title: "Jardin des Plantes", location: "5th Arr.", duration: "1.5 hours", travelTime: "15 min metro" },
    ],
    amusement: [
      { title: "Disneyland Paris", location: "Marne-la-Vallée", duration: "Full day", travelTime: "45 min RER" },
      { title: "Parc Astérix", location: "Senlis", duration: "Full day", travelTime: "1 hour drive" },
      { title: "Seine River Cruise", location: "Pont de l'Alma", duration: "1.5 hours", travelTime: "10 min walk" },
      { title: "Paris Catacombs", location: "14th Arr.", duration: "1.5 hours", travelTime: "20 min metro" },
    ],
    lakes: [
      { title: "Seine River Sunset Cruise", location: "Pont Neuf", duration: "1.5 hours", travelTime: "10 min walk" },
      { title: "Bois de Boulogne Lake Boating", location: "16th Arr.", duration: "1.5 hours", travelTime: "20 min metro" },
      { title: "Canal Saint-Martin Walk", location: "10th Arr.", duration: "1.5 hours", travelTime: "15 min metro" },
      { title: "Fontainebleau Forest & Lake", location: "Fontainebleau", duration: "3 hours", travelTime: "1 hour train" },
    ],
    cultural: [
      { title: "Centre Pompidou Modern Art", location: "4th Arr.", duration: "2 hours", travelTime: "15 min metro" },
      { title: "Moulin Rouge Show", location: "Montmartre, 18th Arr.", duration: "2.5 hours", travelTime: "20 min metro" },
      { title: "Shakespeare & Company Bookshop", location: "5th Arr.", duration: "1 hour", travelTime: "10 min walk" },
      { title: "Père Lachaise Cemetery Tour", location: "20th Arr.", duration: "1.5 hours", travelTime: "25 min metro" },
    ],
    shopping: [
      { title: "Galeries Lafayette Haussmann", location: "9th Arr.", duration: "2 hours", travelTime: "15 min metro" },
      { title: "Le Marais Boutiques", location: "3rd & 4th Arr.", duration: "2 hours", travelTime: "10 min metro" },
      { title: "Rue du Faubourg Saint-Honoré", location: "8th Arr.", duration: "2 hours", travelTime: "15 min walk" },
      { title: "Marché aux Puces de Saint-Ouen", location: "Saint-Ouen", duration: "2 hours", travelTime: "20 min metro" },
    ],
    food: [
      { title: "French Pastry Class", location: "Le Cordon Bleu, 15th Arr.", duration: "2.5 hours", travelTime: "20 min metro" },
      { title: "Wine & Cheese Tasting in Le Marais", location: "3rd Arr.", duration: "1.5 hours", travelTime: "10 min walk" },
      { title: "Montmartre Food Tour", location: "18th Arr.", duration: "2 hours", travelTime: "20 min metro" },
      { title: "Rue Cler Market Walk", location: "7th Arr.", duration: "1.5 hours", travelTime: "10 min walk" },
    ],
  },
  meals: {
    vegetarian: [
      { title: "Brunch at Wild & The Moon", location: "Wild & The Moon, Le Marais" },
      { title: "Veggie Bowl at Le Potager du Marais", location: "Le Marais, 3rd Arr." },
    ],
    "non-veg": [
      { title: "Steak Frites at Le Relais de l'Entrecôte", location: "6th Arr." },
      { title: "Duck Confit at Chez Janou", location: "3rd Arr." },
    ],
    seafood: [
      { title: "Oysters at Le Dôme", location: "Montparnasse, 14th Arr." },
      { title: "Bouillabaisse at Chez Marcel", location: "5th Arr." },
    ],
    vegan: [
      { title: "Vegan Lunch at Gentle Gourmet", location: "12th Arr." },
      { title: "Plant Bowl at Café Ginger", location: "4th Arr." },
    ],
    "local-cuisine": [
      { title: "Croque Monsieur at Café de Flore", location: "Saint-Germain, 6th Arr." },
      { title: "French Onion Soup at Au Pied de Cochon", location: "Les Halles, 1st Arr." },
    ],
    "no-preference": [
      { title: "Croissant & Coffee at Café de Flore", location: "6th Arr." },
      { title: "Dinner at Le Bouillon Chartier", location: "9th Arr." },
    ],
  },
};

const tokyo: DestinationData = {
  budgetConfig: {
    min: 50000,
    max: 500000,
    default: 150000,
    step: 10000,
    currency: "Mid-High — Japan",
  },
  mustVisit: [
    { title: "Senso-ji Temple", location: "Asakusa, Taito", duration: "1.5 hours" },
    { title: "Meiji Jingu Shrine", location: "Shibuya", duration: "1.5 hours", travelTime: "30 min train" },
    { title: "Shibuya Crossing & Hachiko Statue", location: "Shibuya", duration: "1 hour", travelTime: "5 min walk" },
    { title: "Tokyo Skytree", location: "Sumida", duration: "1.5 hours", travelTime: "20 min train" },
    { title: "Imperial Palace East Gardens", location: "Chiyoda", duration: "1.5 hours", travelTime: "15 min train" },
    { title: "Tsukiji Outer Market", location: "Chuo", duration: "1.5 hours", travelTime: "10 min walk" },
    { title: "TeamLab Borderless", location: "Azabudai Hills", duration: "2 hours", travelTime: "20 min train" },
    { title: "Shinjuku Gyoen National Garden", location: "Shinjuku", duration: "2 hours", travelTime: "15 min train" },
  ],
  interestActivities: {
    gardens: [
      { title: "Rikugien Garden", location: "Bunkyo", duration: "1.5 hours", travelTime: "20 min train" },
      { title: "Hamarikyu Gardens", location: "Chuo", duration: "1.5 hours", travelTime: "15 min walk" },
      { title: "Koishikawa Korakuen", location: "Bunkyo", duration: "1.5 hours", travelTime: "10 min walk" },
      { title: "Todoroki Valley Nature Walk", location: "Setagaya", duration: "1 hour", travelTime: "25 min train" },
    ],
    amusement: [
      { title: "Tokyo Disneyland", location: "Urayasu, Chiba", duration: "Full day", travelTime: "30 min train" },
      { title: "Mario Kart Go-Karting", location: "Shinagawa", duration: "1.5 hours", travelTime: "20 min train" },
      { title: "Joypolis Indoor Theme Park", location: "Odaiba", duration: "3 hours", travelTime: "25 min train" },
      { title: "Robot Restaurant Show", location: "Shinjuku", duration: "1.5 hours", travelTime: "15 min train" },
    ],
    lakes: [
      { title: "Lake Kawaguchiko (Mt. Fuji View)", location: "Yamanashi", duration: "Full day", travelTime: "2 hour bus" },
      { title: "Odaiba Seaside Park", location: "Odaiba", duration: "2 hours", travelTime: "25 min train" },
      { title: "Inokashira Park & Boating", location: "Kichijoji", duration: "1.5 hours", travelTime: "20 min train" },
      { title: "Sumida River Evening Cruise", location: "Asakusa Pier", duration: "1 hour", travelTime: "10 min walk" },
    ],
    cultural: [
      { title: "Kabuki Theater Experience", location: "Ginza, Kabukiza", duration: "2 hours", travelTime: "15 min train" },
      { title: "Samurai Museum", location: "Shinjuku", duration: "1.5 hours", travelTime: "10 min walk" },
      { title: "Sumo Wrestling Morning Practice", location: "Ryogoku", duration: "2 hours", travelTime: "20 min train" },
      { title: "Kimono Wearing Experience", location: "Asakusa", duration: "2 hours", travelTime: "15 min walk" },
    ],
    shopping: [
      { title: "Harajuku & Takeshita Street", location: "Shibuya", duration: "2 hours", travelTime: "10 min train" },
      { title: "Akihabara Electronics District", location: "Chiyoda", duration: "2 hours", travelTime: "15 min train" },
      { title: "Ginza Luxury Shopping", location: "Chuo", duration: "2 hours", travelTime: "10 min train" },
      { title: "Nakamise Shopping Street", location: "Asakusa", duration: "1.5 hours", travelTime: "5 min walk" },
    ],
    food: [
      { title: "Ramen Tasting at Ramen Street", location: "Tokyo Station", duration: "1.5 hours", travelTime: "15 min train" },
      { title: "Sushi Making Class", location: "Tsukiji Area", duration: "2 hours", travelTime: "10 min walk" },
      { title: "Izakaya Hopping in Yurakucho", location: "Chiyoda", duration: "2 hours", travelTime: "10 min train" },
      { title: "Depachika Food Hall Tour", location: "Shinjuku Isetan", duration: "1.5 hours", travelTime: "15 min train" },
    ],
  },
  meals: {
    vegetarian: [
      { title: "Shojin Ryori (Temple Cuisine)", location: "Sougo, Roppongi" },
      { title: "Veggie Set at T's TanTan", location: "Tokyo Station" },
    ],
    "non-veg": [
      { title: "Tonkatsu at Maisen", location: "Omotesando" },
      { title: "Yakitori at Toriki", location: "Yurakucho" },
    ],
    seafood: [
      { title: "Fresh Sushi Breakfast at Sushi Dai", location: "Toyosu Market" },
      { title: "Kaiseki Dinner at Kozue", location: "Park Hyatt, Shinjuku" },
    ],
    vegan: [
      { title: "Vegan Ramen at Afuri", location: "Ebisu" },
      { title: "Plant-Based Set at Ain Soph Ripple", location: "Shinjuku" },
    ],
    "local-cuisine": [
      { title: "Monjayaki at Tsukishima", location: "Tsukishima Monja Street" },
      { title: "Tempura at Tsunahachi", location: "Shinjuku" },
    ],
    "no-preference": [
      { title: "Breakfast at Tsukiji Outer Market", location: "Chuo" },
      { title: "Dinner at Gonpachi (Kill Bill Restaurant)", location: "Nishi-Azabu" },
    ],
  },
};

const santorini: DestinationData = {
  budgetConfig: {
    min: 70000,
    max: 600000,
    default: 200000,
    step: 10000,
    currency: "Pricey — Greek Islands",
  },
  mustVisit: [
    { title: "Oia Sunset Viewpoint", location: "Oia Village", duration: "2 hours" },
    { title: "Akrotiri Archaeological Site", location: "Akrotiri", duration: "2 hours", travelTime: "25 min drive" },
    { title: "Red Beach", location: "Near Akrotiri", duration: "1.5 hours", travelTime: "5 min walk" },
    { title: "Fira to Oia Caldera Hike", location: "Fira–Oia Trail", duration: "3 hours" },
    { title: "Ancient Thera Ruins", location: "Mesa Vouno", duration: "2 hours", travelTime: "30 min drive" },
    { title: "Amoudi Bay Swimming", location: "Below Oia", duration: "1.5 hours", travelTime: "10 min walk" },
    { title: "Santo Wines Winery", location: "Pyrgos", duration: "1.5 hours", travelTime: "15 min drive" },
    { title: "Museum of Prehistoric Thera", location: "Fira", duration: "1 hour", travelTime: "5 min walk" },
  ],
  interestActivities: {
    gardens: [
      { title: "Botanical Garden of Santorini", location: "Near Akrotiri", duration: "1 hour", travelTime: "20 min drive" },
      { title: "Pyrgos Village Hilltop Walk", location: "Pyrgos", duration: "1.5 hours", travelTime: "15 min drive" },
      { title: "Profitis Ilias Monastery Hike", location: "Highest Peak", duration: "2 hours", travelTime: "20 min drive" },
      { title: "Vlychada Moonscape Walk", location: "Vlychada", duration: "1 hour", travelTime: "25 min drive" },
    ],
    amusement: [
      { title: "Catamaran Cruise with Snorkeling", location: "Caldera", duration: "5 hours", travelTime: "15 min transfer" },
      { title: "Jet Ski Tour", location: "Perivolos Beach", duration: "1.5 hours", travelTime: "20 min drive" },
      { title: "Scuba Diving at Caldera", location: "Ammoudi Bay", duration: "2 hours", travelTime: "10 min walk" },
      { title: "ATV Island Tour", location: "Fira (Rental)", duration: "3 hours" },
    ],
    lakes: [
      { title: "Hot Springs at Nea Kameni", location: "Volcanic Island", duration: "2 hours", travelTime: "30 min boat" },
      { title: "Perissa Black Sand Beach", location: "Perissa", duration: "2 hours", travelTime: "20 min drive" },
      { title: "Kamari Beach & Promenade", location: "Kamari", duration: "2 hours", travelTime: "15 min drive" },
      { title: "White Beach Boat Trip", location: "Near Akrotiri", duration: "1.5 hours", travelTime: "10 min boat" },
    ],
    cultural: [
      { title: "Wine Museum (Koutsoyannopoulos)", location: "Vothonas", duration: "1.5 hours", travelTime: "10 min drive" },
      { title: "Megaro Gyzi Cultural Center", location: "Fira", duration: "1 hour", travelTime: "5 min walk" },
      { title: "Emporio Medieval Fortress Walk", location: "Emporio", duration: "1 hour", travelTime: "15 min drive" },
      { title: "Folklore Museum of Fira", location: "Fira", duration: "1 hour", travelTime: "5 min walk" },
    ],
    shopping: [
      { title: "Fira Main Street Shops", location: "Fira", duration: "2 hours", travelTime: "5 min walk" },
      { title: "Oia Art Galleries", location: "Oia", duration: "1.5 hours", travelTime: "25 min drive" },
      { title: "Santorini Jewelry Workshop", location: "Fira", duration: "1.5 hours", travelTime: "5 min walk" },
      { title: "Local Produce Market", location: "Pyrgos", duration: "1 hour", travelTime: "15 min drive" },
    ],
    food: [
      { title: "Wine Tasting Tour", location: "Venetsanos Winery", duration: "2 hours", travelTime: "15 min drive" },
      { title: "Greek Cooking Class", location: "Oia", duration: "3 hours", travelTime: "25 min drive" },
      { title: "Sunset Dinner at Ambrosia", location: "Oia", duration: "2 hours", travelTime: "25 min drive" },
      { title: "Tomato Cannery Industrial Museum", location: "Vlychada", duration: "1 hour", travelTime: "20 min drive" },
    ],
  },
  meals: {
    vegetarian: [
      { title: "Greek Salad & Spanakopita", location: "Mama Thira Taverna, Fira" },
      { title: "Stuffed Vine Leaves & Fava", location: "Ouzeri, Oia" },
    ],
    "non-veg": [
      { title: "Lamb Souvlaki Platter", location: "Pito Gyros, Fira" },
      { title: "Moussaka at Lucky's Souvlakis", location: "Fira" },
    ],
    seafood: [
      { title: "Grilled Octopus at Ammoudi Fish Tavern", location: "Amoudi Bay" },
      { title: "Fresh Catch at Dimitris", location: "Ammoudi Bay" },
    ],
    vegan: [
      { title: "Fava & Grilled Vegetables", location: "Falafeland, Fira" },
      { title: "Vegan Mezze Platter", location: "Karma Restaurant, Oia" },
    ],
    "local-cuisine": [
      { title: "Tomatokeftedes (Tomato Fritters)", location: "Argo Restaurant, Fira" },
      { title: "Santorinian Fava & White Eggplant", location: "1800 Restaurant, Oia" },
    ],
    "no-preference": [
      { title: "Breakfast at Melenio Café", location: "Fira" },
      { title: "Caldera View Dinner", location: "Pelekanos, Oia" },
    ],
  },
};

const maldives: DestinationData = {
  budgetConfig: {
    min: 100000,
    max: 1000000,
    default: 300000,
    step: 25000,
    currency: "Luxury — Indian Ocean",
  },
  mustVisit: [
    { title: "Snorkeling at Banana Reef", location: "North Malé Atoll", duration: "2.5 hours", travelTime: "20 min speedboat" },
    { title: "Malé City & Friday Mosque", location: "Malé", duration: "2 hours" },
    { title: "Veligandu Island Beach Day", location: "North Ari Atoll", duration: "Full day", travelTime: "25 min seaplane" },
    { title: "Bioluminescent Beach Night Walk", location: "Vaadhoo Island", duration: "1.5 hours", travelTime: "15 min boat" },
    { title: "Manta Ray Night Snorkeling", location: "South Ari Atoll", duration: "2 hours", travelTime: "30 min boat" },
    { title: "Underwater Restaurant Ithaa", location: "Conrad Rangali", duration: "2 hours", travelTime: "30 min seaplane" },
    { title: "Dolphin Watching Cruise", location: "Baa Atoll", duration: "2 hours", travelTime: "20 min boat" },
    { title: "Local Island Cultural Tour", location: "Maafushi", duration: "2 hours", travelTime: "30 min speedboat" },
  ],
  interestActivities: {
    gardens: [
      { title: "Hulhumalé Eco Garden", location: "Hulhumalé", duration: "1 hour", travelTime: "15 min ferry" },
      { title: "Sultan Park & National Museum", location: "Malé", duration: "1.5 hours", travelTime: "10 min walk" },
      { title: "Resort Coral Garden Snorkel", location: "House Reef", duration: "1.5 hours" },
      { title: "Herbal Garden Tour", location: "Resort Spa", duration: "1 hour" },
    ],
    amusement: [
      { title: "Jet Ski Island Hopping", location: "Atoll Lagoon", duration: "1.5 hours" },
      { title: "Parasailing over Lagoon", location: "Resort Water Sports", duration: "30 min" },
      { title: "Glass-Bottom Boat Tour", location: "House Reef", duration: "1 hour" },
      { title: "Flyboarding Experience", location: "Resort Lagoon", duration: "1 hour" },
    ],
    lakes: [
      { title: "Sandbank Picnic Excursion", location: "Private Sandbank", duration: "3 hours", travelTime: "15 min boat" },
      { title: "Kayaking through Mangroves", location: "Addu Atoll", duration: "2 hours", travelTime: "Flight required" },
      { title: "Sunset Fishing Trip", location: "Open Ocean", duration: "2.5 hours", travelTime: "10 min boat" },
      { title: "Whale Shark Snorkeling", location: "South Ari Atoll", duration: "3 hours", travelTime: "30 min boat" },
    ],
    cultural: [
      { title: "Malé Fish Market Visit", location: "Malé Waterfront", duration: "1 hour", travelTime: "10 min ferry" },
      { title: "Hukuru Miskiy (Old Friday Mosque)", location: "Malé", duration: "1 hour" },
      { title: "Lacquerwork & Mat Weaving Demo", location: "Local Island", duration: "1.5 hours", travelTime: "30 min boat" },
      { title: "Maldivian Cooking Class", location: "Resort Kitchen", duration: "2 hours" },
    ],
    shopping: [
      { title: "Malé Local Market (Bazaar)", location: "Malé Waterfront", duration: "1.5 hours", travelTime: "10 min ferry" },
      { title: "STO Trade Center", location: "Malé", duration: "1 hour" },
      { title: "Resort Boutique Shopping", location: "Resort Arcade", duration: "1 hour" },
      { title: "Maafushi Souvenir Shops", location: "Maafushi Island", duration: "1 hour", travelTime: "30 min speedboat" },
    ],
    food: [
      { title: "Maldivian Cuisine Cooking Class", location: "Resort Kitchen", duration: "2 hours" },
      { title: "Underwater Dining Experience", location: "5.8 Undersea, Hurawalhi", duration: "2.5 hours", travelTime: "Seaplane" },
      { title: "Sandbank Sunset Dinner", location: "Private Sandbank", duration: "2 hours", travelTime: "15 min boat" },
      { title: "Local Hedhikaa Tasting", location: "Maafushi Café", duration: "1 hour", travelTime: "30 min boat" },
    ],
  },
  meals: {
    vegetarian: [
      { title: "Tropical Fruit Breakfast", location: "Resort Beachside" },
      { title: "Vegetable Curry & Roshi", location: "Local Island Café" },
    ],
    "non-veg": [
      { title: "Grilled Chicken & Coconut Curry", location: "Resort Restaurant" },
      { title: "Maldivian Rihaakuru Dinner", location: "Local Guesthouse" },
    ],
    seafood: [
      { title: "Grilled Reef Fish & Maldivian Sambal", location: "Beachside Grill" },
      { title: "Lobster BBQ Dinner", location: "Overwater Restaurant" },
    ],
    vegan: [
      { title: "Coconut & Lentil Curry", location: "Resort Vegan Menu" },
      { title: "Fresh Island Salad", location: "Beach Café" },
    ],
    "local-cuisine": [
      { title: "Garudhiya (Tuna Broth) & Roshi", location: "Local Café, Maafushi" },
      { title: "Mas Huni Breakfast", location: "Guesthouse, Maafushi" },
    ],
    "no-preference": [
      { title: "Buffet Breakfast at Resort", location: "Main Restaurant" },
      { title: "Overwater Dinner", location: "Resort Fine Dining" },
    ],
  },
};

const swissAlps: DestinationData = {
  budgetConfig: {
    min: 100000,
    max: 800000,
    default: 300000,
    step: 10000,
    currency: "Premium — Swiss Alps",
  },
  mustVisit: [
    { title: "Jungfraujoch – Top of Europe", location: "Bernese Oberland", duration: "4 hours", travelTime: "2 hour cogwheel train" },
    { title: "Matterhorn Viewpoint & Gornergrat", location: "Zermatt", duration: "3 hours", travelTime: "30 min train" },
    { title: "Lake Lucerne Cruise", location: "Lucerne", duration: "2 hours" },
    { title: "Chapel Bridge (Kapellbrücke)", location: "Lucerne Old Town", duration: "1 hour", travelTime: "10 min walk" },
    { title: "Rhine Falls", location: "Schaffhausen", duration: "1.5 hours", travelTime: "1 hour train" },
    { title: "Château de Chillon", location: "Montreux", duration: "1.5 hours", travelTime: "1 hour train" },
    { title: "Mount Pilatus Golden Round Trip", location: "Lucerne", duration: "5 hours" },
    { title: "Grindelwald First Cliff Walk", location: "Grindelwald", duration: "2 hours", travelTime: "30 min gondola" },
  ],
  interestActivities: {
    gardens: [
      { title: "Isola di Brissago Botanical Garden", location: "Lake Maggiore", duration: "2 hours", travelTime: "30 min boat" },
      { title: "Bern Rose Garden", location: "Bern", duration: "1 hour", travelTime: "1 hour train" },
      { title: "Schynige Platte Alpine Garden", location: "Wilderswil", duration: "2 hours", travelTime: "1 hour train" },
      { title: "Lavaux Vineyard Terraces Walk", location: "Lake Geneva", duration: "2 hours", travelTime: "45 min train" },
    ],
    amusement: [
      { title: "First Flyer Zipline", location: "Grindelwald First", duration: "30 min", travelTime: "30 min gondola" },
      { title: "Trotti Bike Downhill Ride", location: "Grindelwald", duration: "1 hour" },
      { title: "Glacier Canyon Swing", location: "Grindelwald", duration: "1 hour" },
      { title: "Swiss Museum of Transport", location: "Lucerne", duration: "3 hours", travelTime: "15 min bus" },
    ],
    lakes: [
      { title: "Lake Brienz Turquoise Cruise", location: "Brienz", duration: "2 hours", travelTime: "30 min train" },
      { title: "Lake Thun Paddle Steamer", location: "Thun", duration: "2 hours", travelTime: "20 min train" },
      { title: "Oeschinen Lake Hike", location: "Kandersteg", duration: "3 hours", travelTime: "1 hour train" },
      { title: "Blausee (Blue Lake) Nature Park", location: "Kandergrund", duration: "1.5 hours", travelTime: "40 min drive" },
    ],
    cultural: [
      { title: "Swiss National Museum", location: "Zürich", duration: "2 hours", travelTime: "1 hour train" },
      { title: "Einstein Museum", location: "Bern", duration: "1.5 hours", travelTime: "1 hour train" },
      { title: "Ballenberg Open-Air Museum", location: "Brienz", duration: "3 hours", travelTime: "30 min bus" },
      { title: "Cheese & Chocolate Tasting", location: "Gruyères", duration: "2 hours", travelTime: "2 hour train" },
    ],
    shopping: [
      { title: "Bahnhofstrasse Shopping", location: "Zürich", duration: "2 hours", travelTime: "1 hour train" },
      { title: "Lucerne Old Town Shops", location: "Lucerne", duration: "1.5 hours", travelTime: "10 min walk" },
      { title: "Swiss Watchmaking Boutiques", location: "Interlaken", duration: "1.5 hours", travelTime: "20 min train" },
      { title: "Lindt Chocolate Shop", location: "Kilchberg", duration: "1.5 hours", travelTime: "1 hour train" },
    ],
    food: [
      { title: "Fondue Experience", location: "Traditional Chalet, Grindelwald", duration: "2 hours" },
      { title: "Chocolate Factory Tour (Lindt)", location: "Kilchberg", duration: "2 hours", travelTime: "1 hour train" },
      { title: "Gruyère Cheese Factory", location: "Gruyères", duration: "1.5 hours", travelTime: "2 hour train" },
      { title: "Raclette Dinner", location: "Mountain Restaurant", duration: "1.5 hours" },
    ],
  },
  meals: {
    vegetarian: [
      { title: "Alpine Veggie Rösti", location: "Bergrestaurant, Grindelwald" },
      { title: "Cheese Fondue (Veggie)", location: "Chalet Restaurant, Interlaken" },
    ],
    "non-veg": [
      { title: "Zürcher Geschnetzeltes", location: "Zeughauskeller, Zürich" },
      { title: "Bratwurst & Rösti", location: "Restaurant Stadtkeller, Lucerne" },
    ],
    seafood: [
      { title: "Lake Perch Fillets", location: "Lakeside Restaurant, Lucerne" },
      { title: "Trout with Almonds", location: "Hotel Giessbach, Brienz" },
    ],
    vegan: [
      { title: "Vegan Birchermüesli Bowl", location: "Hiltl, Zürich" },
      { title: "Plant-Based Alpine Bowl", location: "Tibits, Bern" },
    ],
    "local-cuisine": [
      { title: "Raclette at Raclette Stube", location: "Zermatt" },
      { title: "Traditional Fondue Moitié-Moitié", location: "Café Trésor, Grindelwald" },
    ],
    "no-preference": [
      { title: "Croissant & Coffee at Sprüngli", location: "Zürich" },
      { title: "Mountain View Dinner", location: "Harder Kulm Restaurant, Interlaken" },
    ],
  },
};

// Default fallback for custom/typed destinations
const defaultData: DestinationData = {
  budgetConfig: {
    min: 10000,
    max: 200000,
    default: 50000,
    step: 5000,
    currency: "",
  },
  mustVisit: [
    { title: "City Center Walking Tour", location: "Old Town", duration: "2 hours" },
    { title: "National Museum", location: "Museum Quarter", duration: "2 hours", travelTime: "15 min drive" },
    { title: "Historic Cathedral", location: "Cathedral Square", duration: "1.5 hours", travelTime: "10 min walk" },
    { title: "Main Viewpoint & Lookout", location: "Hilltop Park", duration: "1.5 hours", travelTime: "20 min drive" },
    { title: "Famous Market District", location: "Market Quarter", duration: "1.5 hours", travelTime: "10 min walk" },
    { title: "Botanical Park Walk", location: "City Gardens", duration: "1.5 hours", travelTime: "15 min bus" },
    { title: "Riverside Promenade", location: "Waterfront", duration: "1 hour", travelTime: "10 min walk" },
    { title: "Sunset Point", location: "West Hill", duration: "1.5 hours", travelTime: "25 min drive" },
  ],
  interestActivities: {
    gardens: [
      { title: "Botanical Garden Walk", location: "Garden District", duration: "1.5 hours", travelTime: "10 min walk" },
      { title: "Nature Reserve Hike", location: "Hill Area", duration: "2 hours", travelTime: "25 min drive" },
      { title: "Rose Garden Visit", location: "East Gardens", duration: "1.5 hours", travelTime: "15 min drive" },
      { title: "Zen Garden Tour", location: "Tranquility Park", duration: "1 hour", travelTime: "20 min drive" },
    ],
    amusement: [
      { title: "Theme Park Adventure", location: "Entertainment Zone", duration: "3 hours", travelTime: "30 min drive" },
      { title: "Water Park Fun", location: "Outskirts", duration: "2.5 hours", travelTime: "35 min drive" },
      { title: "Go-Kart Racing", location: "Sports Complex", duration: "1.5 hours", travelTime: "20 min drive" },
      { title: "VR Experience Center", location: "Tech Hub Mall", duration: "1.5 hours", travelTime: "15 min drive" },
    ],
    lakes: [
      { title: "Lakeside Relaxation", location: "Lake District", duration: "2 hours", travelTime: "20 min drive" },
      { title: "Beach Sunset & Swim", location: "West Coast", duration: "2 hours", travelTime: "25 min drive" },
      { title: "Kayaking Adventure", location: "River Bend", duration: "2 hours", travelTime: "30 min drive" },
      { title: "Waterfall Trek", location: "Mountain Springs", duration: "2.5 hours", travelTime: "40 min drive" },
    ],
    cultural: [
      { title: "Art Museum Tour", location: "Cultural Hub", duration: "1.5 hours", travelTime: "10 min walk" },
      { title: "Traditional Dance Show", location: "Theater District", duration: "1.5 hours", travelTime: "15 min drive" },
      { title: "Folk Music Evening", location: "Heritage Hall", duration: "2 hours", travelTime: "10 min walk" },
      { title: "Craft Workshop", location: "Artisan Quarter", duration: "1.5 hours", travelTime: "20 min drive" },
    ],
    shopping: [
      { title: "Local Market Shopping", location: "Market Street", duration: "2 hours", travelTime: "10 min walk" },
      { title: "Souvenir Bazaar", location: "Old Market", duration: "1.5 hours", travelTime: "15 min drive" },
      { title: "Mall Visit", location: "Downtown Plaza", duration: "2 hours", travelTime: "10 min drive" },
      { title: "Night Market Stroll", location: "Riverside Walk", duration: "2 hours", travelTime: "15 min walk" },
    ],
    food: [
      { title: "Street Food Walking Tour", location: "Food Alley", duration: "2 hours", travelTime: "10 min walk" },
      { title: "Cooking Class Experience", location: "Culinary School", duration: "2 hours", travelTime: "20 min drive" },
      { title: "Wine & Cheese Tasting", location: "Vineyard Estate", duration: "1.5 hours", travelTime: "30 min drive" },
      { title: "Dessert Café Crawl", location: "Sweet Lane", duration: "1.5 hours", travelTime: "10 min walk" },
    ],
  },
  meals: {
    vegetarian: [
      { title: "Vegetarian Thali Lunch", location: "Local Veg Restaurant" },
      { title: "Organic Café Breakfast", location: "Green Café" },
    ],
    "non-veg": [
      { title: "Grilled Kebab Lunch", location: "Famous Grill House" },
      { title: "Local Meat Specialty Dinner", location: "Heritage Restaurant" },
    ],
    seafood: [
      { title: "Fresh Seafood Lunch", location: "Coastal Kitchen" },
      { title: "Fish Market Dinner", location: "Harbor Area" },
    ],
    vegan: [
      { title: "Vegan Bowl Lunch", location: "Plant-Based Café" },
      { title: "Raw & Fresh Dinner", location: "Health Hub" },
    ],
    "local-cuisine": [
      { title: "Authentic Local Lunch", location: "Traditional Eatery" },
      { title: "Regional Specialty Dinner", location: "Old Town Restaurant" },
    ],
    "no-preference": [
      { title: "Popular Local Lunch", location: "City Center Restaurant" },
      { title: "Rooftop Dinner", location: "Downtown" },
    ],
  },
};

const destinationMap: Record<string, DestinationData> = {
  bali: bali,
  paris: paris,
  tokyo: tokyo,
  santorini: santorini,
  maldives: maldives,
  "swiss alps": swissAlps,
};

export function getDestinationData(destination: string): DestinationData {
  const key = destination.toLowerCase().trim();
  return destinationMap[key] || defaultData;
}

export function getDestinationBudgetConfig(destination: string): BudgetConfig {
  return getDestinationData(destination).budgetConfig;
}
