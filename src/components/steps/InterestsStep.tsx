import { useState } from "react";
import { Trees, FerrisWheel, Waves, Landmark, ShoppingBag, UtensilsCrossed, Check } from "lucide-react";

export type Interest =
  | "gardens"
  | "amusement"
  | "lakes"
  | "cultural"
  | "shopping"
  | "food";

interface InterestOption {
  id: Interest;
  label: string;
  icon: React.ElementType;
}

const interestOptions: InterestOption[] = [
  { id: "gardens", label: "Gardens & Nature", icon: Trees },
  { id: "amusement", label: "Amusement Parks", icon: FerrisWheel },
  { id: "lakes", label: "Lakes & Beaches", icon: Waves },
  { id: "cultural", label: "Cultural & Heritage", icon: Landmark },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "food", label: "Food & Cafes", icon: UtensilsCrossed },
];

interface InterestsStepProps {
  destination: string;
  days: number;
  selected: Interest[];
  onChange: (interests: Interest[]) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

const InterestsStep = ({
  destination,
  days,
  selected,
  onChange,
  onNext,
  onSkip,
  onBack,
}: InterestsStepProps) => {
  const toggle = (id: Interest) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
          Personalize Your Trip
        </h1>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
          Your {days}-day trip to {destination} is short. Tell us what you enjoy
          so we can prioritize your itinerary.
        </p>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10"
        role="group"
        aria-label="Select your interests"
      >
        {interestOptions.map((opt) => {
          const isSelected = selected.includes(opt.id);
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              aria-pressed={isSelected}
              className={`relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all min-h-[110px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground" aria-hidden="true">
                  <Check className="w-3 h-3" />
                </span>
              )}
              <Icon
                className={`w-7 h-7 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                aria-hidden="true"
              />
              <span
                className={`text-sm font-medium ${
                  isSelected ? "text-primary" : "text-foreground"
                }`}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors min-h-[44px]"
        >
          Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="px-6 py-3 rounded-xl border border-border text-muted-foreground font-medium hover:bg-muted transition-colors min-h-[44px]"
          >
            Skip
          </button>
          <button
            onClick={onNext}
            disabled={selected.length === 0}
            className="px-8 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity min-h-[44px] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestsStep;
