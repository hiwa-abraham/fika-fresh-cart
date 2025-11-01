import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  itemCount: number;
}

const CategoryCard = ({ icon: Icon, title, itemCount }: CategoryCardProps) => {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-[var(--shadow-card)] hover:-translate-y-1 [transition:var(--transition-smooth)]">
      <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{itemCount} items</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
