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

interface Review {
  rating: number;
  review: string;
  name: string;
  profileImage: string;
  summary: string | null;
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

  const generateLocalSummary = (text: string, rating: number): string => {
    const sentiment =
      rating > 3 ? "positive" : rating < 3 ? "negative" : "neutral";
    const keyPoints = [
      text.includes("accuracy") && `${sentiment} on accuracy`,
      text.includes("speed") && "fast processing",
      text.includes("time-sav") && "time-saving",
      text.includes("user") &&
        text.includes("interface") &&
        "user-friendly interface",
      text.includes("support") &&
        `${text.includes("unhelpful") ? "poor" : "good"} support`,
      text.includes("integrat") && "good integration",
      text.includes("accent") && "handles accents well",
      text.includes("edit") && "easy editing",
      text.includes("pric") &&
        `${text.includes("expensive") ? "high" : "reasonable"} pricing`,
    ].filter(Boolean);

    const uniqueFeatures = [
      text.includes("multiple accents") && "supports multiple accents",
      text.includes("automatic translation") && "includes auto-translation",
      text.includes("timestamp") && "timestamp feature",
      text.includes("multi-speaker") && "multi-speaker detection",
      text.includes("batch processing") && "batch processing available",
      text.includes("analytics") && "provides analytics",
    ].filter(Boolean);

    const summaryParts = [
      `${
        sentiment.charAt(0).toUpperCase() + sentiment.slice(1)
      } ${rating}/5 review.`,
      ...keyPoints.slice(0, 3),
      ...uniqueFeatures.slice(0, 2),
    ];

    return (
      summaryParts.join(" ").slice(0, 100).trim() +
      (summaryParts.join(" ").length > 100 ? "..." : "")
    );
  };

  const toggleLocalSummary = () => {
    if (isLocalSummarized) {
      setLocalSummary(null);
    } else {
      setLocalSummary(generateLocalSummary(review, rating));
    }
    setIsLocalSummarized(!isLocalSummarized);
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
        </div>
        {summary || localSummary ? (
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

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      rating: 5,
      review:
        "This video transcription service has completely transformed my workflow. The accuracy is outstanding, and it saves me hours of manual transcription work. I've tried many similar tools, but this one stands out for its speed and reliability. It's become an indispensable part of my content creation process. The ability to handle multiple accents and dialects is particularly impressive, making it perfect for international projects.",
      name: "John Doe",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      summary: null,
    },
    {
      rating: 4,
      review:
        "As a content creator, I find this tool incredibly useful. The interface is intuitive, and the results are quick. While it's not perfect, especially with heavy accents or background noise, it's still a massive time-saver. The ability to easily edit the transcription afterwards is a great feature. I appreciate how it integrates seamlessly with my existing video editing software, streamlining my entire post-production process.",
      name: "Jane Smith",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      summary: null,
    },
    {
      rating: 2,
      review:
        "I'm disappointed with this transcription service. While it's fast, the accuracy leaves much to be desired, especially for technical content. I often spend more time correcting errors than I would have spent transcribing manually. The software struggles with industry-specific terms and accents, making it almost unusable for my needs. The customer support has been unhelpful in addressing these issues.",
      name: "Robert Chen",
      profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
      summary: null,
    },
    {
      rating: 4,
      review:
        "The speed of this transcription service is impressive. I can upload a 30-minute video and have the transcription ready in just a few minutes. While there are occasional errors, especially with industry-specific terms, the overall accuracy is good. The user-friendly interface makes it easy to make quick edits when needed. I particularly like the timestamp feature, which makes navigating long videos a breeze.",
      name: "Emily Chen",
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
      summary: null,
    },
    {
      rating: 5,
      review:
        "As a journalist, accuracy in transcription is crucial for my work. This service has consistently delivered high-quality results, even with challenging audio conditions. The ability to easily export the transcription in various formats is a huge plus. It's become an essential tool in my reporting toolkit. The multi-speaker detection is particularly useful for interviews and panel discussions.",
      name: "Michael Brown",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
      summary: null,
    },
    {
      rating: 1,
      review:
        "This service has been a major letdown. The transcriptions are riddled with errors, making them practically useless for professional use. I've had to spend hours correcting simple mistakes that a human transcriber would never make. The pricing is also steep considering the poor quality. I've tried contacting customer support multiple times, but their responses have been slow and unhelpful. I cannot recommend this service to anyone who values accuracy and reliability.",
      name: "Amanda Foster",
      profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
      summary: null,
    },
    {
      rating: 3,
      review:
        "My experience with this transcription service has been mixed. On one hand, it's convenient and fast. On the other, the accuracy is hit or miss, especially with background noise or multiple speakers. I've found myself spending a significant amount of time editing transcripts, which defeats the purpose of using an automated service. The user interface could be more intuitive, and the pricing seems a bit high for the quality provided. It's an okay tool for casual use, but I wouldn't rely on it for critical or professional work.",
      name: "Thomas Wright",
      profileImage: "https://randomuser.me/api/portraits/men/13.jpg",
      summary: null,
    },
    {
      rating: 5,
      review:
        "As a non-native English speaker, I was worried about how well this service would handle my accent. I'm pleasantly surprised by its accuracy. It's been a game-changer for me in creating subtitles for my YouTube videos. The integration with video editing software is seamless and saves me countless hours. The automatic translation feature is an unexpected bonus that has helped me reach a wider audience.",
      name: "Carlos Rodriguez",
      profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
      summary: null,
    },
    {
      rating: 4,
      review:
        "I've been using this transcription service for my podcast for the past six months. The accuracy is generally very good, especially for clear audio. I love how it handles punctuation and paragraph breaks intelligently. The only reason I'm not giving it 5 stars is that I wish it had more advanced editing features built-in. That said, the time it saves me in post-production is invaluable, allowing me to focus more on content creation.",
      name: "Emma Watson",
      profileImage: "https://randomuser.me/api/portraits/women/8.jpg",
      summary: null,
    },
    {
      rating: 5,
      review:
        "This tool has been a lifesaver for my online course creation. Transcribing my video lectures used to be a major bottleneck, but now it's a breeze. The accuracy with technical terms in my field (biochemistry) is impressive. The option to train the AI with specific vocabulary is a fantastic feature. It has significantly reduced the time and cost associated with making my courses accessible to a wider audience.",
      name: "Dr. David Kim",
      profileImage: "https://randomuser.me/api/portraits/men/9.jpg",
      summary: null,
    },
    {
      rating: 4,
      review:
        "As a digital marketing agency, we process a lot of video content for our clients. This transcription service has significantly sped up our workflow. The batch processing feature is particularly useful. While it's not perfect with very noisy backgrounds, it handles most of our needs admirably. The customer support is also top-notch. The analytics feature, which provides insights into speech patterns and keyword usage, has been an unexpected bonus for our content strategy team.",
      name: "Lisa Thompson",
      profileImage: "https://randomuser.me/api/portraits/women/10.jpg",
      summary: null,
    },
  ]);
  const [isSummarized, setIsSummarized] = useState(false);

  const toggleSummaries = () => {
    if (isSummarized) {
      // Show full reviews
      setReviews(reviews.map((review) => ({ ...review, summary: null })));
    } else {
      // Summarize reviews
      const summarizedReviews = reviews.map((review) => ({
        ...review,
        summary: generateSummary(review.review, review.rating),
      }));
      setReviews(summarizedReviews);
    }
    setIsSummarized(!isSummarized);
  };

  const generateSummary = (review: string, rating: number): string => {
    const sentiment =
      rating > 3 ? "Positive" : rating < 3 ? "Negative" : "Neutral";
    const aspects = [
      "speed",
      "accuracy",
      "user experience",
      "support",
      "pricing",
    ];
    const mentionedAspects = aspects.filter((aspect) =>
      review.toLowerCase().includes(aspect)
    );

    let summary = `${sentiment} ${rating}/5. `;
    if (mentionedAspects.length > 0) {
      summary += `Mentions ${mentionedAspects.join(", ")}. `;
    }
    summary +=
      sentiment === "Positive"
        ? "Recommends."
        : sentiment === "Negative"
        ? "Does not recommend."
        : "Mixed opinion.";

    return summary.slice(0, 100); // Ensure it's not more than ~20 words
  };

  return (
    <Card className="mt-8 w-full max-w-[80vw] mx-auto relative">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <Button
            variant="outline"
            className="absolute top-4 right-4"
            onClick={toggleSummaries}
          >
            {isSummarized ? "Show Details" : "Summarize"}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <Review
              key={index}
              {...review}
              showSummarizeButton={!isSummarized}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
