import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { nigerianStates, countryOptions } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export default function RenderStepTwo({ form }) {
  const { control } = useFormContext();

  return (
    <div className="space-y-5 md:space-y-8">
      <div className="hidden md:flex flex-col gap-1">
        <h1 className="font-semibold text-xl text-slate-800">
          Location & Contact
        </h1>
        <p className="text-sm text-gray-600">
          Physical and contact details for official communication.
        </p>
      </div>
      <div className="md:hidden">
        <h1 className="text-sm font-semibold text-secondary">
          Step 2 (Location & Contact)
        </h1>
        <p className="text-xs text-gray-600">
          Physical and contact details for official communication.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Country</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="font-normal h-11 text-sm">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {countryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage className="text-xs md:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">State</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="font-normal h-11 text-sm">
                    <SelectValue placeholder="Select state  " />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {nigerianStates.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage className="text-xs md:text-sm" />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="companyAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-600">
              Company Full Address
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Street, City,"
                className="resize-none text-sm"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs md:text-sm" />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="companyZipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">
                Company Zip/Postal Code
              </FormLabel>
              <FormControl>
                <Input
                  className="h-11 text-sm"
                  placeholder="12345"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs md:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="companyPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Company Phone</FormLabel>
              <FormControl className="w-full">
                <PhoneInput
                  placeholder="+1 555 123 4567"
                  {...field}
                  defaultCountry="NG"
                />
              </FormControl>
              <FormMessage className="text-xs md:text-sm" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
