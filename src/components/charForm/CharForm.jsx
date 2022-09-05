import "./charForm.scss";
import "../../style/button.scss"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelService from "../../services/MarvelService";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const CharForm = () => {
    const { getCharacterByName } = useMarvelService();
    const [char, setChar] = useState(null);
    const [noChar, setNoChar] = useState(false);

    const results = (values) => (
        noChar && !values.name ? 
            <div className="error">The character was not found. Check the name and try again</div>
        : char ? 
            <div className="success">
                <div className="success__text">There is! Visit {char} page?</div>
                <NavLink 
                    to={`/characters/${char}`} 
                    className="button button__secondary"
                    >
                        <div className="inner">To page</div>
                </NavLink>
            </div>
                : null
    )

    return (
        <Formik
            initialValues={{name: ''}}
            validate={values => {
                const errors ={};
                if (!values.name) {
                    errors.name = 'This field is required'
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                getCharacterByName(values.name)
                    .then(data => {
                        if (data) {
                            setChar(data.name);
                            setNoChar(false);
                            values.name = '';
                        } else {
                            values.name = '';
                            setChar(null);
                            setNoChar(true);
                        }
                    })
                    .then(() => setSubmitting(false));
                
              }}
        >
            {({isSubmitting, values, handleChange, setFieldError}) => (
                <Form className='form'>
                    <label htmlFor='name'>Or find a character by name:</label>
                    <Field 
                        type='text' 
                        name='name' 
                        placeholder='Enter name'
                        onChange={(e) => {handleChange(e) ;setNoChar(false)}}
                        onBlur={() => setFieldError('name', '')}
                    />
                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className='button button__main'
                    >
                        <div className="inner">Find</div>
                    </button>               
                    <ErrorMessage name="name" component='div' className="error"/>
                    {results(values)}
                </Form>
            )}
        </Formik>
    )
}

export default CharForm;