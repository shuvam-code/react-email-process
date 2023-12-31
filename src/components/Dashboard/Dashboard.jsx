import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik'
import axios from 'axios';
import { processEmailSchema } from '../../schemas';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';
import './Dashboard.css';
const initialValues = {
    pluginName: '',
    campaignId: '',
    affId: '',
    product1_id: '',
    product1_qty: '',
    salesUrl: '',
    maxPerDay: '',
    startHour: '',
    startMins: '',
    endHour: '',
    endMins: '',
    // matched: '',
    csvFile: '',
    // emails_list: '',
}

const Dashboard = () => {

    // const [showInput, setInput] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [submitBtnText, setSubmitBtnText] = useState('Process');
    const csvRef = useRef();

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: processEmailSchema,
        onSubmit: async (values, action) => {
            // console.log(values.csvFile);
            // console.log(values);
            setSubmitBtnText('Processing..');
            setSuccessMessage(false);
            setErrorMessage(false);

            const formData = new FormData();
            formData.append('csvFile', values.csvFile);
            formData.append('pluginName', values.pluginName);
            formData.append('campaignId', values.campaignId);
            formData.append('affId', values.affId);
            formData.append('product1_id', values.product1_id);
            formData.append('product1_qty', values.product1_qty);
            formData.append('salesUrl', values.salesUrl);
            formData.append('maxPerDay', values.maxPerDay);
            formData.append('startHour', values.startHour);
            formData.append('startMins', values.startMins);
            formData.append('endHour', values.endHour);
            formData.append('endMins', values.endMins);
            // console.log('formData == ', formData);
            try {
                const resp = await axios.post(`${import.meta.env.VITE_API}/addcustomer`, formData);
                console.log('Response == ', resp.data);
                if (resp.data) {
                    setSuccessMessage(resp.data.message)
                    action.resetForm();
                    csvRef.current.value = null;
                }
            } catch (error) {
                console.log('error == ', error);
                if (error) {
                    setErrorMessage('Something went wrong!')
                }
            }
            action.setSubmitting(false);
            setSubmitBtnText('Process');
        }
    });

    // const selectChangeHandler = (e) => {
    //     console.log('Change');
    //     if (e.target.value) {
    //         if (e.target.value == 'email') {
    //             setInput('email')
    //         }
    //         if (e.target.value == 'csv') {
    //             setInput('csv')
    //         }
    //     } else {
    //         setInput(false)
    //     }
    // }

    useEffect(() => {

    }, [])

    return (
        <div>
            <div className='container'>
                {
                    successMessage && <SuccessAlert successMessage={successMessage}/>
                }

                {
                    errorMessage && <ErrorAlert errorMessage={errorMessage} />
                }

                <form id='processEmailForm' onSubmit={handleSubmit} className='flex justify-between'>
                    <section className='first_col bg-white'>
                        <h2 className="cmn_head text-xl md:text-2xl text-black font-bold mb-2.5">Settings</h2>
                        <input type='text' name='pluginName' placeholder='Plugin Name' value={values.pluginName} onChange={handleChange} onBlur={handleBlur} />
                        <br />
                        {
                            errors.pluginName && touched.pluginName &&
                            <span className="block text-red-500">{errors.pluginName}</span>
                        }
                        <br />
                        <input type='number' name='campaignId' placeholder='Campaign ID' value={values.campaignId} onChange={handleChange} onBlur={handleBlur} />
                        <br />
                        {
                            errors.campaignId && touched.campaignId &&
                            <span className="block text-red-500">{errors.campaignId}</span>
                        }
                        <br />
                        <input type='number' name='affId' placeholder='Affiliate ID' value={values.affId} onChange={handleChange} onBlur={handleBlur} />
                        <br />
                        {
                            errors.affId && touched.affId &&
                            <span className="block text-red-500">{errors.affId}</span>
                        }
                        <br />
                        <input type='number' name='product1_id' placeholder='Product ID' value={values.product1_id} onChange={handleChange} onBlur={handleBlur} />
                        <br />
                        {
                            errors.product1_id && touched.product1_id &&
                            <span className="block text-red-500">{errors.product1_id}</span>
                        }
                        <br />

                        <input type='number' name='product1_qty' placeholder='Product Quantity' value={values.product1_qty} onChange={handleChange} onBlur={handleBlur} />
                        <br />
                        {
                            errors.product1_qty && touched.product1_qty &&
                            <span className="block text-red-500">{errors.product1_qty}</span>
                        }
                        <br />

                        <input type='test' name='salesUrl' placeholder='Sales URL' value={values.salesUrl} onChange={handleChange} onBlur={handleBlur} />
                        <br />
                        {
                            errors.salesUrl && touched.salesUrl &&
                            <span className="block text-red-500">{errors.salesUrl}</span>
                        }
                        <br />

                        <input type='number' name='maxPerDay' placeholder='Max Per Day' value={values.maxPerDay} onChange={handleChange} onBlur={handleBlur} />
                        <br />
                        {
                            errors.maxPerDay && touched.maxPerDay &&
                            <span className="block text-red-500">{errors.maxPerDay}</span>
                        }
                        <br />
                        <ul className='time_box'>
                            <li><input type='datetime-local' name='startHour' placeholder='Start Hours' value={values.startHour} onChange={handleChange} onBlur={handleBlur} />
                                {
                                    errors.startHour && touched.startHour &&
                                    <span className="block text-red-500">{errors.startHour}</span>
                                }
                            </li>

                            <li><input type='datetime-local' name='startMins' placeholder='Start Minutes' value={values.startMins} onChange={handleChange} onBlur={handleBlur} />
                                {
                                    errors.startMins && touched.startMins &&
                                    <span className="block text-red-500">{errors.startMins}</span>
                                }
                            </li>

                            <li className=''><input type='datetime-local' name='endHour' placeholder='End Hours' value={values.endHour} onChange={handleChange} onBlur={handleBlur} />
                                {
                                    errors.endHour && touched.endHour &&
                                    <span className="block text-red-500">{errors.endHour}</span>
                                }
                            </li>

                            <li><input type='datetime-local' name='endMins' placeholder='End Minutes' value={values.endMins} onChange={handleChange} onBlur={handleBlur} />
                                {
                                    errors.endMins && touched.endMins &&
                                    <span className="block text-red-500">{errors.endMins}</span>
                                }
                            </li>

                        </ul>
                        <div className='clearfix'></div>
                    </section>
                    <section className='second_col bg-white'>
                        {/* <select onChange={(e) => {
                            handleChange(e);
                            selectChangeHandler(e);
                        }} onBlur={handleBlur}>
                            <option defaultValue={''} value=''>Select an option</option>
                            <option value="email">Email</option>
                            <option value="csv">CSV</option>
                        </select>
                        {
                            errors.matched && touched.matched &&
                            <span className="block text-red-500">{errors.matched}</span>
                        } */}
                        <h2 className="cmn_head text-xl md:text-2xl text-black font-bold mb-2.5">E-mails for reprocessing</h2>
                        {/* {
                            showInput && showInput == 'email' &&
                            <textarea className='cmn_box' cols="30" rows="10" value={values.emails_list} name='emails_list' onChange={handleChange} onBlur={handleBlur}>
                            </textarea>
                        } */}

                        {
                            // showInput && showInput == 'csv' &&
                            <input ref={csvRef} type="file" accept='.csv' name="csvFile" onChange={(event) => {
                                setFieldValue("csvFile", event.currentTarget.files[0]);
                            }} onBlur={handleBlur} />
                        }
                        {
                            errors.csvFile && touched.csvFile &&
                            <span className="block text-red-500">{errors.csvFile}</span>
                        }
                        <button type='submit' disabled={isSubmitting} className='submit_btn block ml-auto rounded-3xl'>{submitBtnText}</button>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default Dashboard;