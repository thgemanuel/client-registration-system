import { redirect } from "@/i18n/routing";

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  redirect({ href: "/cadastro", locale: resolvedParams.locale });
}
