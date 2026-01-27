"use client";
import ThemeSwitcher from "@/components/theme-switcher";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="font-medium tracking-tighter text-xl flex items-center gap-2">
              🌍 GeoCheck
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="https://thordata.com"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Powered by Thordata
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
