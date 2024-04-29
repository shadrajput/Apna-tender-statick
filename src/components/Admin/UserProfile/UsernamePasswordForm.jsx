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
import { useUpdateUserCredentialsMutation } from '@/services/admin'; 
import {
  mdiFormTextboxPassword,
  mdiAccount,
} from '@mdi/js'
import { toast } from 'react-toastify'

const validationSchema = () => {
  return Yup.object({
    username: Yup.string()
      .required("Username is required")
      .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores")
      .min(4, "Username must be at least 4 characters long")
      .max(32, "Username must be at most 32 characters long"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be at most 32 characters long") 
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });
};

function UsernamePasswordForm({username, userId, refetchUserDetails}) {
  const [isEdit, setIsEdit] = React.useState(false)

  const [updateUserCredentials, {...updatUingserCredentials}] = useUpdateUserCredentialsMutation()
 
  const { values, errors, handleBlur, touched, setValues, handleChange, handleSubmit, resetForm } =
  useFormik({
    initialValues: {
      username: username,
      password:"Password!24",
    },
    validationSchema: validationSchema(isEdit),
    async onSubmit(data) {
      try{
        const res = await updateUserCredentials({data, user_id: userId})

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
    setValues({username, password: 'Password!24'});
  }

  React.useEffect(() => {
    if (username) {
      setValues({username, password: 'Password!24'});
    }
  }, [username]);

  return (

    <CardBox className="mt-8" hasComponentLayout>
      <form className="" onSubmit={handleSubmit}>
        <CardBoxComponentBody>
          <SectionTitleLineWithButton title="Account Details"/>
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                <Button className="bg-blue-600 text-white" type="submit" label={updatUingserCredentials.isLoading ? 'Updating...' : 'Update'} disabled={updatUingserCredentials.isLoading} />
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

export default UsernamePasswordForm