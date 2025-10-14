import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POPULAR_STOCKS } from "@/lib/mock-data";

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

        <div className="mb-8">
          <Input type="text" placeholder="Search stocks..." />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-muted-foreground">
              Popular Stocks
            </h2>
            <Badge variant="secondary">Demo</Badge>
          </div>
          <div className="space-y-3">
            {POPULAR_STOCKS.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/stock/${stock.symbol}`}
                className="block"
              >
                <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{stock.symbol}</h3>
                      <p className="text-sm text-muted-foreground">
                        {stock.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {stock.region}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
