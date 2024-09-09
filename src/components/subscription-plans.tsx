"use client";

import { Check, Shuffle, LogIn } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 50%)`;
};

export function SubscriptionPlans() {
  const [plans, setPlans] = useState([
    {
      name: "Free",
      price: "$0",
      description: "Basic features for personal use",
      features: ["1 user", "5 projects", "2GB storage"],
      colorFrom: "hsl(260, 70%, 50%)",
      colorTo: "hsl(230, 70%, 50%)",
    },
    {
      name: "Monthly",
      price: "$9.99",
      description: "Advanced features for professionals",
      features: ["5 users", "20 projects", "10GB storage", "Priority support"],
      colorFrom: "hsl(330, 70%, 50%)",
      colorTo: "hsl(360, 70%, 50%)",
    },
    {
      name: "Yearly",
      price: "$99.99",
      description: "Premium features for teams",
      features: [
        "Unlimited users",
        "Unlimited projects",
        "100GB storage",
        "24/7 support",
        "Custom integrations",
      ],
      colorFrom: "hsl(40, 70%, 50%)",
      colorTo: "hsl(20, 70%, 50%)",
    },
  ]);

  const changeColors = () => {
    setPlans(
      plans.map((plan) => ({
        ...plan,
        colorFrom: generateRandomColor(),
        colorTo: generateRandomColor(),
      }))
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        .ripple-text:hover span {
          display: inline-block;
          animation: ripple 0.5s ease-in-out infinite;
        }
        .ripple-text:hover span:nth-child(1) {
          animation-delay: 0s;
        }
        .ripple-text:hover span:nth-child(2) {
          animation-delay: 0.05s;
        }
        .ripple-text:hover span:nth-child(3) {
          animation-delay: 0.1s;
        }
        .ripple-text:hover span:nth-child(4) {
          animation-delay: 0.15s;
        }
        .ripple-text:hover span:nth-child(5) {
          animation-delay: 0.2s;
        }
        .ripple-text:hover span:nth-child(6) {
          animation-delay: 0.25s;
        }
        .ripple-text:hover span:nth-child(7) {
          animation-delay: 0.3s;
        }
        .ripple-text:hover span:nth-child(8) {
          animation-delay: 0.35s;
        }
        .ripple-text:hover span:nth-child(9) {
          animation-delay: 0.4s;
        }
        .ripple-text:hover span:nth-child(10) {
          animation-delay: 0.45s;
        }
        .ripple-text:hover span:nth-child(11) {
          animation-delay: 0.5s;
        }
      `}</style>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        <div className="fixed top-4 right-4 flex space-x-2">
          <Button
            onClick={changeColors}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Shuffle className="mr-2 h-4 w-4" /> Randomize Colors
          </Button>
          <Link href="/login">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="relative text-white shadow-xl transform transition-all duration-300 hover:scale-105 overflow-hidden group flex flex-col"
            >
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, ${plan.colorFrom}, ${plan.colorTo})`,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to bottom, ${plan.colorFrom}, ${plan.colorTo})`,
                }}
              />
              <div className="relative z-10 flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-lg font-semibold text-white/80">
                    {plan.price}/month
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full bg-white text-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                    <span className="relative z-10 ripple-text">
                      {"Choose Plan".split("").map((char, i) => (
                        <span key={i}>{char}</span>
                      ))}
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(45deg, ${plan.colorFrom}, ${plan.colorTo})`,
                      }}
                    />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
