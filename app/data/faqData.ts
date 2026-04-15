export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  {
    category: "General",
    question: "What is Madura Travel Service?",
    answer: "Madura Travel Service is a premium travel platform dedicated to providing seamless booking experiences for tours, visas, and customized holidays across the globe. With over 45 years of expertise, we ensure your journey is comfortable and memorable."
  },
  {
    category: "General",
    question: "Where are your offices located?",
    answer: "Our main offices are in Chennai, Mumbai, and Delhi. We also have a global network of partners to support our travelers worldwide."
  },
  {
    category: "Booking",
    question: "How do I book a tour?",
    answer: "You can book a tour directly through our website by selecting your destination, choosing a tour package, and following the checkout process. Alternatively, you can contact our travel experts for a customized itinerary."
  },
  {
    category: "Booking",
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, cancellations and rescheduling are possible subject to the specific terms and conditions of the tour package. Please refer to our Cancellation Policy or contact your relationship manager for assistance."
  },
  {
    category: "Visa",
    question: "How long does it take to process a visa?",
    answer: "Visa processing times vary by country and type of visa. Generally, it takes between 3 to 15 working days. We provide real-time tracking for your applications to keep you updated."
  },
  {
    category: "Visa",
    question: "What documents are required for a tourist visa?",
    answer: "Commonly required documents include a valid passport (at least 6 months validity), recent photographs, bank statements, and travel insurance. Specific requirements depend on the destination country."
  },
  {
    category: "Payment",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, net banking, UPI, and bank transfers. Our payment gateway is secure and encrypted for your safety."
  },
  {
    category: "Payment",
    question: "Is it safe to pay online on your website?",
    answer: "Absolutely. We use industry-standard SSL encryption and partner with leading payment gateways to ensure your financial data is always protected."
  },
  {
    category: "Tours",
    question: "Are flights included in the tour packages?",
    answer: "Many of our 'All-Inclusive' packages include flights. However, we also offer 'Land-Only' packages for travelers who prefer to book their own flights. Please check the 'Inclusions' section of your chosen tour."
  },
  {
    category: "Tours",
    question: "Do you provide vegetarian food on international tours?",
    answer: "Yes, we specialize in providing authentic Indian vegetarian and Jain food on our group tours. For customized tours, we can arrange meals based on your dietary preferences."
  }
];

export const faqCategories = ["All", "General", "Booking", "Visa", "Payment", "Tours"];
