import { Hotel, Star, ExternalLink, MapPin, IndianRupee } from "lucide-react";

interface HotelOption {
  name: string;
  area: string;
  rating: number;
  priceRange: string;
  tier: "budget" | "mid" | "premium";
  whyStay: string;
}

const getHotels = (destination: string, budget: number): HotelOption[] => {
  const base: HotelOption[] = [
    {
      name: `${destination} Backpackers Inn`,
      area: "City Center",
      rating: 3.8,
      priceRange: "₹1,500 – ₹3,000/night",
      tier: "budget",
      whyStay: "Close to transit, great for budget travelers",
    },
    {
      name: `${destination} Comfort Suites`,
      area: "Main Street",
      rating: 4.2,
      priceRange: "₹4,000 – ₹7,000/night",
      tier: "mid",
      whyStay: "Central location with good amenities",
    },
    {
      name: `The Grand ${destination}`,
      area: "Heritage Quarter",
      rating: 4.7,
      priceRange: "₹10,000 – ₹20,000/night",
      tier: "premium",
      whyStay: "Luxury stay near major landmarks",
    },
  ];

  if (budget <= 30000) return base.filter((h) => h.tier === "budget" || h.tier === "mid");
  return base;
};

const tierColors: Record<string, string> = {
  budget: "bg-accent/15 text-accent",
  mid: "bg-secondary/15 text-secondary",
  premium: "bg-primary/15 text-primary",
};

const tierLabels: Record<string, string> = {
  budget: "Budget Friendly",
  mid: "Mid Range",
  premium: "Premium",
};

interface HotelStepProps {
  destination: string;
  budget: number;
  onNext: () => void;
  onBack: () => void;
}

const HotelStep = ({ destination, budget, onNext, onBack }: HotelStepProps) => {
  const hotels = getHotels(destination, budget);
  const searchQuery = encodeURIComponent(`hotels in ${destination}`);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
          Where to Stay in {destination}
        </h1>
        <p className="text-muted-foreground text-lg">
          Recommended hotels based on your ₹{budget.toLocaleString("en-IN")} budget
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.name}
            className="rounded-xl border border-border p-5 hover:shadow-md transition-shadow bg-card"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tierColors[hotel.tier]}`}>
                {tierLabels[hotel.tier]}
              </span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-3.5 h-3.5 fill-current text-amber-500" aria-hidden="true" />
                <span>{hotel.rating}</span>
              </div>
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-1">{hotel.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{hotel.area}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <IndianRupee className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{hotel.priceRange}</span>
            </div>
            <p className="text-sm text-muted-foreground italic mb-4">{hotel.whyStay}</p>
            <a
              href={`https://www.booking.com/searchresults.html?ss=${searchQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline min-h-[44px]"
              aria-label={`Book ${hotel.name} on Booking.com`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Book on Booking.com
            </a>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-5 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Hotel className="w-5 h-5 text-primary" aria-hidden="true" />
          <h2 className="font-heading font-semibold text-foreground">Suggested Area to Stay</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          For easy access to major attractions, we recommend staying in the <strong className="text-foreground">City Center</strong> or <strong className="text-foreground">Heritage Quarter</strong> areas. Both are well-connected by public transport and walking distance to key landmarks.
        </p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors min-h-[44px]"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-opacity min-h-[44px] shadow-md"
        >
          View Itinerary
        </button>
      </div>
    </div>
  );
};

export default HotelStep;
