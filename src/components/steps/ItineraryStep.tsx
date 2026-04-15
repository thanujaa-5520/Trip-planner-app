import { useState } from "react";
import {
  Clock, MapPin, Edit2, RefreshCw, ChevronDown, ChevronUp, Car, Star,
  Sparkles, SlidersHorizontal, Save, Ticket, UtensilsCrossed, Trash2,
  PlusCircle, AlertTriangle, X, Check, Loader2,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import type { Interest } from "./InterestsStep";
import type { FoodPreference } from "./PreferencesStep";
import { getDestinationData } from "@/data/destinationAttractions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type ActivityTag = "must-visit" | "recommended" | "meal";

interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  duration: string;
  travelTime?: string;
  tag: ActivityTag;
}

interface DayPlan {
  day: number;
  activities: Activity[];
}

const SHORT_TRIP_DAYS = 3;

// Priority fallback order for short trips with no interests
const INTEREST_PRIORITY: Interest[] = ["amusement", "gardens", "lakes", "cultural", "shopping", "food"];

const generateItinerary = (
  destination: string,
  days: number,
  interests: Interest[],
  foodPrefs: FoodPreference[]
): DayPlan[] => {
  const data = getDestinationData(destination);
  const isShort = days <= SHORT_TRIP_DAYS;

  // Build recommended pool from user interests
  const recPool: { title: string; location: string; duration: string; travelTime?: string }[] = [];

  if (interests.length > 0) {
    interests.forEach((interest) => {
      recPool.push(...(data.interestActivities[interest] || []));
    });
  } else {
    // For short trips with no interests: use priority fallback order
    // For long trips: use all categories
    const categoriesToUse = isShort ? INTEREST_PRIORITY : Object.keys(data.interestActivities) as Interest[];
    categoriesToUse.forEach((interest) => {
      recPool.push(...(data.interestActivities[interest] || []));
    });
  }

  // Build meal pool from food preferences
  const mealPool: { title: string; location: string }[] = [];
  const prefs = foodPrefs.length > 0 ? foodPrefs : ["no-preference" as FoodPreference];
  prefs.forEach((p) => {
    mealPool.push(...(data.meals[p] || []));
  });

  // Short trip: prioritize must-visits heavily (3 per day), 1 interest activity
  // Long trip: 2 must-visits, 2 interest activities per day
  const mustPerDay = isShort ? 3 : 2;
  const recPerDay = isShort ? 1 : 2;

  // Shuffle pools for variety on regenerate
  const shuffled = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const mustPool = shuffled(data.mustVisit);
  const recShuffled = shuffled(recPool);

  let mustIndex = 0;
  let recIndex = 0;

  return Array.from({ length: days }, (_, i) => {
    const activities: Activity[] = [];

    // Breakfast
    const breakfastMeal = mealPool[(i * 3) % mealPool.length];
    activities.push({
      id: `${i}-meal-b`,
      time: "08:00",
      title: breakfastMeal?.title || "Breakfast",
      location: breakfastMeal?.location || "Hotel",
      duration: "45 min",
      tag: "meal",
    });

    // Must-visit attractions
    const mustCount = Math.min(mustPerDay, mustPool.length);
    for (let j = 0; j < mustCount; j++) {
      const act = mustPool[mustIndex % mustPool.length];
      const hour = 9 + j * 2;
      activities.push({
        id: `${i}-m-${j}`,
        time: `${String(hour).padStart(2, "0")}:00`,
        title: act.title,
        location: act.location,
        duration: act.duration,
        travelTime: act.travelTime,
        tag: "must-visit",
      });
      mustIndex++;
    }

    // Lunch
    const lunchMeal = mealPool[(i * 3 + 1) % mealPool.length];
    activities.push({
      id: `${i}-meal-l`,
      time: "13:00",
      title: lunchMeal?.title || "Lunch",
      location: lunchMeal?.location || "Nearby Restaurant",
      duration: "1 hour",
      tag: "meal",
    });

    // Recommended / interest activities
    const availableRec = Math.min(recPerDay, recShuffled.length);
    for (let r = 0; r < availableRec; r++) {
      const act = recShuffled[recIndex % recShuffled.length];
      const timeHour = mustPerDay === 3 ? 15 + r : 15 + r;
      const time = `${timeHour}:30`;
      activities.push({
        id: `${i}-r-${r}`,
        time,
        title: act.title,
        location: act.location,
        duration: act.duration,
        travelTime: act.travelTime,
        tag: "recommended",
      });
      recIndex++;
    }

    // Dinner
    const dinnerMeal = mealPool[(i * 3 + 2) % mealPool.length];
    activities.push({
      id: `${i}-meal-d`,
      time: "20:00",
      title: dinnerMeal?.title || "Dinner",
      location: dinnerMeal?.location || "Local Restaurant",
      duration: "1.5 hours",
      tag: "meal",
    });

    return { day: i + 1, activities };
  });
};

interface ItineraryStepProps {
  destination: string;
  days: number;
  budget: number;
  interests: Interest[];
  foodPreferences: FoodPreference[];
  onBack: () => void;
  onRefinePreferences: () => void;
}

const TagBadge = ({ tag }: { tag: ActivityTag }) => {
  if (tag === "must-visit") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-semibold">
        <Star className="w-3 h-3" aria-hidden="true" />
        Must Visit
      </span>
    );
  }
  if (tag === "meal") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-semibold">
        <UtensilsCrossed className="w-3 h-3" aria-hidden="true" />
        Meal
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-xs font-semibold">
      <Sparkles className="w-3 h-3" aria-hidden="true" />
      Recommended for You
    </span>
  );
};

// Empty activity template for adding new
const newActivityTemplate = (): Omit<Activity, "id"> => ({
  time: "10:00",
  title: "",
  location: "",
  duration: "1 hour",
  tag: "recommended",
  travelTime: "",
});

type EditMode = "edit" | "add";

const ItineraryStep = ({
  destination,
  days,
  budget,
  interests,
  foodPreferences,
  onBack,
  onRefinePreferences,
}: ItineraryStepProps) => {
  const isShortTrip = days <= SHORT_TRIP_DAYS;

  const [itinerary, setItinerary] = useState<DayPlan[]>(() =>
    generateItinerary(destination, days, interests, foodPreferences)
  );
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Edit / Add dialog state
  const [dialogMode, setDialogMode] = useState<EditMode>("edit");
  const [editActivity, setEditActivity] = useState<{
    dayIdx: number;
    actIdx: number;
    activity: Activity;
  } | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editTag, setEditTag] = useState<ActivityTag>("recommended");

  // Target day for adding
  const [addDayIdx, setAddDayIdx] = useState<number | null>(null);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<{ dayIdx: number; actIdx: number; title: string } | null>(null);

  const openEdit = (dayIdx: number, actIdx: number, activity: Activity) => {
    setDialogMode("edit");
    setEditActivity({ dayIdx, actIdx, activity });
    setEditTitle(activity.title);
    setEditTime(activity.time);
    setEditLocation(activity.location);
    setEditDuration(activity.duration);
    setEditTag(activity.tag);
  };

  const openAdd = (dayIdx: number) => {
    setDialogMode("add");
    const template = newActivityTemplate();
    setAddDayIdx(dayIdx);
    setEditTitle(template.title);
    setEditTime(template.time);
    setEditLocation(template.location);
    setEditDuration(template.duration);
    setEditTag(template.tag);
    setEditActivity(null);
  };

  const closeDialog = () => {
    setEditActivity(null);
    setAddDayIdx(null);
  };

  const isDialogOpen = editActivity !== null || addDayIdx !== null;

  const saveEdit = () => {
    if (!editActivity) return;
    setItinerary((prev) =>
      prev.map((day, di) =>
        di === editActivity.dayIdx
          ? {
              ...day,
              activities: day.activities.map((a, ai) =>
                ai === editActivity.actIdx
                  ? {
                      ...a,
                      title: editTitle,
                      time: editTime,
                      location: editLocation,
                      duration: editDuration,
                      tag: editTag,
                    }
                  : a
              ),
            }
          : day
      )
    );
    closeDialog();
  };

  const saveAdd = () => {
    if (addDayIdx === null || !editTitle.trim()) return;
    const newActivity: Activity = {
      id: `custom-${Date.now()}`,
      title: editTitle,
      time: editTime,
      location: editLocation,
      duration: editDuration,
      tag: editTag,
      travelTime: "",
    };
    setItinerary((prev) =>
      prev.map((day, di) =>
        di === addDayIdx
          ? { ...day, activities: [...day.activities, newActivity].sort((a, b) => a.time.localeCompare(b.time)) }
          : day
      )
    );
    closeDialog();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setItinerary((prev) =>
      prev.map((day, di) =>
        di === deleteTarget.dayIdx
          ? { ...day, activities: day.activities.filter((_, ai) => ai !== deleteTarget.actIdx) }
          : day
      )
    );
    setDeleteTarget(null);
  };

  const regenerate = () => {
    setIsRegenerating(true);
    setIsSaved(false);
    setTimeout(() => {
      setItinerary(generateItinerary(destination, days, interests, foodPreferences));
      setIsRegenerating(false);
    }, 800);
  };

  const handleSave = () => {
    if (isSaving || isSaved) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      toast.success("Itinerary saved!", {
        description: `Your ${days}-day ${destination} trip has been saved successfully.`,
        duration: 4000,
      });
    }, 1200);
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
          Your {destination} Itinerary
        </h1>
        <p className="text-muted-foreground text-lg">{days} days of adventure planned for you</p>
      </div>

      {/* Short trip banner */}
      {isShortTrip && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3.5" role="alert">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-0.5">Short Trip Mode</p>
            <p className="text-sm text-muted-foreground">
              Since your trip is short, we've prioritized the <strong>must-visit attractions</strong> first,
              {interests.length > 0
                ? " followed by your selected interests."
                : " followed by the top recommended activities."}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        <button
          onClick={regenerate}
          disabled={isRegenerating}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors min-h-[44px]"
          aria-label="Regenerate itinerary"
        >
          <RefreshCw className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`} aria-hidden="true" />
          Regenerate
        </button>
        <button
          onClick={onRefinePreferences}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 text-primary font-medium hover:bg-primary/5 transition-colors min-h-[44px]"
          aria-label="Update your interest preferences"
        >
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
          Refine Plan
        </button>
      </div>

      <div className="space-y-4" role="list" aria-label="Day by day itinerary">
        {itinerary.map((dayPlan) => (
          <div
            key={dayPlan.day}
            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
            role="listitem"
          >
            <button
              onClick={() => setExpandedDay(expandedDay === dayPlan.day ? -1 : dayPlan.day)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors min-h-[44px]"
              aria-expanded={expandedDay === dayPlan.day}
              aria-controls={`day-${dayPlan.day}-content`}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-sm">
                  {dayPlan.day}
                </span>
                <span className="font-heading font-semibold text-foreground text-lg">Day {dayPlan.day}</span>
                <span className="text-sm text-muted-foreground">· {dayPlan.activities.length} activities</span>
              </div>
              {expandedDay === dayPlan.day ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              )}
            </button>

            {expandedDay === dayPlan.day && (
              <div id={`day-${dayPlan.day}-content`} className="px-5 pb-5">
                <div className="relative border-l-2 border-border ml-5 pl-6 space-y-0">
                  {dayPlan.activities.map((activity, i) => (
                    <div key={activity.id}>
                      {activity.travelTime && i > 0 && (
                        <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground -ml-[30px]">
                          <Car className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{activity.travelTime}</span>
                        </div>
                      )}
                      <div className="relative py-3 group">
                        <div
                          className={`absolute -left-[31px] top-4 w-3 h-3 rounded-full border-2 border-card ${
                            activity.tag === "must-visit"
                              ? "bg-primary"
                              : activity.tag === "meal"
                              ? "bg-accent"
                              : "bg-secondary"
                          }`}
                          aria-hidden="true"
                        />
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <Clock className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                              <span className="text-sm text-muted-foreground">
                                {activity.time} · {activity.duration}
                              </span>
                              <TagBadge tag={activity.tag} />
                            </div>
                            <h4 className="font-semibold text-foreground">{activity.title}</h4>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{activity.location}</span>
                            </div>
                            {activity.tag !== "meal" && (
                              <div className="flex items-center gap-3 mt-1.5">
                                <a
                                  href={`https://www.viator.com/searchResults/all?text=${encodeURIComponent(`${activity.title} ${destination}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                                  aria-label={`Book ${activity.title} on Viator`}
                                >
                                  <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
                                  Viator
                                </a>
                                <a
                                  href={`https://www.getyourguide.com/s/?q=${encodeURIComponent(`${activity.title} ${destination}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                                  aria-label={`Book ${activity.title} on GetYourGuide`}
                                >
                                  <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
                                  GetYourGuide
                                </a>
                              </div>
                            )}
                          </div>
                          {/* Action buttons — always visible on mobile, hover on desktop */}
                          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => openEdit(dayPlan.day - 1, i, activity)}
                              aria-label={`Edit ${activity.title}`}
                              className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
                            >
                              <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget({ dayIdx: dayPlan.day - 1, actIdx: i, title: activity.title })}
                              aria-label={`Delete ${activity.title}`}
                              className="p-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add activity button */}
                <button
                  onClick={() => openAdd(dayPlan.day - 1)}
                  className="mt-4 ml-5 flex items-center gap-2 text-sm text-primary font-medium hover:underline min-h-[36px]"
                  aria-label={`Add activity to Day ${dayPlan.day}`}
                >
                  <PlusCircle className="w-4 h-4" aria-hidden="true" />
                  Add Activity
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors min-h-[44px]"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 min-h-[44px] shadow-md flex items-center gap-2 ${
            isSaved
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-accent text-accent-foreground hover:opacity-90"
          }`}
          aria-label="Save itinerary"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Saving…
            </>
          ) : isSaved ? (
            <>
              <Check className="w-4 h-4" aria-hidden="true" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" aria-hidden="true" />
              Save Itinerary
            </>
          )}
        </button>
      </div>

      {/* Edit / Add Activity Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMode === "edit" ? "Edit Activity" : "Add Activity"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block" htmlFor="edit-title">
                Activity Name {dialogMode === "add" && <span className="text-destructive">*</span>}
              </label>
              <input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="e.g. Visit Local Museum"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground min-h-[44px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block" htmlFor="edit-time">
                  Time
                </label>
                <input
                  id="edit-time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  placeholder="e.g. 10:00"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground min-h-[44px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block" htmlFor="edit-duration">
                  Duration
                </label>
                <input
                  id="edit-duration"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  placeholder="e.g. 1.5 hours"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground min-h-[44px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block" htmlFor="edit-location">
                Location
              </label>
              <input
                id="edit-location"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="e.g. City Center"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground min-h-[44px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block" htmlFor="edit-tag">
                Type
              </label>
              <select
                id="edit-tag"
                value={editTag}
                onChange={(e) => setEditTag(e.target.value as ActivityTag)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="must-visit">Must Visit</option>
                <option value="recommended">Recommended</option>
                <option value="meal">Meal</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={closeDialog}
              className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted min-h-[44px]"
            >
              Cancel
            </button>
            <button
              onClick={dialogMode === "edit" ? saveEdit : saveAdd}
              disabled={dialogMode === "add" && !editTitle.trim()}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 min-h-[44px] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              {dialogMode === "edit" ? "Save Changes" : "Add Activity"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <X className="w-5 h-5 text-destructive" aria-hidden="true" />
              Remove Activity
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to remove <strong className="text-foreground">"{deleteTarget?.title}"</strong> from this day?
          </p>
          <DialogFooter>
            <button
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted min-h-[44px]"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 min-h-[44px] flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              Remove
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItineraryStep;
