"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

interface ClientRegistrationSuccessProps {
  onReset: () => void;
}

export function ClientRegistrationSuccess({ onReset }: ClientRegistrationSuccessProps) {
  const tForm = useTranslations("Form");

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="flex flex-col items-center gap-4 py-12">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-center">{tForm("successTitle")}</h2>
        <p className="text-sm text-muted-foreground text-center">{tForm("successMessage")}</p>
        <Button variant="outline" onClick={onReset}>
          {tForm("newRegistration")}
        </Button>
      </CardContent>
    </Card>
  );
}
