import { useContext, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCheck, Hash } from "lucide-react";
import { UserContext } from "./Dashboard";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import axios from "axios";
import { useEmployerData } from "@/store/employer/employerStore";
import {
  useCreateSubscription,
  useSubscribe,
} from "@/hooks/useUserSubscription";

const SubscriptionType = Object.freeze({
  FREE: "FREE",
  SILVER: "SILVER",
  GOLD: "GOLD",
  PLATINUM: "PLATINUM",
});

const monthlySubscriptions = [
  {
    desc: "First month free for all new users",
    price: "0",
    subTitle: "",
    priceDuration: "1 month free",
    planTitle: "Free plan",
    planType: SubscriptionType.FREE,
    benefits: [
      "Only allow new user to explore our platform for the first month",
    ],
  },
  {
    desc: "Designed for agents and employers",
    price: "25,000",
    subTitle: "",
    priceDuration: "3 months",
    planTitle: "Silver plan",
    planType: SubscriptionType.SILVER,
    benefits: [
      "Access to all basic features on this personalized jobs",
      "Provide a solid foundation for limited posting",
      "10 vetted job posting throughout the entire 3 months period.",
    ],
  },
  {
    desc: "Designed for agents and employers",
    price: "70,000",
    subTitle: "Most Popular",
    planTitle: "Gold plan",
    planType: SubscriptionType.GOLD,
    priceDuration: "6 months",
    benefits: [
      "The Gold plan offers extended benefits for users looking for more flexibiity and a longer commitment.",
      "Unlimited vetted job listing, posting and Tech talent search support",
    ],
  },
  {
    desc: "Designed for agents and employers",
    price: "90,000",
    subTitle: "Recommended",
    planTitle: "Platinum plan",
    planType: SubscriptionType.PLATINUM,
    priceDuration: "1 yearly",
    benefits: [
      "The Platinum plan caters to users seeking an even longer commitment with added features.",
      "Access to unlimited vetted and featured tech talents, fast job application, Tech talent profile matching mechanism and NXG hub customer support.",
    ],
  },
];

export function SubscriptionPage() {
  const employer = useEmployerData((state) => state.employerData);
  const user = useContext(UserContext);
  const [exchangeRate, setExchangeRate] = useState(null);
  // Function to fetch and convert prices to Naira

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
      );
      const data = await response.json();
      //   console.log(data.usd["ngn"]);
      setExchangeRate(data.usd["ngn"]); // Assuming NGN is the target currency
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  const convertToDollar = (price) => {
    if (exchangeRate) {
      const priceInNGN = parseFloat(price.replace("₦", "")) * 1000;
      const priceInDollar = priceInNGN / exchangeRate;
      return " $" + priceInDollar.toFixed(2);
    } else {
      return price;
    }
  };

  return (
    <div className="text-center space-y-24">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-medium">
          Choose Your Subscription Plan!!!
        </h2>
        <p className="w-1/3 text-sm text-gray-600">
          Choose the subscription plan that best suits you, start for free now
          and upgrade later ..
        </p>
      </div>
      <div className=" grid grid-cols-1 gap-6 md:grid-cols-4 mx-auto">
        {monthlySubscriptions.map((sub, index) => (
          <SubscribePlanCard
            key={index}
            desc={sub.desc}
            planTitle={sub.planTitle}
            benefits={sub.benefits}
            price={sub.price}
            priceDuration={sub.priceDuration}
            planType={sub.planType}
            subTitle={sub.subTitle}
          />
        ))}
      </div>
    </div>
  );
}

const SubscribePlanCard = ({
  desc,
  subTitle,
  planTitle,
  benefits = [],
  price,
  priceDuration,
  planType,
}) => {
  const { firstName, lastName, email, phoneNumber } = useEmployerData(
    (state) => state.employerData
  );

  const {
    mutate: createSubscription,
    isPending,
    isSuccess,
    isError,
    progress,
    data: cloudinaryResponse,
  } = useCreateSubscription();

  const { mutate: subscribeUser } = useSubscribe();

  const handlePayment = (typeOfPlan) => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phoneNumber,
      planType: typeOfPlan,
    };
    createSubscription(
      {
        url: `${API_HOST_URL}/api/subscriptions/create-account`,
        payload: payload,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          subscribeUser(
            {
              url: `${API_HOST_URL}/api/subscriptions/subscribe`,
              payload: {
                email: user.email,
                callback_url: `${window.location.origin}/sub-success`,
              },
            },
            {
              onSuccess: (subscribeResponse) => {
                console.log(subscribeResponse.data.data.authorization_url);
                if (
                  subscribeResponse.data &&
                  subscribeResponse.data.data &&
                  subscribeResponse.data.data.authorization_url
                ) {
                  // Redirect user to the authorization_url
                  window.location.href =
                    subscribeResponse.data.data.authorization_url;
                } else {
                  console.error("Authorization URL is missing.");
                  // Handle the scenario where authorization_url is missing
                }
              },
            }
          );
        },
      }
    );
  };

  return (
    <div className=" rounded-md w-[270px] border-[1px] ">
      {subTitle !== "" && (
        <div
          className={cn(
            "text-sm border-b-[1px] w-full py-1 rounded-t-md",
            `${
              planType === SubscriptionType.GOLD
                ? "bg-yellow-800 hover:bg-yellow-800 text-white"
                : planType === SubscriptionType.SILVER
                ? "bg-stone-300 hover:bg-stone-300 text-gray-800"
                : planType === SubscriptionType.PLATINUM
                ? "bg-secondary hover:bg-secondary text-white"
                : "bg-slate-500 hover:bg-slate-500"
            }`
          )}
        >
          {subTitle}
        </div>
      )}
      <div className="flex flex-col px-4 mt-5">
        <div className="flex flex-col mb-10">
          <div className="flex">
            <Hash className="w-4 h-4" />
            <span className="font-bold text-4xl">{price}</span>
          </div>
          <div className="flex">
            <Badge
              className={cn(
                " flex items-center justify-center",
                `${
                  planType === SubscriptionType.GOLD
                    ? "bg-yellow-800 hover:bg-yellow-800 text-white"
                    : planType === SubscriptionType.SILVER
                    ? "bg-stone-300 hover:bg-stone-300 text-gray-800"
                    : planType === SubscriptionType.PLATINUM
                    ? "bg-secondary hover:bg-secondary"
                    : "bg-slate-500 hover:bg-slate-500"
                }`
              )}
            >
              {planTitle}
            </Badge>
            <Badge
              variant="outline"
              className=" flex items-center justify-center"
            >
              {priceDuration}
            </Badge>
          </div>
        </div>

        <span className=" text-gray-400 text-sm mb-10 text-center">{desc}</span>

        <div className="mb-5">
          {benefits.map((b, i) => (
            <div key={i} className="flex gap-2">
              <Badge className="h-4 w-4 rounded-full p-[1px] flex items-center justify-center">
                <CheckCheck className="w-4 h-4 text-white" />
              </Badge>

              <span className="text-left text-sm mb-3">{b}</span>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-white border-none bg-secondary hover:bg-primary hover:text-white mb-5"
          onClick={() => handlePayment(planType)}
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};
