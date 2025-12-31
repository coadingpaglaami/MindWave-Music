
import { Card, CardContent } from "@/components/ui/card";

export interface CardComponentProps {
  title: string;
  value: number | string;
}

export const CardComponent = ({ data }: { data: CardComponentProps[] }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((card, index) => (
        <Card key={index} className="p-4  min-h-28 shadow-brand">
          <CardContent className="justify-between flex flex-col h-full">
            <span className="text-[#6D4C41]">{card.title}</span>
            <h2 className="text-xl font-semibold ">{card.value}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
