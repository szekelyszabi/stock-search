import { MOCK_QUOTES } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function StockDetailPage({
  params,
}: {
  params: { symbol: string };
}) {
  const quote = MOCK_QUOTES[params.symbol.toUpperCase()];

  if (!quote) {
    notFound();
  }

  const isPositive = quote.change >= 0;

  return (
    <div className="px-4 py-8 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
        >
          ← Back to search
        </Link>

        <h1 className="text-4xl font-bold mb-8">{quote.symbol}</h1>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="text-4xl font-bold">
                ${quote.price.toFixed(2)}
              </div>
              <Badge
                variant={isPositive ? "default" : "destructive"}
                className="mt-2"
              >
                {isPositive ? "+" : ""}
                {quote.change.toFixed(2)} ({isPositive ? "+" : ""}
                {quote.changePercent.toFixed(2)}%)
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Latest: {quote.latestTradingDay}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Open</div>
                <div className="font-semibold">${quote.open.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Previous Close
                </div>
                <div className="font-semibold">
                  ${quote.previousClose.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">High</div>
                <div className="font-semibold">${quote.high.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Low</div>
                <div className="font-semibold">${quote.low.toFixed(2)}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-muted-foreground">Volume</div>
                <div className="font-semibold">
                  {quote.volume.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
