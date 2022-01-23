import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import Joi from "joi";
import { register } from "../services/accountService";
import { toast } from "react-toastify";

const RegisterForms = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({})
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email({tlds: {allow: false}}).required().label("Email"),
        password: Joi.string().required().min(6).label("Password"),
        passwordConfirm: Joi.any().equal(Joi.ref("password")).required()
    })
    const handleSubmit = async () => {
        setErrors({});
        const {error, value} = schema.validate({name, email, password, passwordConfirm}, {abortEarly: false});
        if (error) {
            const errors = {};
            for (const item of error.details)
                errors[item.path[0]] = item.message;
            setErrors(errors);
            return;
        }
        setSubmitting(true);
        try {
            const response = await register(name, email, password);
            if (response && response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.name)
                window.location = "/";
            }
        }
        catch (e) {
            if(e.response && e.response.status === 400)
                toast.error("Email already exists.");
            setSubmitting(false);
        }
    }
    return (
            <Form>
                <FloatingLabel className="mb-3" label="Name">
                    <Form.Control type="text"
                                  placeholder="Name"
                                  value={name}
                                  onChange={e => setName(e.currentTarget.value)}
                                  style={errors.name ? {borderColor: "orange"} : {}}/>
                    {errors.name && <Form.Text>{errors.name}</Form.Text>}
                </FloatingLabel>
                <FloatingLabel className="mb-3" label="Email">
                    <Form.Control type="email"
                                  placeholder="Enter email"
                                  value={email}
                                  onChange={e => setEmail(e.currentTarget.value)}
                                  style={errors.email ? {borderColor: "orange"} : {}}/>
                    {errors.email && <Form.Text>{errors.email}</Form.Text>}
                </FloatingLabel>
                <FloatingLabel className="mb-3" label="Password">
                    <Form.Control type={showPassword ? "text" : "password"}
                                  placeholder="Password"
                                  value={password}
                                  onChange={e => setPassword(e.currentTarget.value)}
                                  style={errors.password ? {borderColor: "orange"} : {}} />
                    {errors.password && <Form.Text>{errors.password}</Form.Text>}
                </FloatingLabel>
                <FloatingLabel className="mb-2" label="Re-enter Password">
                    <Form.Control type={showPassword ? "text" : "password"}
                                  placeholder="Re-enter Password"
                                  value={passwordConfirm}
                                  onChange={e => setPasswordConfirm(e.currentTarget.value)}
                                  style={errors.passwordConfirm ? {borderColor: "orange"} : {}} />
                    {errors.passwordConfirm && <Form.Text>Passwords do not match</Form.Text>}
                </FloatingLabel>
                <Form.Check className="mb-3" type="checkbox" label="Show Password" onChange={() => {setShowPassword(!showPassword)}}/>
                <Button onClick={handleSubmit} disabled={submitting}>
                    {submitting ? "Submitting" : "Register"}
                    {submitting && <Spinner as="span" size="sm" animation="border" style={{marginLeft: "5px"}}/>}
                </Button>
            </Form>
    );
};

export default RegisterForms;