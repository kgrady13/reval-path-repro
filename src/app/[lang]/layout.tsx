// Temporarily disabled to test if generateStaticParams prevents on-demand revalidation
// See: https://github.com/vercel/next.js/issues/59883
// export function generateStaticParams() {
//   return [{ lang: "en" }, { lang: "es" }];
// }

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
