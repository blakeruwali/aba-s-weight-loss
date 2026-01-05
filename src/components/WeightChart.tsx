import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";
import type { WeighIn } from "@/data/members";

interface WeightChartProps {
  weightHistory: WeighIn[];
  startingWeight: number;
  targetWeight?: number;
}

export const WeightChart = ({ weightHistory, startingWeight, targetWeight }: WeightChartProps) => {
  const data = weightHistory.map((entry, index) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    weight: entry.weight,
    attended: entry.attended,
    checkpoint: index + 1,
  }));

  // Calculate 7% target if not provided
  const goalWeight = targetWeight || startingWeight * 0.93;
  
  const minWeight = Math.min(...data.map(d => d.weight), goalWeight) - 5;
  const maxWeight = Math.max(...data.map(d => d.weight), startingWeight) + 5;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
          <p className="font-display text-sm font-bold">{data.date}</p>
          <p className="text-lg font-bold text-primary">{data.weight} lbs</p>
          {!data.attended && (
            <p className="text-xs text-destructive">No-show</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(90, 70%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(90, 70%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <XAxis 
            dataKey="date" 
            stroke="hsl(220, 10%, 60%)"
            tick={{ fill: "hsl(220, 10%, 60%)", fontSize: 12 }}
            axisLine={{ stroke: "hsl(220, 15%, 22%)" }}
          />
          <YAxis 
            domain={[minWeight, maxWeight]}
            stroke="hsl(220, 10%, 60%)"
            tick={{ fill: "hsl(220, 10%, 60%)", fontSize: 12 }}
            axisLine={{ stroke: "hsl(220, 15%, 22%)" }}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Starting weight reference line */}
          <ReferenceLine 
            y={startingWeight} 
            stroke="hsl(220, 10%, 40%)" 
            strokeDasharray="3 3"
            label={{ value: "Start", fill: "hsl(220, 10%, 60%)", fontSize: 10 }}
          />
          
          {/* Goal weight reference line (7% loss) */}
          <ReferenceLine 
            y={goalWeight} 
            stroke="hsl(45, 100%, 55%)" 
            strokeDasharray="3 3"
            label={{ value: "7% Goal", fill: "hsl(45, 100%, 55%)", fontSize: 10 }}
          />
          
          <Area
            type="monotone"
            dataKey="weight"
            stroke="hsl(90, 70%, 50%)"
            strokeWidth={3}
            fill="url(#weightGradient)"
            dot={{ fill: "hsl(90, 70%, 50%)", strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, fill: "hsl(90, 70%, 60%)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
