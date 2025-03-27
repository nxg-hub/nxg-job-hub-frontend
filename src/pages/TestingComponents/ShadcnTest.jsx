import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <Button
      disabled
      variant="primary"
      className="bg-red-500">
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  );
}
