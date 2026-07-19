"use client";

import { useClientRegistrationForm } from "../hooks/useClientRegistrationForm";
import { ClientRegistrationFormFields } from "./ClientRegistrationFormFields";
import { ClientRegistrationSuccess } from "./ClientRegistrationSuccess";

import { Form } from "@/shared/lib/form";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function ClientRegistrationForm() {
  const { form, status, errorKey, onSubmit, onReset, tForm } = useClientRegistrationForm();

  if (status === "success") {
    return <ClientRegistrationSuccess onReset={onReset} />;
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{tForm("title")}</CardTitle>
        <CardDescription>{tForm("description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            <ClientRegistrationFormFields form={form} />

            {/* Submit */}
            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-2"
            >
              {status === "loading" ? tForm("submitting") : tForm("submit")}
            </Button>

            {/* Erro geral */}
            {status === "error" && (
              <p className="text-sm text-destructive text-center">
                {tForm(errorKey || "errorMessage")}
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
