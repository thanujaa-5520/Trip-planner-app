import { User, Users, Heart, UserPlus, Minus, Plus, Vegan, Beef, Fish, Wheat, LeafyGreen, UtensilsCrossed, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { getDestinationBudgetConfig } from "@/data/destinationAttractions";

const groupTypes = [
  { id: "solo", label: "Solo", icon: User },
  { id: "couple", label: "Couple", icon: Heart },
  { id: "family", label: "Family", icon: Users },
  { id: "friends", label: "Friends", icon: UserPlus },
];

export type FoodPreference = "vegetarian" | "non-veg" | "seafood" | "vegan" | "local-cuisine" | "no-preference";

const foodOptions: { id: FoodPreference; label: string; icon: typeof Vegan }[] = [
  { id: "vegetarian", label: "Vegetarian", icon: LeafyGreen },
  { id: "non-veg", label: "Non-Veg", icon: Beef },
  { id: "seafood", label: "Seafood", icon: Fish },
  { id: "vegan", label: "Vegan", icon: Vegan },
  { id: "local-cuisine", label: "Local Cuisine", icon: UtensilsCrossed },
  { id: "no-preference", label: "No Preference", icon: Wheat },
];

export interface Preferences {
  budget: number;
  days: number;
  groupType: string;
  foodPreferences: FoodPreference[];
}

interface PreferencesStepProps {
  value: Preferences;
  onChange: (prefs: Preferences) => void;
  onNext: () => void;
  onBack: () => void;
  destination: string;
}

const PreferencesStep = ({ value, onChange, onNext, onBack, destination }: PreferencesStepProps) => {
  const budgetConfig = getDestinationBudgetConfig(destination);

  const formatBudget = (v: number) => {
    if (v >= budgetConfig.max) return `₹${(budgetConfig.max / 100000).toFixed(0)}L+`;
    if (v >= 100000) return `₹${(v / 100000).toFixed(v % 100000 === 0 ? 0 : 1)}L`;
    return `₹${v.toLocaleString("en-IN")}`;
  };

  const formatLabel = (v: number) => {
    if (v >= 100000) return `₹${(v / 100000).toFixed(v % 100000 === 0 ? 0 : 1)}L`;
    return `₹${v.toLocaleString("en-IN")}`;
  };

  // Clamp displayed budget value to current config bounds
  const clampedBudget = Math.min(Math.max(value.budget, budgetConfig.min), budgetConfig.max);

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
          Set Your Preferences
        </h1>
        <p className="text-muted-foreground text-lg">Tell us what kind of trip you're looking for</p>
      </div>

      <div className="space-y-8">
        {/* Budget */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <label className="font-heading font-semibold text-foreground text-lg mb-1 block">Budget</label>
          {budgetConfig.currency && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
              <Info className="w-3.5 h-3.5 text-secondary flex-shrink-0" aria-hidden="true" />
              <span>{budgetConfig.currency} — budget range adjusted for {destination}</span>
            </div>
          )}
          <Slider
            value={[clampedBudget]}
            onValueChange={([v]) => onChange({ ...value, budget: v })}
            min={budgetConfig.min}
            max={budgetConfig.max}
            step={budgetConfig.step}
            className="mb-3"
            aria-label="Budget range"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatLabel(budgetConfig.min)}</span>
            <span className="font-semibold text-secondary text-base">{formatBudget(clampedBudget)}</span>
            <span>{formatLabel(budgetConfig.max)}+</span>
          </div>
        </div>

        {/* Days */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <label className="font-heading font-semibold text-foreground text-lg mb-4 block">Number of Days</label>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => onChange({ ...value, days: Math.max(1, value.days - 1) })}
              aria-label="Decrease days"
              className="w-12 h-12 rounded-lg border border-border bg-muted flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <Minus className="w-5 h-5" aria-hidden="true" />
            </button>
            <span className="text-4xl font-heading font-bold text-foreground w-16 text-center" aria-live="polite">
              {value.days}
            </span>
            <button
              onClick={() => onChange({ ...value, days: Math.min(30, value.days + 1) })}
              aria-label="Increase days"
              className="w-12 h-12 rounded-lg border border-border bg-muted flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <Plus className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Group Type */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <fieldset>
            <legend className="font-heading font-semibold text-foreground text-lg mb-4">Who's Traveling?</legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {groupTypes.map((g) => {
                const isSelected = value.groupType === g.id;
                const Icon = g.icon;
                return (
                  <button
                    key={g.id}
                    onClick={() => onChange({ ...value, groupType: g.id })}
                    role="radio"
                    aria-checked={isSelected}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 min-h-[80px]
                      ${isSelected
                        ? "border-secondary bg-secondary/10 shadow-sm"
                        : "border-border hover:border-secondary/50 hover:bg-muted"
                      }
                    `}
                  >
                    <Icon className={`w-6 h-6 ${isSelected ? "text-secondary" : "text-muted-foreground"}`} aria-hidden="true" />
                    <span className={`text-sm font-medium ${isSelected ? "text-secondary" : "text-foreground"}`}>{g.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Food Preferences */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <fieldset>
            <legend className="font-heading font-semibold text-foreground text-lg mb-2">Food Preferences</legend>
            <p className="text-sm text-muted-foreground mb-4">Select all that apply — we'll suggest restaurants accordingly</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {foodOptions.map((f) => {
                const isSelected = value.foodPreferences.includes(f.id);
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      const next = isSelected
                        ? value.foodPreferences.filter((p) => p !== f.id)
                        : [...value.foodPreferences, f.id];
                      onChange({ ...value, foodPreferences: next });
                    }}
                    role="checkbox"
                    aria-checked={isSelected}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 min-h-[52px] text-left
                      ${isSelected
                        ? "border-accent bg-accent/10 shadow-sm"
                        : "border-border hover:border-accent/50 hover:bg-muted"
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isSelected ? "text-accent" : "text-muted-foreground"}`} aria-hidden="true" />
                    <span className={`text-sm font-medium ${isSelected ? "text-accent" : "text-foreground"}`}>{f.label}</span>
                    {isSelected && (
                      <span className="ml-auto text-accent" aria-hidden="true">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="flex justify-between mt-8">
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
          Continue
        </button>
      </div>
    </div>
  );
};

export default PreferencesStep;
