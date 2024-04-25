
// import "../styles/prism-vsc-dark-plus.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import ErrorBoundary from "../components/ErrorBoundry";
import { Provider } from 'react-redux';
import { store } from "../redux/store";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";
import React, { useEffect, useState } from "react"
import '../styles/index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetUserDataUsingTokenQuery } from "@/services/user";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/actions/User';
import { setUser } from "@/redux/slices/UserSlice";
import { NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }) {

  const router = useRouter();
  const showHeaderAndFooter = !router.pathname.startsWith('/admin');

  const AppInsider = (pageProps) => {
    const [querySkip, setQuerySkip] = useState(true);
    const dispatch = useDispatch();

    const userData = useGetUserDataUsingTokenQuery(undefined, { skip: querySkip });
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token && !Object.keys(user).length) {
        setQuerySkip(false);
      }
      else if (Object.keys(user).length && user.is_admin && !router.pathname.startsWith("/admin")) {
        router.push("/admin/dashboard");
      }
      else if (Object.keys(user).length && !user.is_admin && router.pathname.startsWith("/admin")) {
        router.push("/");
      }

    }, []);


    useEffect(() => {
      if (userData.data) {
        setQuerySkip(true);

        dispatch(setUser(userData.data.user));

        if (userData.data.user.is_admin && !router.pathname.startsWith("/admin")) {
          router.push("/admin/dashboard");
        }
      } else if (userData.isError) {
        setQuerySkip(true);
        dispatch(logout());
        router.push("/auth/signin");
      }
    }, [userData.data, userData.isError]);

    return <>
      {showHeaderAndFooter && <Header />}
      <Component {...pageProps} />
      {showHeaderAndFooter && <Footer />}
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        className="z-[999999]"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  }

  return (
    <Provider store={store}>
      <NextUIProvider>
        <ErrorBoundary>
          <AppInsider pageProps={pageProps} />
        </ErrorBoundary>
      </NextUIProvider>
    </Provider>
  )
}
