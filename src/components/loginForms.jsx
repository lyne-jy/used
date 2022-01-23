import React, { useState } from 'react';
import { Button, Form, FloatingLabel, InputGroup, Spinner } from "react-bootstrap";
import Joi from "joi";
import { login} from "../services/accountService";
import { toast } from "react-toastify";

const LoginForms = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({})
    const schema = Joi.object({
        email: Joi.string().email({tlds: {allow: false}}).required().label("Email"),
        password: Joi.string().required().label("Password")
    })
    const handleSubmit = async () => {
        setErrors({});
        const {error, } = schema.validate({email, password}, {abortEarly: false});
        if (error) {
            const errors = {};
            for (const item of error.details)
                errors[item.path[0]] = item.message;
            setErrors(errors);
            return;
        }
        setSubmitting(true);
        try {
            const response = await login(email, password);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.name);
            window.location = "/";
        }
        catch (e) {
            if (e.response && e.response.status === 401)
                toast.error("invalid email or password.")
            setSubmitting(false);
        }
    }
    return (
        <Form>
            <FloatingLabel label="Email" className="mb-3 flex-grow-1">
                <Form.Control type="email"
                              placeholder="Email"
                              value={email}
                              onChange={e => setEmail(e.currentTarget.value)}
                              style={errors.email ? {borderColor: "orange"} : {}}/>
                {errors.email && <Form.Text>{errors.email}</Form.Text>}
            </FloatingLabel>
            <FloatingLabel label="Password" className="mb-3">
                <Form.Control type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              value={password}
                              onChange={e => setPassword(e.currentTarget.value)}
                              style={errors.password ? {borderColor: "orange"} : {}}/>
                {errors.password && <Form.Text>{errors.password}</Form.Text>}
            </FloatingLabel>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Show Password" onChange={() => {
                    setShowPassword(!showPassword)
                }}/>
            </Form.Group>
            <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting" : "Login"}
                {submitting && <Spinner as="span" size="sm" animation="border" style={{marginLeft: "5px"}}/>}
            </Button>
        </Form>
    );
};

export default LoginForms;