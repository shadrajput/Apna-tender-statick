
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authentication } from "../../../redux/actions/User";
import { useSigninMutation } from "../../../services/authentication";

const signUpSchema = Yup.object({
  username: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .required("Please enter username"),
  password: Yup.string().required("Please enter password"),
});

const initialValues = {
  username: "",
  password: "",
};

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user)

  const [signin, { isLoading }] = useSigninMutation()

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      async onSubmit(data) {
        try {
          const res = await signin(data)

          if (res.error) {
            toast.error(res.error.data.message);
          }
          else if (res.data.success) {
            const { password, ...userDataWithoutPassword } = res.data.user;
            dispatch(authentication(res.data.token, userDataWithoutPassword));
            if (res.data.user.is_admin) {
              router.push("/admin/dashboard")
            }
            else {
              router.push("/profile?value=0");
            }
            toast.success(res.data.message);
          }
        }
        catch (err) {
          toast.error(err.message);
        }
      }
    });

  useEffect(() => {
    if (token && user.is_admin) {
      router.push('/admin/dashboard')
    }
    else if (token) {
      router.push('/')
    }
  }, [])

  return (
    <section className="bg-[#f8f8f8] py-14  lg:py-20">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mx-auto max-w-[525px] py-10 pb-14 px-10 border border-[#00a6ac3f] overflow-hidden rounded-lg bg-white text-center"
              data-wow-delay=".15s"
            >
              <div className="mb-10">
                <h1 className="text-[#000000] text-3xl font-bold">Log In Here!</h1>
              </div>
              <form onSubmit={handleSubmit}>

                <div className="mb-5 flex flex-col justify-start items-start">
                  <label htmlFor="Username" className="font-medium text-sm">Username*</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full my-2 rounded-md border border-[#00a7ac1f] bg-white hover:border-[#00a7ac] duration-700 px-5 py-[10px] text-sm text-dark outline-none transition placeholder:text-gray-500 focus:outline-none"
                  />
                  {errors.username && touched.username ? (
                    <p className="form-error text-left mt-1 text-red-600 text-xs font-medium">
                      {errors.username}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col justify-start items-start">
                  <label htmlFor="Password" className="font-medium text-sm">Password*</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full my-2 rounded-md border border-[#00a7ac1f] bg-white hover:border-[#00a7ac] duration-700 px-5 py-[10px] text-sm text-dark outline-none transition placeholder:text-gray-500 focus:outline-none"
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error text-left mt-1 text-red-600 text-xs font-medium">
                      {errors.password}
                    </p>
                  ) : null}
                </div>
                <div className="flex justify-end items-end py-3 mb-5">
                  <Link
                    href="/#"
                    className="text-sm underline text-blue-500 font-medium"
                  >
                    Forget Password?
                  </Link>
                </div>
                <div className="">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`${isLoading ? 'opacity-70' : ''} w-full cursor-pointer rounded-md bg-[#00a7ac] font-medium px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-primary/90`}
                  >
                    {isLoading ? 'Loading...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
