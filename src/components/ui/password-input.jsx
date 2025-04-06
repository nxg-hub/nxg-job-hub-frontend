"use client";

import { useState, forwardRef } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming Input is forwardRef
import { cn } from "@/lib/utils";

// Ensure that PasswordInput forwards refs
const PasswordInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const disabled =
    props.value === "" || props.value === undefined || props.disabled;

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("hide-password-toggle pr-10", props.className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent border-none"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}>
        {showPassword && !disabled ? (
          <FaRegEye
            className="h-4 w-4"
            aria-hidden="true"
          />
        ) : (
          <FaRegEyeSlash
            className="h-4 w-4"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>

      {/* hides browsers password toggles */}
      <style>{`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
