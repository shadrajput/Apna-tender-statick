import * as Yup from "yup";

const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

export const FormSchema = Yup.object({
    name: Yup.string()
        .test('trim', 'Must not contain leading or trailing spaces', (value) => {
            if (value) {
                return value.trim() === value;
            }
            return true;
        })
        .min(2, "Minimum 2 characters are required")
        .required("Please Enter Your Name")
        .matches(/^[A-Za-z ]+$/, 'Please enter only letters')
        .matches(/[^\s*].*[^\s*]/g, "* This field cannot contain only blankspaces"),

    mobile: Yup.string()
        .matches(/^[0-9]+$/, 'Please enter valid mobile no.')
        .test('trim', 'Must not contain leading or trailing spaces', (value) => {
            if (value) {
                return value.trim() === value;
            }
            return true;
        })
        .min(10, "Please enter valid mobile no")
        .max(10, "Please enter valid mobile no")
        .required("Please Enter Your Mobile Number"),

    email: Yup.string()
        .test('trim', 'Must not contain leading or trailing spaces', (value) => {
            if (value) {
                return value.trim() === value;
            }
            return true;
        })
        .min(2, "Minimum 2 characters are required")
        .required("Please Enter Your Email"),
    // .matches(/[^\s*].*[^\s*]/g, "* This field cannot contain only blankspaces"),

    company_name: Yup.string()
        .test('trim', 'Must not contain leading or trailing spaces', (value) => {
            if (value) {
                return value.trim() === value;
            }
            return true;
        })
        .required("Please Enter Your Company Name")
        .min(2, "Minimum 2 characters are required")
        .matches(/^[A-Za-z ]+$/, 'Please enter only letters')
        .matches(/[^\s*].*[^\s*]/g, "* This field cannot contain only blankspaces"),


});


export const initialValues = {
    name: "",
    mobile: "",
    email: "",
    company_name: "",
    message: ""


}