import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./context/auth";
import { Protected } from "./components/Routes/Protected";
import { CategoriesProvider } from "./context/categoriesContext";
import { ProductProvider } from "./context/ProductContext";
import { SearchProvider } from "./context/searchContext";
import Spinner from "./components/Spinner";
import SearchItems from "./components/SearchItems";
import { CartProvider } from "./context/cartContext";
import AllOrders from "./components/Admin/AllOrders";

const App = () => {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <ProductProvider>
          <CartProvider>
            <SearchProvider>
              <Layout>
                <Outlet />
              </Layout>
            </SearchProvider>
          </CartProvider>
        </ProductProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
};
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Cart = lazy(() => import("./components/Cart"));
const Category = lazy(() => import("./components/Category"));
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const Logout = lazy(() => import("./components/Logout"));
const UserDashboard = lazy(() =>
  import("./components/Dashboard/UserDashboard")
);
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const AdminDashboard = lazy(() =>
  import("./components/Dashboard/AdminDashboard")
);
const DeleteProduct = lazy(() => import("./components/Admin/DeleteProduct"));
const UpdateProduct = lazy(() => import("./components/Admin/UpdateProduct"));
const Protected = lazy(() => import("./components/Routes/Protected"));
const CreateCategory = lazy(() => import("./components/Admin/CreateCategory"));
const CreateProduct = lazy(() => import("./components/Admin/CreateProduct"));
const Users = lazy(() => import("./components/Admin/Users"));
const AllOrders = lazy(() => import("./components/Admin/AllOrders"));
const Products = lazy(() => import("./components/Admin/Products"));
const Profile = lazy(() => import("./components/User/Profile"));
const Orders = lazy(() => import("./components/User/Orders"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<Spinner />}>
            <SearchItems />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Spinner />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Spinner />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Spinner />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/category",
        element: (
          <Suspense fallback={<Spinner />}>
            <Category />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Spinner />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/logout",
        element: (
          <Suspense fallback={<Spinner />}>
            <Logout />
          </Suspense>
        ),
      },
      {
        path: "/product-details/:slug",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<Spinner />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "/user-dashboard",
        element: <Protected checkFor={"user"} />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Spinner />}>
                <UserDashboard />
              </Suspense>
            ),
          },

          {
            path: "/user-dashboard/profile",
            element: (
              <Suspense fallback={<Spinner />}>
                <UserDashboard>
                  <Profile />
                </UserDashboard>
              </Suspense>
            ),
          },
          {
            path: "/user-dashboard/orders",
            element: (
              <Suspense fallback={<Spinner />}>
                <UserDashboard>
                  <Orders />
                </UserDashboard>
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/admin-dashboard",
        element: <Protected checkFor={"admin"} />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Spinner />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: "/admin-dashboard/createCategory",
            element: (
              <Suspense fallback={<Spinner />}>
                <AdminDashboard>
                  <CreateCategory />
                </AdminDashboard>
              </Suspense>
            ),
          },
          {
            path: "/admin-dashboard/createProduct",
            element: (
              <Suspense fallback={<Spinner />}>
                <AdminDashboard>
                  <CreateProduct />
                </AdminDashboard>
              </Suspense>
            ),
          },
          {
            path: "/admin-dashboard/users",
            element: (
              <Suspense fallback={<Spinner />}>
                <AdminDashboard>
                  <Users />
                </AdminDashboard>
              </Suspense>
            ),
          },
          {
            path: "/admin-dashboard/products",
            element: (
              <Suspense fallback={<Spinner />}>
                <AdminDashboard>
                  <Products />
                </AdminDashboard>
              </Suspense>
            ),
          },
          {
            path: "/admin-dashboard/update-product/:slug",
            element: (
              <Suspense fallback={<Spinner />}>
                <AdminDashboard>
                  <UpdateProduct />
                </AdminDashboard>
              </Suspense>
            ),
          },
          {
            path: "/admin-dashboard/delete-product",
            element: (
              <Suspense fallback={<Spinner />}>
                <AdminDashboard>
                  <DeleteProduct />
                </AdminDashboard>
              </Suspense>
            ),
          },
          {
            path: "/admin-dashboard/all-orders",
            element: (
              <Suspense fallback={<Spinner />}>
                <AdminDashboard>
                  <AllOrders />
                </AdminDashboard>
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
export default App;
