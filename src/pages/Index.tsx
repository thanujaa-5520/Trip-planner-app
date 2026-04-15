import { useState } from "react";
import { DateRange } from "react-day-picker";
import Navbar from "@/components/Navbar";
import DestinationStep from "@/components/steps/DestinationStep";
import PreferencesStep, { type Preferences } from "@/components/steps/PreferencesStep";
import DatesStep from "@/components/steps/DatesStep";
import InterestsStep, { type Interest } from "@/components/steps/InterestsStep";
import HotelStep from "@/components/steps/HotelStep";
import ItineraryStep from "@/components/steps/ItineraryStep";
import { getDestinationBudgetConfig } from "@/data/destinationAttractions";

const SHORT_TRIP_THRESHOLD = 3;

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [destination, setDestination] = useState("");
  const [preferences, setPreferences] = useState<Preferences>({
    budget: 50000,
    days: 5,
    groupType: "solo",
    foodPreferences: [],
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [interests, setInterests] = useState<Interest[]>([]);
  const [showInterests, setShowInterests] = useState(false);

  const isShortTrip = preferences.days <= SHORT_TRIP_THRESHOLD;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goTo = (step: number) => {
    setShowInterests(false);
    setCurrentStep(step);
    scrollToTop();
  };

  const handleDestinationSelect = (dest: string) => {
    setDestination(dest);
    // Auto-update budget based on destination
    const budgetConfig = getDestinationBudgetConfig(dest);
    setPreferences((prev) => ({
      ...prev,
      budget: budgetConfig.default,
    }));
  };

  const handleDatesNext = () => {
    if (isShortTrip) {
      setShowInterests(true);
      scrollToTop();
    } else {
      goTo(3);
    }
  };

  const handleInterestsNext = () => {
    setShowInterests(false);
    setCurrentStep(3);
    scrollToTop();
  };

  const handleInterestsSkip = () => {
    setInterests([]);
    setShowInterests(false);
    setCurrentStep(3);
    scrollToTop();
  };

  const handleRefinePreferences = () => {
    setShowInterests(true);
    setCurrentStep(2);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentStep={currentStep} onStepClick={goTo} />

      <main className="container px-4 py-8 sm:py-12" role="main">
        {currentStep === 0 && (
          <DestinationStep
            value={destination}
            onChange={handleDestinationSelect}
            onNext={() => goTo(1)}
          />
        )}
        {currentStep === 1 && (
          <PreferencesStep
            value={preferences}
            onChange={setPreferences}
            onNext={() => goTo(2)}
            onBack={() => goTo(0)}
            destination={destination}
          />
        )}
        {currentStep === 2 && !showInterests && (
          <DatesStep
            value={dateRange}
            onChange={setDateRange}
            onNext={handleDatesNext}
            onBack={() => goTo(1)}
          />
        )}
        {currentStep === 2 && showInterests && (
          <InterestsStep
            destination={destination}
            days={preferences.days}
            selected={interests}
            onChange={setInterests}
            onNext={handleInterestsNext}
            onSkip={handleInterestsSkip}
            onBack={() => { setShowInterests(false); scrollToTop(); }}
          />
        )}
        {currentStep === 3 && (
          <HotelStep
            destination={destination}
            budget={preferences.budget}
            onNext={() => goTo(4)}
            onBack={() => goTo(2)}
          />
        )}
        {currentStep === 4 && (
          <ItineraryStep
            destination={destination}
            days={preferences.days}
            budget={preferences.budget}
            interests={interests}
            foodPreferences={preferences.foodPreferences}
            onBack={() => goTo(3)}
            onRefinePreferences={handleRefinePreferences}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
