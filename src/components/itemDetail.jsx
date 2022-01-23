import React, { useState } from 'react';
import { Modal, Spinner, Button } from "react-bootstrap";
import ImageGallery from 'react-image-gallery';
import { getEmail } from "../services/accountService";
import { toast } from "react-toastify";

const ItemDetail = ({show, onHide, item}) => {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const onGetEmail = async () => {
        if (email) {
            await navigator.clipboard.writeText(email);
            toast("Email copied to clipboard.");
            return;
        }
        setSubmitting(true);
        try {
            const response = await getEmail(item.sellerId);
            if (response.status === 200) setEmail(response.data);
            setSubmitting(false);
        }
        catch (e) {
            setSubmitting(false);
        }
    }
    if (!item) return(<Spinner/>);
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const renderImages = () => {
        if (!item.picUrl) return <img src="/no-image.png" width={300} height={300}/>
        const images = item.picUrl.split(",").map(img => {
            return {
                original: `https://res.cloudinary.com/${cloudName}/image/upload/${img}.jpg`,
                thumbnail:  `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,h_100,w_100/${img}.jpg`
            };
        });
        return <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false}/>
    }
    return (
        <Modal size="xl" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Detail
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>{item.name}</h3>
                <h4>${item.price}</h4>
                {renderImages()}
                <h5 className="mt-3">Description</h5>
                <p>{item.description}</p>
                <small>{item.date.slice(0, 10)} | {item.location} | {item.category}</small>
                <br/>
                <Button className="mt-2" onClick={onGetEmail} disabled={submitting}>{email ? email : "Get Seller's Email"}
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default ItemDetail;