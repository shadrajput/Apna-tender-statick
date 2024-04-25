import React from 'react';
import {
  mdiAccount,
  mdiFormTextboxPassword,
  mdiMail,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup";
import { useRouter } from 'next/router';
import Button from '../../components/Admin/Button'
import Buttons from '../../components/Admin/Buttons'
import CardBox from '../../components/Admin/CardBox'
import CardBoxComponentBody from '../../components/Admin/CardBox/Component/Body'
import CardBoxComponentFooter from '../../components/Admin/CardBox/Component/Footer'
import FormField from '../../components/Admin/Form/Field'
import SectionTitleLineWithButton from '../../components/Admin/Section/TitleLineWithButton'
import AdminLayout from '@/components/Admin/AdminLayout'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'
import { useSelector, useDispatch } from 'react-redux'
import {useUpdateAdminProfileDetailsMutation, useUpdateAdminPasswordMutation} from '@/services/admin'
import { toast } from 'react-toastify'
import {logout} from '../../redux/actions/User'

const validationSchema1 = Yup.object().shape({
  username: Yup.string().required("Username is required")
     .min(4, "Username must be at least 4 characters long")
    .max(32, "Username must be at most 32 characters long")
    .trim('Please remove leading/trailing spaces') 
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),

  email: Yup.string().email("Enter valid email")
    .test('trim', 'Email must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value; 
      }
      return true;
    })
    .required("Email is required"),
});

const validationSchema2 = Yup.object().shape({
  new_password: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be at most 32 characters long") 
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  confirm_new_password: Yup.string().required("Confirm password is required")
    .oneOf([Yup.ref("new_password"), null], "Password not matched"),
});


const ProfilePage = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.user)
  const router = useRouter();

  const [isEditUsernameEmail, setIsEditUsernameEmail] = React.useState(false)
  const [isEditPassword, setIsEditPassword] = React.useState(false)

  const [updateAdminProfileDetails, {...updatingAdminDetails}] = useUpdateAdminProfileDetailsMutation()

  const [updateAdminPassword, {...updatingAdminPassword}] = useUpdateAdminPasswordMutation()

  const userForm1 = {
    username: user.username,
    email: user.email
  }

  const userForm2 = {
    new_password: '',
    confirm_new_password: ''
  }

  return (
    <AdminLayout>
      <div>
        <SectionTitleLineWithButton icon={mdiAccount} title="My Profile" main/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">

            <CardBox className="flex-1" hasComponentLayout>
              <Formik
                initialValues={userForm1}
                 validationSchema={validationSchema1}
                 enableReinitialize={true}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                  try{
                    const res = await updateAdminProfileDetails(data)
                    
                    if (res.error) {
                      toast.error(res.error.data.message);
                    }
                    else if (res.data.success) {
                      console.log(res.data.message)
                      toast.success(res.data.message);
                      setIsEditUsernameEmail(false)
                    }
                  }
                  catch(err){
                    toast.error(err.message);
                  }
                }}
              >
                {({ values, errors, touched, handleBlur, handleChange, resetForm }) => (
                  <Form className="flex flex-col flex-1">
                    <CardBoxComponentBody>
                      <SectionTitleLineWithButton title="Details"/>
                      <FormField
                        label="Username"
                        help={
                          touched.username && errors.username
                          ?
                            <span className="text-red-600">{errors.username}</span>
                          :
                            null
                        }
                        labelFor="username"
                        icons={[mdiAccount]}
                      >
                        <Field 
                          name="username" 
                          id="username" 
                          placeholder="Username" 
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!isEditUsernameEmail}
                        />
                      </FormField>
                      <FormField
                        label="Email"
                        help={
                          touched.email && errors.email
                          ?
                            <span className="text-red-600">{errors.email}</span>
                          :
                            null
                        }
                        labelFor="email"
                        icons={[mdiMail]}
                      >
                        <Field 
                          name="email" 
                          id="email" 
                          placeholder="Email" 
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!isEditUsernameEmail}
                        />
                      </FormField>
                    </CardBoxComponentBody>
                    {/* <CardBoxComponentFooter>
                      {
                        !isEditUsernameEmail
                        ?
                          <Buttons className='justify-end'>
                            <Button className=" text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600" label="Edit" outline onClick={()=>{
                              setIsEditUsernameEmail(true)
                            }} />
                          </Buttons>
                        : 
                          null
                      }
                      {
                        isEditUsernameEmail
                        ?
                          <Buttons className='justify-end'>
                            <Button className="bg-blue-600 text-white" type="submit" 
                            label={updatingAdminDetails.isLoading ? 'Updating...' : 'Update'}
                            disabled={updatingAdminDetails.isLoading}  
                            />
                            <Button className="text-red-600 border-red-600 hover:text-white hover:bg-red-600" label="Cancel" outline onClick={()=>{
                              setIsEditUsernameEmail(false)
                              resetForm();
                            }}/>
                          </Buttons>
                        : 
                          null
                      }
                    </CardBoxComponentFooter> */}
                  </Form>
                )}
              </Formik>
            </CardBox>
          </div>

          <CardBox hasComponentLayout>
            <Formik
              initialValues={userForm2}
              validationSchema={validationSchema2}
              enableReinitialize={true}
              onSubmit={async (data, { setSubmitting, resetForm }) => {

                  delete data.confirm_new_password;

                  try{
                  const res = await updateAdminPassword(data)
                  
                  if (res.error) {
                    toast.error(res.error.data.message);
                  }
                  else if (res.data.success) {
                    toast.success(res.data.message);
                    dispatch(logout());
                    router.push('/auth/signin')
                    setIsEditPassword(false)
                  }
                }
                catch(err){
                  toast.error(err.message);
                }
              }}
            >
                {({ values, errors, touched, handleBlur, handleChange, resetForm }) => (
                  <Form className="flex flex-col flex-1">
                    <CardBoxComponentBody>
                      <SectionTitleLineWithButton title="Change Password"/>
                      <FormField
                        label="New Password"
                        help={
                          touched.new_password && errors.new_password
                          ?
                            <span className="text-red-600">{errors.new_password}</span>
                          :
                            null
                        }
                        labelFor="new_password"
                        icons={[mdiFormTextboxPassword]}
                      >
                        <Field 
                          name="new_password" 
                          id="new_password" 
                          type="password"
                          placeholder="New Password" 
                          value={values.new_password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!isEditPassword}
                        />
                      </FormField>
                      <FormField
                        label="Confirm New Password"
                        help={
                          touched.confirm_new_password && errors.confirm_new_password
                          ?
                            <span className="text-red-600">{errors.confirm_new_password}</span>
                          :
                            null
                        }
                        labelFor="confirm_new_password"
                        icons={[mdiFormTextboxPassword]}
                      >
                        <Field 
                          name="confirm_new_password" 
                          id="confirm_new_password" 
                          type="password"
                          placeholder="Confirm New Password" 
                          value={values.confirm_new_password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!isEditPassword}
                        />
                      </FormField>
                    </CardBoxComponentBody>
                    <CardBoxComponentFooter>
                      {
                        !isEditPassword
                        ?
                          <Buttons className='justify-end'>
                            <Button className=" text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600" label="Edit" outline 
                            onClick={()=>{
                              setIsEditPassword(true)
                            }} />
                          </Buttons>
                        : 
                          null
                      }
                      {
                        isEditPassword
                        ?
                          <Buttons className='justify-end'>
                            <Button className="bg-blue-600 text-white" type="submit" label={updatingAdminPassword.isLoading ? 'Updating...' : 'Update'} 
                            disabled={updatingAdminPassword.isLoading}  
                            />
                            <Button className="text-red-600 border-red-600 hover:text-white hover:bg-red-600" label="Cancel" outline 
                            onClick={()=>{
                              setIsEditPassword(false)
                              resetForm();
                            }}/>
                          </Buttons>
                        : 
                          null
                      }
                    </CardBoxComponentFooter>
                  </Form>
                )}
              </Formik>
          </CardBox>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ProtectAdminRoutes(ProfilePage)
