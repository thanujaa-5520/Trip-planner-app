import { useState } from "react";
import { Globe, HelpCircle, Sun, Moon, ZoomIn, ZoomOut, Eye, X } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import ProgressBar from "./ProgressBar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface NavbarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const fontSizeLabels = { normal: "A", large: "A+", "x-large": "A++" } as const;
const fontSizeNext = { normal: "large", large: "x-large", "x-large": "normal" } as const;

const Navbar = ({ currentStep, onStepClick }: NavbarProps) => {
  const { theme, setTheme, highContrast, setHighContrast, fontSize, setFontSize } =
    useAccessibility();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
        role="banner"
      >
        <div className="container flex items-center justify-between h-16 px-4">
          {/* Logo — clickable to home */}
          <button
            onClick={() => onStepClick(0)}
            className="flex items-center gap-2 min-w-[120px] hover:opacity-80 transition-opacity"
            aria-label="Go to home"
          >
            <Globe className="w-7 h-7 text-secondary" aria-hidden="true" />
            <span className="font-heading font-bold text-lg text-foreground">Voyager</span>
          </button>

          <div className="flex-1 hidden md:flex justify-center">
            <ProgressBar currentStep={currentStep} onStepClick={onStepClick} />
          </div>

          {/* Accessibility controls */}
          <div className="flex items-center gap-1 min-w-[120px] justify-end">
            {/* Font size toggle */}
            <button
              onClick={() => setFontSize(fontSizeNext[fontSize])}
              aria-label={`Font size: ${fontSize}. Click to change.`}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center font-bold text-sm"
            >
              {fontSizeLabels[fontSize]}
            </button>

            {/* High contrast toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
              aria-pressed={highContrast}
              className={`p-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                highContrast
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Eye className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Dark/light mode */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Sun className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            {/* Help */}
            <button
              onClick={() => setHelpOpen(true)}
              aria-label="Help"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <HelpCircle className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="md:hidden px-4 pb-3">
          <ProgressBar currentStep={currentStep} onStepClick={onStepClick} />
        </div>
      </header>

      {/* Help dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How to use Voyager</DialogTitle>
            <DialogDescription>
              Plan your perfect trip in 5 simple steps.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-foreground">
            <div>
              <h4 className="font-semibold mb-1">1. Choose Destination</h4>
              <p className="text-muted-foreground">Search or pick a popular destination to start planning.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">2. Set Preferences</h4>
              <p className="text-muted-foreground">Adjust budget, trip duration, group type, and food preferences.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">3. Pick Dates</h4>
              <p className="text-muted-foreground">Select your travel dates and see weather suggestions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">4. Hotels & Stay</h4>
              <p className="text-muted-foreground">Browse recommended hotels based on your budget with booking links.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">5. View Itinerary</h4>
              <p className="text-muted-foreground">Get a personalized day-by-day plan with meals. Edit or regenerate anytime.</p>
            </div>
            <div className="pt-2 border-t border-border">
              <h4 className="font-semibold mb-1">Accessibility</h4>
              <p className="text-muted-foreground">
                Use the toolbar icons to adjust font size, toggle high contrast mode, or switch between light and dark themes. All controls are keyboard accessible.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
