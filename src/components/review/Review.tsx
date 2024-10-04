import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewProps {
  rating: number;
  review: string;
  name: string;
  profileImage: string;
  summary: string | null;
  showSummarizeButton: boolean;
}

const Review: React.FC<ReviewProps> = ({
  rating,
  review,
  name,
  profileImage,
  summary,
  showSummarizeButton,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSummary, setLocalSummary] = useState<string | null>(null);
  const [isLocalSummarized, setIsLocalSummarized] = useState(false);
  const [translatedReview, setTranslatedReview] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
  ];

  const generateLocalSummary = (text: string, rating: number): string => {
    const sentiment =
      rating > 3 ? "positive" : rating < 3 ? "negative" : "neutral";
    const aspects = [
      "speed",
      "accuracy",
      "user experience",
      "support",
      "pricing",
    ];
    const mentionedAspects = aspects.filter((aspect) =>
      text.toLowerCase().includes(aspect)
    );

    let summary = `${
      sentiment.charAt(0).toUpperCase() + sentiment.slice(1)
    } ${rating}/5. `;
    if (mentionedAspects.length > 0) {
      summary += `Mentions ${mentionedAspects.join(", ")}. `;
    }
    summary +=
      sentiment === "positive"
        ? "Recommends."
        : sentiment === "negative"
        ? "Does not recommend."
        : "Mixed opinion.";

    return summary.slice(0, 100);
  };

  const toggleLocalSummary = () => {
    if (isLocalSummarized) {
      setLocalSummary(null);
    } else {
      setLocalSummary(generateLocalSummary(review, rating));
    }
    setIsLocalSummarized(!isLocalSummarized);
  };

  const handleTranslate = async (languageCode: string) => {
    if (!languageCode) {
      setTranslatedReview(null);
      return;
    }

    setIsTranslating(true);
    try {
      const response = await fetch("http://localhost:3001/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: review, to: languageCode }),
      });
      const result = await response.json();
      setTranslatedReview(result.text);
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslatedReview(null);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <Card className="w-full transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            {showSummarizeButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLocalSummary}
                className="text-xs"
              >
                {isLocalSummarized ? "Show Full" : "Summarize"}
              </Button>
            )}
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                handleTranslate(e.target.value);
              }}
              className="text-xs border rounded p-1"
              disabled={isTranslating}
            >
              <option value="">Translate</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {isTranslating ? (
          <p className="text-sm text-gray-600 mb-2">Translating...</p>
        ) : translatedReview ? (
          <p className="text-sm text-gray-600 mb-2 bg-green-100 dark:bg-green-900 p-2 rounded">
            {translatedReview}
          </p>
        ) : summary || localSummary ? (
          <p className="text-sm text-gray-600 mb-2 bg-blue-100 dark:bg-blue-900 p-2 rounded">
            {summary || localSummary}
          </p>
        ) : (
          <>
            <p
              className={`text-sm text-gray-600 mb-2 ${
                isExpanded ? "" : "line-clamp-3"
              }`}
            >
              {review}
            </p>
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-800"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "See Less" : "See More"}
            </Button>
          </>
        )}
        <div className="flex items-center mt-2">
          <img
            src={profileImage}
            alt={name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm font-semibold">{name}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Review;
