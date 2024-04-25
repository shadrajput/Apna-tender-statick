import React from 'react'
import { useFormik } from "formik"; 
import * as Yup from "yup";
import SectionTitleLineWithButton from '@/components/Admin/Section/TitleLineWithButton'
import Button from '@/components/Admin/Button'
import Buttons from '@/components/Admin/Buttons'
import CardBox from '@/components/Admin/CardBox'
import CardBoxComponentBody from '@/components/Admin/CardBox/Component/Body'
import CardBoxComponentFooter from '@/components/Admin/CardBox/Component/Footer'
import FormField from '@/components/Admin/Form/Field'
import { useUpdateUserBasicDetailsMutation, useGetAllTenderCategoriesQuery } from '@/services/admin';
import {
  mdiAccount,
  mdiMail,
  mdiPhone,
  mdiOfficeBuilding,
  mdiArchiveCheck,
  mdiMapMarker,
  mdiTextBoxCheckOutline
} from '@mdi/js'
import Select from 'react-select';
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
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  gst_no: Yup.string()
    .matches(/^[A-Za-z0-9]{15}$/, 'Enter valid GST number'),
  address: Yup.string(),  
  company_name: Yup.string()
});

function BasicDetailForm({basicDetails, userKeywords, userId, refetchUserDetails}) {

  const [isEdit, setIsEdit] = React.useState(false)
  const [allCategories, setAllCategories] = React.useState([]);

  const categoriesData = useGetAllTenderCategoriesQuery();

  const [updateUserBasicDetails, {...updatingUserBasicDetails}] = useUpdateUserBasicDetailsMutation()
 
  const { values, errors, handleBlur, touched, setValues, setFieldValue, handleChange, handleSubmit, resetForm } =
  useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      gst_no: "",
      address: "",
      company_name: "",
      interested_keywords: []
    },
    validationSchema: validationSchema,
    async onSubmit(data) {
      try{
        const res = await updateUserBasicDetails({data, user_id: userId})

        refetchUserDetails();
        
        if (res.error) {
          toast.error(res.error.data.message);
        }
        else if (res.data.success) {
          toast.success(res.data.message);
          setIsEdit(false)
        }
      }
      catch(err){
        toast.error(err.message);
      }
    },
  });

  const handleEditBtnClick = ()=>{
    setIsEdit(true);
  }
  const handleCancelBtnClick = ()=>{
    setIsEdit(false);
    resetForm();
    setValues(basicDetails)
    setFieldValue('interested_keywords', userKeywords.map((keyword)=>{
                    return { value: `${keyword?.category_id}`, label: `${keyword?.tender_category?.title}` }
                  }))
  }

  React.useEffect(() => {
    if (basicDetails) {
      setValues(basicDetails)
    }
    if(userKeywords.length > 0){
      setFieldValue('interested_keywords', userKeywords.map((keyword)=>{
        return { value: `${keyword?.category_id}`, label: `${keyword?.tender_category?.title}` }
      }))
    }
  }, [basicDetails]);

    const handleInterestedKeywordsChange = (selectedOptions) => {
    setFieldValue('interested_keywords', selectedOptions);
  };

  React.useEffect(()=>{
    if(categoriesData.data){
      setAllCategories(categoriesData.data.allCategories)
    }
  },[categoriesData.data])

  return (
    <CardBox className="" hasComponentLayout>
      <form className="" onSubmit={handleSubmit}>
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                    return { value: `${category.id}`, label: `${category.title}`, isSelected: true }
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
                isDisabled={!isEdit}
                onChange={handleInterestedKeywordsChange}
                onBlur={handleBlur}
              />
            </FormField>
          </div>
        </CardBoxComponentBody>
        <CardBoxComponentFooter>
          {
            !isEdit
            ?
              <Buttons className='justify-end'>
                <Button className=" text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600" label="Edit Details" outline onClick={handleEditBtnClick} />
              </Buttons>
            : 
              null
          }
          {
            isEdit
            ?
              <Buttons className='justify-end'>
                <Button className="bg-blue-600 text-white" type="submit" label={updatingUserBasicDetails.isLoading ? 'Updating...' : 'Update'} disabled={updatingUserBasicDetails.isLoading}  />
                <Button className="text-red-600 border-red-600 hover:text-white hover:bg-red-600" label="Cancel" outline onClick={handleCancelBtnClick}/>
              </Buttons>
            : 
              null
          }
        </CardBoxComponentFooter>
      </form>
    </CardBox>
  )
}

export default BasicDetailForm