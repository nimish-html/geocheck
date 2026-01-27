"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-card mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <Link
            href="/"
            className="text-xl font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            🌍 GeoCheck
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
            <span>© {year} GeoCheck</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Powered by{" "}
              <Link
                href="https://thordata.com"
                target="_blank"
                className="font-medium hover:underline"
              >
                Thordata
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

