"use client"

import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="px-4 py-8 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Stock Search</h1>

        <div className="mb-8">
          <p className="text-muted-foreground">
            Search for stocks by symbol or company name
          </p>
        </div>

        <div className="mb-4">
          <Input type="text" placeholder="Search stocks..." />
        </div>
      </main>
    </div>
  );
}
