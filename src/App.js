import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDeatails from "./pages/checkout/CheckoutDeatails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import NotFound from "./pages/notFound/NotFound";
import CashOnDelivery from "./pages/checkout/CashOnDelivery";
import MessengerCustomerChat from "react-messenger-customer-chat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDeatails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cash-on-delivery" element={<CashOnDelivery />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <MessengerCustomerChat pageId="903401654359234" appId="533043288204300" />
      ,
    </>
  );
}

export default App;
