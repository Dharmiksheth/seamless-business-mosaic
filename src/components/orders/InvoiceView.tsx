
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/types";
import { 
  FileText, 
  Download, 
  Printer, 
  Send, 
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvoiceViewProps {
  order: Order;
}

export function InvoiceView({ order }: InvoiceViewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const invoiceNumber = `INV-${order.orderNumber.replace('ORD-', '')}`;
  const today = new Date().toLocaleDateString();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  
  const handlePrint = () => {
    toast({
      title: "Print Initiated",
      description: "The invoice has been sent to the printer.",
      variant: "default",
    });
    window.print();
  };
  
  const handleDownload = () => {
    setIsGenerating(true);
    
    // Simulate download delay
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Download Complete",
        description: `Invoice ${invoiceNumber} has been downloaded as PDF.`,
        variant: "default",
      });
    }, 1500);
  };
  
  const handleSendEmail = () => {
    setIsGenerating(true);
    
    // Simulate email sending delay
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Invoice Sent",
        description: `Invoice ${invoiceNumber} has been emailed to ${order.customer.email}.`,
        variant: "default",
      });
    }, 1500);
  };
  
  const handleCopyLink = () => {
    // Simulate copying a link
    toast({
      title: "Link Copied",
      description: "Invoice link has been copied to clipboard.",
      variant: "default",
    });
  };
  
  // Calculate subtotal
  const subtotal = order.items.reduce((total, item) => {
    return total + (item.quantity * item.unitPrice);
  }, 0);
  
  // Calculate tax (10%)
  const tax = subtotal * 0.1;
  
  // Calculate total
  const total = subtotal + tax;

  return (
    <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
          <p className="text-gray-600">{invoiceNumber}</p>
        </div>
        
        <div className="text-right">
          <h2 className="text-xl font-semibold text-gray-800">Your Company Name</h2>
          <p className="text-gray-600">123 Business Street</p>
          <p className="text-gray-600">City, State ZIP</p>
          <p className="text-gray-600">contact@yourcompany.com</p>
          <p className="text-gray-600">(123) 456-7890</p>
        </div>
      </div>
      
      <div className="flex justify-between mb-8">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Bill To:</h3>
          <p className="text-gray-700 font-medium">{order.customer.name}</p>
          <p className="text-gray-600">{order.customer.address}</p>
          <p className="text-gray-600">{order.customer.city}, {order.customer.state} {order.customer.postalCode}</p>
          <p className="text-gray-600">{order.customer.country}</p>
          <p className="text-gray-600">{order.customer.email}</p>
          <p className="text-gray-600">{order.customer.phone}</p>
        </div>
        
        <div className="text-right">
          <div className="mb-2">
            <span className="text-gray-600 font-medium">Invoice Date:</span>
            <span className="text-gray-800 ml-2">{today}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-600 font-medium">Order Date:</span>
            <span className="text-gray-800 ml-2">{new Date(order.date).toLocaleDateString()}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-600 font-medium">Order Number:</span>
            <span className="text-gray-800 ml-2">{order.orderNumber}</span>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Due Date:</span>
            <span className="text-gray-800 ml-2">{dueDate.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden mb-8">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-gray-700">Item</th>
              <th className="py-3 px-4 text-gray-700">Quantity</th>
              <th className="py-3 px-4 text-gray-700">Unit Price</th>
              <th className="py-3 px-4 text-gray-700 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 px-4 text-gray-800">{item.product.name}</td>
                <td className="py-3 px-4 text-gray-800">{item.quantity}</td>
                <td className="py-3 px-4 text-gray-800">${item.unitPrice.toFixed(2)}</td>
                <td className="py-3 px-4 text-gray-800 text-right">
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end mb-8">
        <div className="w-80">
          <div className="flex justify-between py-2">
            <span className="text-gray-600 font-medium">Subtotal:</span>
            <span className="text-gray-800">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600 font-medium">Tax (10%):</span>
            <span className="text-gray-800">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
            <span className="text-gray-800 font-semibold">Total:</span>
            <span className="text-gray-800 font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">Payment Instructions:</h4>
          <p className="text-gray-600">
            Please make payment within 30 days to the bank account details provided below.
          </p>
          <div className="mt-2">
            <p className="text-gray-600">Bank: National Bank</p>
            <p className="text-gray-600">Account Name: Your Company Name</p>
            <p className="text-gray-600">Account Number: 1234567890</p>
            <p className="text-gray-600">Routing Number: 012345678</p>
          </div>
        </div>
        
        <div className="text-gray-600 text-sm text-center mt-8">
          <p>Thank you for your business!</p>
        </div>
      </div>
      
      <div className="flex justify-center mt-8 space-x-4 print:hidden">
        <Button onClick={handlePrint} variant="outline">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button onClick={handleDownload} disabled={isGenerating}>
          <Download className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating..." : "Download PDF"}
        </Button>
        <Button onClick={handleSendEmail} variant="default" disabled={isGenerating}>
          <Send className="h-4 w-4 mr-2" />
          {isGenerating ? "Sending..." : "Send by Email"}
        </Button>
        <Button onClick={handleCopyLink} variant="outline">
          <Copy className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
      </div>
    </div>
  );
}
