import * as Yup from 'yup';

// const validFileExtensions = { file: ['csv'] };

// function isValidFileType(fileName, fileType) {
//   return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
// }

export const LoginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Please enter your email'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});