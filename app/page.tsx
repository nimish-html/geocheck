import GeoChecker from "@/components/geo-checker";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      <GeoChecker />
      <Footer />
    </main>
  );
}
