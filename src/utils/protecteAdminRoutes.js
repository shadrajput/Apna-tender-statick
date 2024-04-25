import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const protectAdminRoutes = (WrappedComponent) => {
  const protectAdminRoutesWrapper = (props) => {
    router.push("/");

    return <WrappedComponent {...props} />;
  };

  return protectAdminRoutesWrapper;
};

export default protectAdminRoutes;
