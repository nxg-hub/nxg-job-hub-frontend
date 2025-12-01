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
import { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Country, State } from "country-state-city";

export default function RenderStepTwo({ form }) {
  const [states, setStates] = useState([]);
  const { control, getValues, setValue } = useFormContext();

  const countries = useMemo(() => {
    return Country.getAllCountries();
  }, []);

  const selectedCountry = useWatch({
    control,
    name: "country",
  });

  useEffect(() => {
    if (selectedCountry) {
      const countryInfo = countries.find((c) => c.name === selectedCountry);
      if (countryInfo && countryInfo.name === "Nigeria") {
        const countryState = State.getStatesOfCountry(countryInfo.isoCode);
        setStates(countryState);

        const currentStateValue = getValues("state");
        const isCurrentStateValid = countryState.some(
          (s) => s.name === currentStateValue
        );

        //reset state value only if current country value changes
        if (!isCurrentStateValid) {
          setValue("state", "", { shouldValidate: false });
        }
      } else {
        setValue("state", countryInfo.name, { shouldValidate: true });
      }
    } else {
      // if no country selected clear state value list
      setStates([]);
      setValue("state", "", { shouldValidate: true });
    }
  }, [selectedCountry, setValue, getValues]);

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
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="font-normal h-11 text-sm">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.name}>
                      {country.name}
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
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
                disabled={!selectedCountry || states.length === 0}
              >
                <FormControl>
                  <SelectTrigger className="font-normal h-11 text-sm">
                    <SelectValue placeholder="Select state  " />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.name}>
                      {state.name}
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
