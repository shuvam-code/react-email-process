import { useEffect, useState } from 'react';
import { useFormik } from 'formik'
import { processEmailSchema } from '../schemas';

const initialValues = {
    originating_crm: '',
    new_crm: '',
    new_campaign: '',
    new_product: '',
    max_per_day: '',
    start_hours: '',
    start_minutes: '',
    end_hours: '',
    end_minutes: '',
    matched: '',
    csv: '',
    emails_list: '',
}

const Dashboard = () => {

    const [showInput, setInput] = useState(false);

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: processEmailSchema,
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();
        }
    });

    const selectChangeHandler = (e) => {
        if (e.target.value) {
            if (e.target.value == 'email') {
                setInput('email')
            }
            if (e.target.value == 'csv') {
                setInput('csv')
            }
        } else {
            setInput(false)
        }
    }

    useEffect(() => {

    }, [])

    return (
        <div>
            <form id='processEmailForm' onSubmit={handleSubmit}>
                <section>
                    <h2>Settings</h2>
                    <input type='text' name='originating_crm' placeholder='Originating CRM' value={values.originating_crm} onChange={handleChange} onBlur={handleBlur} />
                    {
                        errors.originating_crm && touched.originating_crm &&
                        <span>{errors.originating_crm}</span>
                    }
                    <br />
                    <input type='text' name='new_crm' placeholder='New CRM' value={values.new_crm} onChange={handleChange} onBlur={handleBlur} />
                    {
                        errors.new_crm && touched.new_crm &&
                        <span>{errors.new_crm}</span>
                    }
                    <br />
                    <input type='text' name='new_campaign' placeholder='New Campaigm' value={values.new_campaign} onChange={handleChange} onBlur={handleBlur} />
                    {
                        errors.new_campaign && touched.new_campaign &&
                        <span>{errors.new_campaign}</span>
                    }
                    <br />
                    <input type='text' name='new_product' placeholder='New Product' value={values.new_product} onChange={handleChange} onBlur={handleBlur} />
                    {
                        errors.new_product && touched.new_product &&
                        <span>{errors.new_product}</span>
                    }
                    <br />
                    <input type='text' name='max_per_day' placeholder='Max Per Day' value={values.max_per_day} onChange={handleChange} onBlur={handleBlur} />
                    {
                        errors.max_per_day && touched.max_per_day &&
                        <span>{errors.max_per_day}</span>
                    }
                    <br />
                    <input type='time' name='start_hours' placeholder='Start Hours' value={values.start_hours} onChange={handleChange} onBlur={handleBlur} />
                    {
                        errors.start_hours && touched.start_hours &&
                        <span>{errors.start_hours}</span>
                    }
                    <br />
                    <input type='time' name='start_minutes' placeholder='Start Minutes' value={values.start_minutes} onChange={handleChange} onBlur={handleBlur} />
                    {
                        errors.start_minutes && touched.start_minutes &&
                        <span>{errors.start_minutes}</span>
                    }
                    <br />
                    <input type='time' name='end_hours' placeholder='End Hours' value={values.end_hours} onChange={handleChange} onBlur={handleBlur} />
                    {
                        errors.end_hours && touched.end_hours &&
                        <span>{errors.end_hours}</span>
                    }
                    <br />
                    <input type='time' name='end_minutes' placeholder='End Minutes' value={values.end_minutes} onChange={handleChange} onBlur={handleBlur} />
                    {
                        errors.end_minutes && touched.end_minutes &&
                        <span>{errors.end_minutes}</span>
                    }
                    <br />

                    <select name='matched' onChange={(e) => {
                        handleChange(e);
                        selectChangeHandler(e);
                    }} onBlur={handleBlur}>
                        <option defaultValue={''} value=''>Select an option</option>
                        <option value="email">Email</option>
                        <option value="csv">CSV</option>
                    </select>
                    {
                        errors.matched && touched.matched &&
                        <span>{errors.matched}</span>
                    }
                    <br />

                    {
                        showInput && showInput == 'email' &&
                        <textarea value={values.emails_list} name='emails_list' onChange={handleChange} onBlur={handleBlur}>
                        </textarea>
                    }

                    {
                        showInput && showInput == 'csv' &&
                        <input type="file" accept='.csv' name="csv" value={values.csv} onChange={handleChange} onBlur={handleBlur} />
                    }

                </section>

                <section>
                    <button type='submit'>Process</button>
                </section>

            </form>
        </div>
    )
}

export default Dashboard;