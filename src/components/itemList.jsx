import React from 'react';
import { Card } from "react-bootstrap";
import { Image } from "cloudinary-react";

const ItemList = ({items, onItemClick}) => {
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    if (items.length === 0) return (<Card><Card.Body>Currently no item in list</Card.Body></Card>);
    const renderImage = (item) => {
        if (!item.picUrl) return <img src="/no-image.png" width={180} height={180}  className="img-thumbnail"/>
        return <Image cloudName={cloudName}
                      publicId={item.picUrl.split(",")[0]}
                      width={180}
                      height={180}
                      crop="thumb"
                      className="img-thumbnail"/>
    };
    return (
        <Card>
            <Card.Body>
                {items.map(item =>
                    <div key={item.id}>
                        <div className="d-flex" style={{cursor: "pointer"}} onClick={() => onItemClick(item.id)}>
                            {renderImage(item)}
                            <Card className="w-100">
                                <Card.Header className="d-flex justify-content-between">
                                    <div>{item.name}</div>
                                    <h5>${item.price}</h5>
                                </Card.Header>
                                <Card.Body>
                                    <p style={{height: "60%"}}>{item.description}</p>
                                    <small>{item.date.slice(0, 10)} | {item.location}</small>
                                </Card.Body>
                            </Card>
                        </div>
                        <hr/>
                    </div>)}
            </Card.Body>
        </Card>);
};

export default ItemList;