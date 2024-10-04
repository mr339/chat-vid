import React from "react";
import Review from "./Review";

interface ReviewData {
  rating: number;
  review: string;
  name: string;
  profileImage: string;
  summary: string | null;
}

interface ReviewListProps {
  reviews: ReviewData[];
  isSummarized: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, isSummarized }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review, index) => (
        <Review key={index} {...review} showSummarizeButton={!isSummarized} />
      ))}
    </div>
  );
};

export default ReviewList;
