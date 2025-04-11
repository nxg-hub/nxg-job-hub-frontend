import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function JobsFilter({
  activeFilters,
  setActiveFilters,
  clients,
  serviceTypes,
}) {
  // Toggle priority filter
  const togglePriorityFilter = (priority) => {
    setActiveFilters((prev) => {
      const newPriorities = prev.priority.includes(priority)
        ? prev.priority.filter((p) => p !== priority)
        : [...prev.priority, priority];

      return {
        ...prev,
        priority: newPriorities,
      };
    });
  };

  // Toggle service type filter
  const toggleServiceTypeFilter = (type) => {
    setActiveFilters((prev) => {
      const newTypes = prev.serviceType.includes(type)
        ? prev.serviceType.filter((t) => t !== type)
        : [...prev.serviceType, type];

      return {
        ...prev,
        serviceType: newTypes,
      };
    });
  };

  // Toggle client filter
  const toggleClientFilter = (client) => {
    setActiveFilters((prev) => {
      const newClients = prev.client.includes(client)
        ? prev.client.filter((c) => c !== client)
        : [...prev.client, client];

      return {
        ...prev,
        client: newClients,
      };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      priority: [],
      serviceType: [],
      client: [],
    });
  };

  // Format service type for display
  const formatServiceType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card>
      <CardHeader className="brand-bg-light">
        <CardTitle>Filters</CardTitle>
        <CardDescription>
          Narrow down services by specific criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="font-medium text-[#0AACDC]">Priority</div>
          <div className="space-y-2">
            {["high", "medium", "low"].map((priority) => (
              <div
                key={priority}
                className="flex items-center space-x-2">
                <Checkbox
                  id={`priority-${priority}`}
                  checked={activeFilters.priority.includes(priority)}
                  onCheckedChange={() => togglePriorityFilter(priority)}
                  className="p-0"
                />
                <label
                  htmlFor={`priority-${priority}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="font-medium text-[#0AACDC]">Service Type</div>
          <div className="space-y-2">
            {serviceTypes.map((type) => (
              <div
                key={type}
                className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={activeFilters.serviceType.includes(type)}
                  onCheckedChange={() => toggleServiceTypeFilter(type)}
                  className="p-0"
                />
                <label
                  htmlFor={`type-${type}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {formatServiceType(type)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="font-medium text-[#0AACDC]">Client</div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between border-[#0AACDC]">
                {activeFilters.client.length > 0
                  ? `${activeFilters.client.length} selected`
                  : "Select clients"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search client..." />
                <CommandList>
                  <CommandEmpty>No clients found.</CommandEmpty>
                  <CommandGroup>
                    {clients.map((client) => (
                      <CommandItem
                        key={client}
                        value={client}
                        onSelect={() => toggleClientFilter(client)}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            activeFilters.client.includes(client)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {client}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {(activeFilters.priority.length > 0 ||
          activeFilters.serviceType.length > 0 ||
          activeFilters.client.length > 0) && (
          <>
            <Separator />
            <Button
              variant="outline"
              className="w-full border-[#0AACDC] text-[#0AACDC]"
              onClick={clearFilters}>
              Clear All Filters
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
