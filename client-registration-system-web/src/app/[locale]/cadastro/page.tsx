import { getTranslations } from "next-intl/server";
import { ClientRegistrationForm } from "./components/ClientRegistrationForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: "Form" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CadastroPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: "Form" });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-lg mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {t("description")}
        </p>
      </div>
      <ClientRegistrationForm />
    </main>
  );
}
