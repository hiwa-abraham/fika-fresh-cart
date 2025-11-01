import { OrderData } from "@/components/CheckoutDialog";
import { CartItem } from "@/components/Cart";

export const downloadReceipt = (orderData: OrderData) => {
  const receiptContent = `
FreshMart - Receipt
${'='.repeat(50)}

Order Number: ${orderData.orderNumber}
Date: ${orderData.date}
Customer: ${orderData.customerName}
Email: ${orderData.email}
Phone: ${orderData.phone}

Delivery Address:
${orderData.address}

${'='.repeat(50)}
ITEMS
${'='.repeat(50)}

${orderData.items
  .map(
    (item) =>
      `${item.name}
Quantity: ${item.quantity} x ${item.price} kr/${item.unit}
Subtotal: ${(item.price * item.quantity).toFixed(2)} kr
`
  )
  .join('\n')}

${'='.repeat(50)}
TOTAL: ${orderData.total.toFixed(2)} kr
${'='.repeat(50)}

Thank you for shopping with FreshMart!
For questions, contact us at support@freshmart.se

This is your official receipt.
Keep it for your records.
  `;

  const blob = new Blob([receiptContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `FreshMart_Receipt_${orderData.orderNumber}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadShoppingList = (items: CartItem[]) => {
  const listContent = `
FreshMart - Shopping List
Generated: ${new Date().toLocaleDateString("sv-SE")}

${'='.repeat(50)}

${items
  .map(
    (item, index) =>
      `${index + 1}. ${item.name}
   Quantity: ${item.quantity} ${item.unit}
   Category: ${item.category}
`
  )
  .join('\n')}

${'='.repeat(50)}
Total Items: ${items.reduce((sum, item) => sum + item.quantity, 0)}
Estimated Total: ${items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)} kr

Happy shopping at FreshMart!
  `;

  const blob = new Blob([listContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `FreshMart_Shopping_List_${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
