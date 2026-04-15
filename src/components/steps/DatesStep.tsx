import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Sun, CloudRain, Shirt } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

interface DatesStepProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  onNext: () => void;
  onBack: () => void;
}

const DatesStep = ({ value, onChange, onNext, onBack }: DatesStepProps) => {
  const hasRange = value?.from && value?.to;

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
          Pick Your Dates
        </h1>
        <p className="text-muted-foreground text-lg">Select your travel date range</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            disabled={(date) => date < new Date()}
            className={cn("p-3 pointer-events-auto")}
            aria-label="Select travel dates"
          />
        </div>

        {hasRange && (
          <div className="space-y-4 animate-fade-in w-full lg:w-72">
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Sun className="w-6 h-6 text-accent" aria-hidden="true" />
                <h3 className="font-heading font-semibold text-foreground">Weather Forecast</h3>
              </div>
              <p className="text-2xl font-bold text-foreground">28°C, Sunny</p>
              <p className="text-sm text-muted-foreground mt-1">Clear skies expected during your trip</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Shirt className="w-6 h-6 text-secondary" aria-hidden="true" />
                <h3 className="font-heading font-semibold text-foreground">What to Pack</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground" aria-label="Packing suggestions">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Light cotton clothing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Sunglasses & sunscreen
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Comfortable walking shoes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Hat or cap
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8 max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors min-h-[44px]"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!hasRange}
          className="px-8 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-opacity min-h-[44px] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Itinerary
        </button>
      </div>
    </div>
  );
};

export default DatesStep;
