'use client'

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

interface PriceHistoryChartProps {
  data: Array<{ date: string; price: number }>
  symbol: string
}

const chartConfig = {
  price: {
    label: 'Price',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function PriceHistoryChart({ data }: PriceHistoryChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={(value) => `$${value}`}
          tickLine={false}
          axisLine={false}
          width={60}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString()
              }}
            />
          }
        />
        <Line type="monotone" dataKey="price" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}
