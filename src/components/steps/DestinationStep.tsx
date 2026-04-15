import { useState, useMemo } from "react";
import { Search, MapPin } from "lucide-react";
import destBali from "@/assets/dest-bali.jpg";
import destSwiss from "@/assets/dest-swiss.jpg";
import destTokyo from "@/assets/dest-tokyo.jpg";
import destMaldives from "@/assets/dest-maldives.jpg";
import destParis from "@/assets/dest-paris.jpg";
import destSantorini from "@/assets/dest-santorini.jpg";

const destinations = [
  { name: "Bali", category: "Beaches", image: destBali },
  { name: "Swiss Alps", category: "Mountains", image: destSwiss },
  { name: "Tokyo", category: "City", image: destTokyo },
  { name: "Maldives", category: "Beaches", image: destMaldives },
  { name: "Paris", category: "City", image: destParis },
  { name: "Santorini", category: "Islands", image: destSantorini },
];

interface DestinationStepProps {
  value: string;
  onChange: (dest: string) => void;
  onNext: () => void;
}

const DestinationStep = ({ value, onChange, onNext }: DestinationStepProps) => {
  const [query, setQuery] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = useMemo(() => {
    if (!query) return [];
    return destinations.filter((d) =>
      d.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const selectDestination = (name: string) => {
    setQuery(name);
    onChange(name);
    setIsFocused(false);
    onNext();
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-3">
          Where do you want to go?
        </h1>
        <p className="text-muted-foreground text-lg">
          Search or pick a popular destination below
        </p>
      </div>

      <div className="relative max-w-xl mx-auto mb-12">
        <label htmlFor="destination-search" className="sr-only">Search destinations</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
          <input
            id="destination-search"
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIsFocused(true); }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search destinations..."
            className="w-full h-14 pl-12 pr-4 rounded-xl border border-input bg-card text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow shadow-sm"
            autoComplete="off"
            aria-expanded={isFocused && suggestions.length > 0}
            aria-controls="suggestions-list"
            role="combobox"
          />
        </div>

        {isFocused && suggestions.length > 0 && (
          <ul
            id="suggestions-list"
            role="listbox"
            className="absolute z-10 w-full mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
          >
            {suggestions.map((d) => (
              <li key={d.name} role="option" aria-selected={false}>
                <button
                  onMouseDown={() => selectDestination(d.name)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors min-h-[44px]"
                >
                  <MapPin className="w-4 h-4 text-secondary flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium text-foreground">{d.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{d.category}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="font-heading font-semibold text-xl text-foreground mb-6 text-center">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {destinations.map((d) => (
            <button
              key={d.name}
              onClick={() => selectDestination(d.name)}
              className={`group relative overflow-hidden rounded-xl aspect-[4/3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                value === d.name ? "ring-2 ring-secondary ring-offset-2 ring-offset-background" : ""
              }`}
              aria-label={`Select ${d.name} - ${d.category}`}
            >
              <img
                src={d.image}
                alt={`${d.name} - ${d.category} destination`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                width={640}
                height={512}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-2 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded-md mb-1">
                  {d.category}
                </span>
                <h3 className="text-primary-foreground font-heading font-semibold text-lg">{d.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationStep;
