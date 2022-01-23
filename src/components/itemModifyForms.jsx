import React, { useState } from 'react';
import { Button, Form, Spinner } from "react-bootstrap";
import Joi from "joi";
import ImageDropzone from "./dropZone";
import httpService from "../services/httpService";
import { deleteItem, postItem, putItem } from "../services/itemService";
import { toast } from "react-toastify";
import { Image } from "cloudinary-react";

const ItemModifyForms = ({item}) => {
    const locationOptions =
        ["toronto", "montreal", "vancouver", "calgary", "edmonton", "ottawa", "winnipeg", "quebec", "other"];
    const categoryOptions =
        ["electronic", "clothing", "vehicle", "art", "furniture", "books", "service", "other"];
    const conditionOptions =
        ["new", "mint", "good", "fair"]
    const [name, setName] = useState(item ? item.name : "");
    const [price, setPrice] = useState(item ? item.price : "");
    const [files, setFiles] = useState([]);
    const [description, setDescription] = useState(item ? item.description : "");
    const [currentCategory, setCategory] = useState(item ? item.category : "");
    const [currentLocation, setLocation] = useState(item ? item.location : "");
    const [currentCondition, setCondition] = useState(item ? item.condition : "");
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const schema = Joi.object({
        name: Joi.string().required().max(20).label("Item name"),
        price: Joi.number().required().max(9999999).label("Password"),
        description: Joi.string().required().max(200).label("Description"),
        currentCategory: Joi.string().required().label("Category"),
        currentLocation: Joi.string().required().label("Location"),
        currentCondition: Joi.string().required().label("Condition")
    });

    const handleSubmit = async () => {
        setErrors({});
        const {error,} = schema.validate({
                name,
                price,
                description,
                currentCategory,
                currentLocation,
                currentCondition
            },
            {abortEarly: false});
        if (error) {
            const errors = {};
            for (const item of error.details)
                errors[item.path[0]] = item.message;
            setErrors(errors);
            return;
        }
        setSubmitting(true);
        let picUrl = "";
        if (files.length > 0) {
            try {
                const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
                const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
                for (const file of files) {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", uploadPreset);
                    const response = await httpService.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
                    picUrl += (response.data.public_id + ",");
                }
                picUrl = picUrl.slice(0, -1);
            } catch (e) {
                toast.error("An error occurred when uploading images.")
                setSubmitting(false);
                return;
            }
        }
        try {
            let response;
            if (item)
                response = await putItem(item.id, name, price, currentCategory, description, picUrl, currentLocation, currentCondition);
            else
                response = await postItem(name, price, currentCategory, description, picUrl, currentLocation, currentCondition);
            if (response && (response.status === 201 || response.status === 204)) {
                toast("Submitted!");
                setTimeout(() => {
                    window.location = "/my-items";
                }, 1000);
            }
        } catch (e) {
            toast.error("An error occurred when uploading ad.");
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setSubmitting(true);
        try {
            const response = await deleteItem(item.id);
            if (response && response.status === 204) {
                toast("Deleted!");
                setTimeout(() => {
                    window.location = "/my-items";
                }, 1000);
            }
        }
        catch (e) {
            toast.error("An error occurred when deleting item.")
            setSubmitting(false);
        }
    }
    return (
        <div>
            <Form>
            <Form.Group className="mb-2">
                <Form.Label>Item name</Form.Label>
                <Form.Control type="text"
                              value={name}
                              onChange={e => setName(e.currentTarget.value)}
                              style={errors.name ? {borderColor: "orange"} : {}}/>
                {errors.name && <Form.Text>{errors.name}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text"
                              value={price}
                              onChange={e => setPrice(e.currentTarget.value)}
                              style={errors.price ? {borderColor: "orange"} : {}}/>
                {errors.price && <Form.Text>{errors.price}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Images</Form.Label>
                {item && item.picUrl &&
                    <div className="mb-2">{item.picUrl.split(",").map(img =>
                        <Image publicId={img}
                               cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                               width="100"
                               height="100"
                               crop="thumb"
                               className="mx-1"
                               key={img}/>)}
                    </div>}
                <ImageDropzone setFiles={setFiles}/>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea"
                              rows={3}
                              value={description}
                              onChange={e => setDescription(e.currentTarget.value)}
                              style={errors.description ? {borderColor: "orange"} : {}}/>
                {errors.description && <Form.Text>{errors.description}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Select onChange={e => setCategory(e.currentTarget.value)}
                             style={errors.currentCategory ? {borderColor: "orange"} : {}}
                             value={currentCategory}>
                    <option value="">Select a category</option>
                    {categoryOptions.map(category => <option value={category} key={category}>{category}</option>)}
                </Form.Select>
                {errors.currentCategory && <Form.Text>{errors.currentCategory}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Location</Form.Label>
                <Form.Select onChange={e => setLocation(e.currentTarget.value)}
                             style={errors.currentLocation ? {borderColor: "orange"} : {}}
                             value={currentLocation}>
                    <option value="">Select a location</option>
                    {locationOptions.map(location => <option value={location} key={location}>{location}</option>)}
                </Form.Select>
                {errors.currentLocation && <Form.Text>{errors.currentLocation}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Condition</Form.Label>
                <Form.Select onChange={e => setCondition(e.currentTarget.value)}
                             style={errors.currentCondition ? {borderColor: "orange"} : {}}
                             value={currentCondition}>
                    <option value="">Select a condition</option>
                    {conditionOptions.map(condition => <option value={condition} key={condition}>{condition}</option>)}
                </Form.Select>
                {errors.currentCondition && <Form.Text>{errors.currentCondition}</Form.Text>}
            </Form.Group>
        </Form>
            {submitting && <Spinner as="span" size="sm" animation="border" className="mx-1" style={{marginLeft: "5px"}}/>}
            <Button onClick={handleSubmit}
                    disabled={submitting}>
                {submitting ? "Submitting" : "Submit"}
            </Button>
            {item && <Button onClick={handleDelete}
                     disabled={submitting} variant="danger" className="mx-1">
                {submitting ? "Deleting" : "Delete"}
            </Button>}
        </div>
    );
};

export default ItemModifyForms;