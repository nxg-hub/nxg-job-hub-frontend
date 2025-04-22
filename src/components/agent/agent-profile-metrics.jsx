import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function AgentProfileMetrics({ profileData }) {
  const { metrics, testimonials } = profileData;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Successful Matches</span>
              <span className="font-medium">{metrics.successfulMatches}</span>
            </div>
            <Progress
              value={metrics.successRate}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground text-right">
              {metrics.successRate}% success rate
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Client Satisfaction</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(metrics.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="ml-1 font-medium">
                  {metrics.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <Progress
              value={(metrics.rating / 5) * 100}
              className="h-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-md border p-3 text-center">
              <p className="text-2xl font-bold">{metrics.activeClients}</p>
              <p className="text-xs text-muted-foreground">Active Clients</p>
            </div>
            <div className="rounded-md border p-3 text-center">
              <p className="text-2xl font-bold">{metrics.totalMatches}</p>
              <p className="text-xs text-muted-foreground">Total Matches</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-sm italic">"{testimonial.text}"</p>
              {index < testimonials.length - 1 && (
                <div className="h-px bg-border my-3" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
