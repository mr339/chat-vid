import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewProps {
  rating: number;
  review: string;
  name: string;
  profileImage: string;
}

const Review: React.FC<ReviewProps> = ({
  rating,
  review,
  name,
  profileImage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
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
  const reviews = [
    {
      rating: 5,
      review:
        "This video transcription service has completely transformed my workflow. The accuracy is outstanding, and it saves me hours of manual transcription work. I've tried many similar tools, but this one stands out for its speed and reliability. It's become an indispensable part of my content creation process. The ability to handle multiple accents and dialects is particularly impressive, making it perfect for international projects.",
      name: "John Doe",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      rating: 4,
      review:
        "As a content creator, I find this tool incredibly useful. The interface is intuitive, and the results are quick. While it's not perfect, especially with heavy accents or background noise, it's still a massive time-saver. The ability to easily edit the transcription afterwards is a great feature. I appreciate how it integrates seamlessly with my existing video editing software, streamlining my entire post-production process.",
      name: "Jane Smith",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      rating: 5,
      review:
        "I'm amazed at how well this service handles technical jargon. As a software developer who often records coding tutorials, I was skeptical about its accuracy with programming terms. To my surprise, it rarely misses a beat. The time I save on transcription allows me to focus more on creating quality content. The custom vocabulary feature is a game-changer for niche topics.",
      name: "Alex Johnson",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      rating: 4,
      review:
        "The speed of this transcription service is impressive. I can upload a 30-minute video and have the transcription ready in just a few minutes. While there are occasional errors, especially with industry-specific terms, the overall accuracy is good. The user-friendly interface makes it easy to make quick edits when needed. I particularly like the timestamp feature, which makes navigating long videos a breeze.",
      name: "Emily Chen",
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      rating: 5,
      review:
        "As a journalist, accuracy in transcription is crucial for my work. This service has consistently delivered high-quality results, even with challenging audio conditions. The ability to easily export the transcription in various formats is a huge plus. It's become an essential tool in my reporting toolkit. The multi-speaker detection is particularly useful for interviews and panel discussions.",
      name: "Michael Brown",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      rating: 4,
      review:
        "I use this service for transcribing interviews and focus group sessions. The multi-speaker detection is quite good, though not perfect. What I appreciate most is the time-stamping feature, which makes it easy to navigate long transcriptions. The pricing is reasonable for the value it provides. The ability to collaborate with team members on editing and annotating transcripts has greatly improved our research workflow.",
      name: "Sarah Lee",
      profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      rating: 5,
      review:
        "As a non-native English speaker, I was worried about how well this service would handle my accent. I'm pleasantly surprised by its accuracy. It's been a game-changer for me in creating subtitles for my YouTube videos. The integration with video editing software is seamless and saves me countless hours. The automatic translation feature is an unexpected bonus that has helped me reach a wider audience.",
      name: "Carlos Rodriguez",
      profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      rating: 4,
      review:
        "I've been using this transcription service for my podcast for the past six months. The accuracy is generally very good, especially for clear audio. I love how it handles punctuation and paragraph breaks intelligently. The only reason I'm not giving it 5 stars is that I wish it had more advanced editing features built-in. That said, the time it saves me in post-production is invaluable, allowing me to focus more on content creation.",
      name: "Emma Watson",
      profileImage: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      rating: 5,
      review:
        "This tool has been a lifesaver for my online course creation. Transcribing my video lectures used to be a major bottleneck, but now it's a breeze. The accuracy with technical terms in my field (biochemistry) is impressive. The option to train the AI with specific vocabulary is a fantastic feature. It has significantly reduced the time and cost associated with making my courses accessible to a wider audience.",
      name: "Dr. David Kim",
      profileImage: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      rating: 4,
      review:
        "As a digital marketing agency, we process a lot of video content for our clients. This transcription service has significantly sped up our workflow. The batch processing feature is particularly useful. While it's not perfect with very noisy backgrounds, it handles most of our needs admirably. The customer support is also top-notch. The analytics feature, which provides insights into speech patterns and keyword usage, has been an unexpected bonus for our content strategy team.",
      name: "Lisa Thompson",
      profileImage: "https://randomuser.me/api/portraits/women/10.jpg",
    },
  ];

  return (
    <Card className="mt-8 w-full max-w-[80vw] mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <Review key={index} {...review} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
