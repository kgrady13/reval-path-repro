// Disabled to test if this is the cause of revalidatePath not working
// See: https://github.com/vercel/next.js/issues/59883
// export function generateStaticParams() {
//   return [{ lang: "en" }, { lang: "es" }];
// }

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
