import { BarChartBig } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

export const DataCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <>
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardContent>
          <div>
            <div className="ml-[5rem] my-3 text-emerald-500">
              <BarChartBig className="w-10 h-10" />
            </div>
            {content}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
