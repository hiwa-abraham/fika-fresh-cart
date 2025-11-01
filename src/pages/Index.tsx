import { useState } from "react";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import ProductCard, { Product } from "@/components/ProductCard";
import Cart, { CartItem } from "@/components/Cart";
import CheckoutDialog, { OrderData } from "@/components/CheckoutDialog";
import OrderConfirmation from "@/components/OrderConfirmation";
import { Apple, Milk, Beef, Croissant } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-groceries.jpg";
import { downloadReceipt, downloadShoppingList } from "@/utils/downloadUtils";

const categories = [
  { icon: Apple, title: "Fresh Produce", itemCount: 45 },
  { icon: Milk, title: "Dairy & Eggs", itemCount: 32 },
  { icon: Beef, title: "Meat & Fish", itemCount: 28 },
  { icon: Croissant, title: "Bakery", itemCount: 24 },
];

const products: Product[] = [
  { id: 1, name: "Organic Tomatoes", price: 29.90, unit: "kg", image: "/placeholder.svg", category: "Fresh Produce" },
  { id: 2, name: "Fresh Milk", price: 18.50, unit: "L", image: "/placeholder.svg", category: "Dairy & Eggs" },
  { id: 3, name: "Sourdough Bread", price: 35.00, unit: "pc", image: "/placeholder.svg", category: "Bakery" },
  { id: 4, name: "Red Apples", price: 25.90, unit: "kg", image: "/placeholder.svg", category: "Fresh Produce" },
  { id: 5, name: "Cheddar Cheese", price: 45.00, unit: "200g", image: "/placeholder.svg", category: "Dairy & Eggs" },
  { id: 6, name: "Salmon Fillet", price: 89.90, unit: "kg", image: "/placeholder.svg", category: "Meat & Fish" },
  { id: 7, name: "Fresh Spinach", price: 22.50, unit: "bag", image: "/placeholder.svg", category: "Fresh Produce" },
  { id: 8, name: "Croissants", price: 28.00, unit: "4pc", image: "/placeholder.svg", category: "Bakery" },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderData | null>(null);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === productId);
      if (!item) return prev;
      
      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        return prev.filter((item) => item.id !== productId);
      }
      
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (orderData: OrderData) => {
    setCurrentOrder(orderData);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
    setCartItems([]);
    
    toast({
      title: "Order placed successfully!",
      description: `Your order ${orderData.orderNumber} has been confirmed.`,
    });
  };

  const handleDownloadReceipt = () => {
    if (currentOrder) {
      downloadReceipt(currentOrder);
      toast({
        title: "Receipt downloaded",
        description: "Your receipt has been saved.",
      });
    }
  };

  const handleDownloadShoppingList = () => {
    if (currentOrder) {
      downloadShoppingList(currentOrder.items);
      toast({
        title: "Shopping list downloaded",
        description: "Your shopping list has been saved.",
      });
    }
  };

  const handleDownloadCartList = () => {
    downloadShoppingList(cartItems);
    toast({
      title: "Shopping list downloaded",
      description: "Your shopping list has been saved.",
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <img
          src={heroImage}
          alt="Fresh groceries"
          className="w-full h-full object-cover mix-blend-multiply opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Fresh groceries, delivered
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Quality products from local farms and suppliers, delivered to your door
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 space-y-12">
        {/* Categories */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <a href="#" className="text-primary hover:underline font-medium">
              View all
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        onDownloadList={handleDownloadCartList}
      />

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={cartTotal}
        onOrderComplete={handleOrderComplete}
      />

      <OrderConfirmation
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        orderData={currentOrder}
        onDownloadReceipt={handleDownloadReceipt}
        onDownloadShoppingList={handleDownloadShoppingList}
      />
    </div>
  );
};

export default Index;
