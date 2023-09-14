import * as Yup from 'yup';

// const validFileExtensions = { file: ['csv'] };

// function isValidFileType(fileName, fileType) {
//   return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
// }

export const processEmailSchema = Yup.object({
    pluginName:Yup.string().required('Please enter plugin name'),
    campaignId:Yup.number().required('Please enter campaign ID').test(
        'Is positive?', 
        'The campaign ID must be greater than 0!', 
        (value) => value > 0
    ),
    affId:Yup.string().required('Please enter Affiliate ID'),
    product1_id:Yup.number().required('Please enter product ID').test(
        'Is positive?', 
        'The product ID must be greater than 0!', 
        (value) => value > 0
    ),
    product1_qty:Yup.number().required('Please enter product quantity').test(
        'Is positive?', 
        'The product quantity must be greater than 0!', 
        (value) => value > 0
    ),
    salesUrl:Yup.string().required('Please enter sales URL').url('Invalid sales URL'),
    maxPerDay:Yup.number('Must be a number').required('Please enter max per day limit').test(
        'Is positive?', 
        'The max per day limit must be greater than 0!', 
        (value) => value > 0
    ),
    startHour:Yup.string().required('Start hour is required'),
    startMins:Yup.string().required('Start Minute is required'),
    endHour:Yup.string().required('End hour is required'),
    endMins:Yup.string().required('End Minute is required'),
    // matched:Yup.string().required('Please enter a value'),
    csvFile:Yup.mixed().required("Please choose a CSV file")
});