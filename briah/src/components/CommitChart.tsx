import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "@/components/ui/card";
  import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    Line,
    CartesianGrid,
  } from "recharts";
  import { CommitData } from "../types";
  import { Separator } from "@/components/ui/separator";
  
  interface Props {
    data: CommitData[];
  }
  
  export const CommitChart = ({ data }: Props) => {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Daily Commit Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <CartesianGrid strokeDasharray="3 3" />
                <RechartsTooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground">
              No commit data available.
            </p>
          )}
        </CardContent>
      </Card>
    );
  };
  