import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail } from "lucide-react";
import { OrderData } from "./CheckoutDialog";

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderData | null;
  onDownloadReceipt: () => void;
  onDownloadShoppingList: () => void;
}

const OrderConfirmation = ({
  isOpen,
  onClose,
  orderData,
  onDownloadReceipt,
  onDownloadShoppingList,
}: OrderConfirmationProps) => {
  if (!orderData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            Order Confirmed!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-secondary p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Order Number:</div>
              <div className="font-semibold">{orderData.orderNumber}</div>
              
              <div className="text-muted-foreground">Date:</div>
              <div className="font-semibold">{orderData.date}</div>
              
              <div className="text-muted-foreground">Customer:</div>
              <div className="font-semibold">{orderData.customerName}</div>
              
              <div className="text-muted-foreground">Email:</div>
              <div className="font-semibold">{orderData.email}</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="space-y-2">
              {orderData.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm bg-secondary/50 p-2 rounded"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">
                    {(item.price * item.quantity).toFixed(2)} kr
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>{orderData.total.toFixed(2)} kr</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={onDownloadReceipt}
              className="w-full bg-[var(--gradient-fresh)] hover:opacity-90"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            
            <Button
              onClick={onDownloadShoppingList}
              variant="outline"
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Shopping List
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
              <Mail className="h-4 w-4" />
              <span>Confirmation email sent to {orderData.email}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmation;
