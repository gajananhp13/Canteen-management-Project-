"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const moods = [
  { value: 1, emoji: "😡", label: "Very Bad" },
  { value: 2, emoji: "😕", label: "Bad" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😍", label: "Excellent" },
];

export default function Feedback() {
  const [selected, setSelected] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!selected) return;

    // later: API / DB call
    console.log({ mood: selected, message });

    router.push("/feedback/success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border rounded-2xl shadow-lg p-6">
        
        <h2 className="text-xl font-bold text-center mb-2">
          How was your experience?
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Tap an emoji to rate us
        </p>

        {/* Emoji selector */}
        <div className="flex justify-between mb-6">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelected(mood.value)}
              className={`text-3xl transition transform ${
                selected === mood.value
                  ? "scale-125"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>

        {/* Conditional message */}
        {selected && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {selected <= 3
                ? "What went wrong?"
                : "What did you like?"}
            </label>
            <textarea
              placeholder="Your feedback (optional)"
              className="w-full border rounded-lg p-3 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        )}

        {/* Submit */}
        <button
          disabled={!selected}
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
