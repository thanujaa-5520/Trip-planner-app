import { Check, MapPin, SlidersHorizontal, CalendarDays, Hotel, Route } from "lucide-react";

const steps = [
  { label: "Destination", icon: MapPin },
  { label: "Preferences", icon: SlidersHorizontal },
  { label: "Dates", icon: CalendarDays },
  { label: "Hotels", icon: Hotel },
  { label: "Itinerary", icon: Route },
];

interface ProgressBarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const ProgressBar = ({ currentStep, onStepClick }: ProgressBarProps) => {
  return (
    <nav aria-label="Progress" className="w-full max-w-2xl mx-auto px-4">
      <ol className="flex items-center justify-between" role="list">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const Icon = step.icon;

          return (
            <li key={step.label} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => isCompleted ? onStepClick(index) : undefined}
                disabled={!isCompleted}
                aria-current={isActive ? "step" : undefined}
                aria-label={`${step.label}${isCompleted ? " (completed)" : isActive ? " (current)" : ""}`}
                className={`flex flex-col items-center gap-1.5 min-w-[60px] transition-all duration-200 
                  ${isCompleted ? "cursor-pointer" : "cursor-default"}
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-lg p-1`}
              >
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${isCompleted ? "bg-step-completed border-step-completed" : ""}
                    ${isActive ? "bg-step-active border-step-active" : ""}
                    ${!isCompleted && !isActive ? "bg-background border-step-inactive" : ""}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-accent-foreground" aria-hidden="true" />
                  ) : (
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-secondary-foreground" : "text-muted-foreground"}`}
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span
                  className={`text-xs font-medium hidden sm:block
                    ${isActive ? "text-secondary" : isCompleted ? "text-accent" : "text-muted-foreground"}
                  `}
                >
                  {step.label}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-colors duration-300 rounded-full
                    ${index < currentStep ? "bg-step-completed" : "bg-step-inactive"}
                  `}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ProgressBar;
