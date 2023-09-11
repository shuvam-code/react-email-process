import * as Yup from 'yup';

export const processEmailSchema = Yup.object({
    originating_crm:Yup.string().required('Please enter a value'),
    new_crm:Yup.string().required('Please enter a value'),
    new_campaign:Yup.string().required('Please enter a value'),
    new_product:Yup.string().required('Please enter a value'),
    max_per_day:Yup.string().required('Please enter a value'),
    start_hours:Yup.string().required('Please enter a value'),
    start_minutes:Yup.string().required('Please enter a value'),
    end_hours:Yup.string().required('Please enter a value'),
    end_minutes:Yup.string().required('Please enter a value'),
    matched:Yup.string().required('Please enter a value'),
});