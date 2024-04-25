import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'
import { useFormik } from "formik"; 
import * as Yup from "yup";
import SectionTitleLineWithButton from '@/components/Admin/Section/TitleLineWithButton'
import Button from '@/components/Admin/Button'
import Buttons from '@/components/Admin/Buttons'
import CardBox from '@/components/Admin/CardBox'
import CardBoxComponentBody from '@/components/Admin/CardBox/Component/Body'
import CardBoxComponentFooter from '@/components/Admin/CardBox/Component/Footer'
import FormField from '@/components/Admin/Form/Field'
import Select from 'react-select';
import { useAddNewUserMutation, useGetAllTenderCategoriesQuery } from '@/services/admin';
import {
  mdiAccount,
  mdiMail,
  mdiPhone,
  mdiOfficeBuilding,
  mdiArchiveCheck,
  mdiMapMarker,
  mdiFormTextboxPassword,
  mdiTextBoxCheckOutline
} from '@mdi/js'
import { toast } from 'react-toastify'

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required")
     .min(4, "Full name must be at least 4 characters long")
    .max(32, "Full name must be at most 32 characters long"),
  email: Yup.string().email("Enter valid email")
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value; 
      }
      return true;
    })
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter valid mobile number')
    .required('Mobile number is required'),
  gst_no: Yup.string()
    .matches(/^[A-Za-z0-9]{15}$/, 'Enter valid GST number'),
  address: Yup.string(),  
  company_name: Yup.string(),
  username: Yup.string()
      .required("Username is required")
      .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores")
      .min(4, "Username must be at least 4 characters long")
      .max(32, "Username must be at most 32 characters long"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long") 
    .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  ),
});

function AddUsers() {
  const [allCategories, setAllCategories] = React.useState([]);

  const [addNewUser, {...addingNewUser}] = useAddNewUserMutation()

  const categoriesData = useGetAllTenderCategoriesQuery();

   const { values, errors, handleBlur, touched, setValues, setFieldValue, handleChange, handleSubmit, resetForm } =
  useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      gst_no: "",
      address: "",
      company_name: "",
      username: "",
      password: "",
      interested_keywords: []
    },
    validationSchema: validationSchema,
    async onSubmit(data) {
      try{  
        const res = await addNewUser(data)
        
        if (res.error) {
          toast.error(res.error.data.message);
        }
        else if (res.data.success) {
          toast.success(res.data.message);
          resetForm();
        }
      }
      catch(err){
        toast.error(err.message);
      }
    },
  });

  const handleInterestedKeywordsChange = (selectedOptions) => {
    setFieldValue('interested_keywords', selectedOptions);
  };

  React.useEffect(()=>{
    if(categoriesData.data){
      setAllCategories(categoriesData.data.allCategories)
    }
  },[categoriesData.data])

  return (
    <AdminLayout>
     <div>
        <SectionTitleLineWithButton icon={mdiAccount} title="Add New User" main/>
          <form className="" onSubmit={handleSubmit}>
            <CardBox className="" hasComponentLayout>
                <CardBoxComponentBody>
                  <SectionTitleLineWithButton title="Basic Details"/>
                  <div className="w-full flex gap-6">
                    <FormField
                      label="Full Name *"
                      help={
                        touched.name && errors.name
                        ?
                          <span className="text-red-600">{errors.name}</span>
                        :
                          null
                      }
                      labelFor="name"
                      icons={[mdiAccount]}
                    >
                      <input 
                        name="name" 
                        id="name" 
                        placeholder="Full Name" 
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                    <FormField
                      label="Email *"
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
                      <input 
                        name="email" 
                        id="email" 
                        className='w-full' 
                        placeholder="Email" 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                  </div>
                  <div className="w-full flex gap-6">
                    <FormField
                      label="Mobile *"
                      help={
                        touched.mobile && errors.mobile
                        ?
                          <span className="text-red-600">{errors.mobile}</span>
                        :
                          null
                      }
                      labelFor="mobile"
                      icons={[mdiPhone]}
                    >
                      <input 
                        name="mobile" 
                        id="mobile" 
                        placeholder="Mobile"
                        value={values.mobile} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                    <FormField
                      label="Company Name"
                      help={
                        touched.company_name && errors.company_name
                        ?
                          <span className="text-red-600">{errors.company_name}</span>
                        :
                          null
                      }
                      labelFor="company_name"
                      icons={[mdiOfficeBuilding]}
                    >
                      <input 
                        name="company_name" 
                        id="company_name" 
                        className='w-full' 
                        placeholder="Company Name" 
                        value={values.company_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                  </div>
                  <div className="w-full flex gap-6">
                    <FormField
                      label="Address"
                      help={
                        touched.address && errors.address
                        ?
                          <span className="text-red-600">{errors.address}</span>
                        :
                          null
                      }
                      labelFor="address"
                      icons={[mdiMapMarker]}
                    >
                      <input 
                        name="address" 
                        id="address" 
                        placeholder="Address"
                        value={values.address} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                    <FormField
                      label="GST No."
                      help={
                        touched.gst_no && errors.gst_no
                        ?
                          <span className="text-red-600">{errors.gst_no}</span>
                        :
                          null
                      }
                      labelFor="gst_no"
                      icons={[mdiArchiveCheck]}
                    >
                      <input 
                        name="gst_no" 
                        id="gst_no" 
                        className='w-full' 
                        placeholder="GST No."
                        value={values.gst_no} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                  </div>
                  <div className="w-full">
                    <FormField
                      label="Interested Keywords"
                      help={
                        touched.interested_keywords && errors.interested_keywords
                        ?
                          <span className="text-red-600">{errors.interested_keywords}</span>
                        :
                          null
                      }
                      labelFor="interested_keywords"
                      icons={[mdiTextBoxCheckOutline]}
                    >
                      <Select
                        isMulti
                        name="interested_keywords"
                        value={values.interested_keywords}
                        options={
                          allCategories.map((category) =>{
                           return { value: `${category.id}`, label: `${category.title}` }
                          })
                        }
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            outline: state.isFocused ? 'none' : 'none',
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            border: 'none !important',
                            '&:hover': {
                              border: 'none !important',
                            },
                          }),
                        }}
                        onChange={handleInterestedKeywordsChange}
                        onBlur={handleBlur}
                      />
                    </FormField>

                  </div>
                  <div className="mt-5">
                    <SectionTitleLineWithButton title="Account Details"/>
                  </div>
                  <div className="w-full flex gap-6">
                    <FormField
                      label="Username *"
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
                      <input 
                        name="username" 
                        id="username" 
                        placeholder="Username" 
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                    <FormField
                      label="Password *"
                      help={
                        touched.password && errors.password
                        ?
                          <span className="text-red-600">{errors.password}</span>
                        :
                          null
                      }
                      labelFor="password"
                      icons={[mdiFormTextboxPassword]}
                    >
                      <input 
                        type="password"
                        name="password" 
                        id="password" 
                        className='w-full' 
                        placeholder="Password" 
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                  </div>
                </CardBoxComponentBody>
                <CardBoxComponentFooter>
                    <Buttons className='justify-end'>
                      <Button type="submit" className="text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600" label={addingNewUser.isLoading ? 'Loading...' : 'Submit'} disabled={addingNewUser.isLoading} outline />
                    </Buttons>
                  </CardBoxComponentFooter>
            </CardBox>
          </form>
      </div>
    </AdminLayout>
  )
}

export default ProtectAdminRoutes(AddUsers)
