import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import rate from "../../assets/images/rate.png";
import ProductCardHook from '../../hooks/products/product-card-hook';

const ProductCard = ({ item, favProd }) => {
    const [removeToWishListData, addToWishListData, handelFav, favImg] = ProductCardHook(item, favProd)

    const hasDiscount = item.priceAfterDiscount && item.priceAfterDiscount >= 1 && item.priceAfterDiscount < item.price;

    return (
        <Col xs="6" sm="6" md="4" lg="3" className="d-flex align-items-stretch">
            <Card
                className="product-card my-2 w-100 border-0"
                style={{
                    borderRadius: "24px",
                    border: "1px solid rgba(63,150,210,0.15)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    height: "385px",
                }}>
                {/* Image wrapper with fav button overlay */}
                <div style={{ position: "relative", height: "220px", backgroundColor: "#F2F8FD", overflow: "hidden", flexShrink: 0 }}>
                    <Link to={`/products/${item._id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                        <Card.Img
                            src={item.imageCover}
                            alt={item.title}
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "contain",
                                padding: "10px",
                                transition: "transform 0.3s ease",
                            }}
                            className="product-card-img"
                        />
                    </Link>
                    {/* fav button - absolute top-right */}
                    <div
                        onClick={handelFav}
                        title={favImg && favImg.includes ? "" : "المفضلة"}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: 'pointer',
                            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                            zIndex: 2,
                        }}
                    >
                        <img
                            src={favImg}
                            alt="fav"
                            style={{
                                height: "18px",
                                width: "18px",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                    {/* discount badge */}
                    {hasDiscount ? (
                        <div style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            backgroundColor: "#34C759",
                            color: "#fff",
                            fontSize: "11px",
                            fontWeight: "700",
                            padding: "3px 8px",
                            borderRadius: "9999px",
                            zIndex: 2,
                        }}>
                            خصم {Math.round(((item.price - item.priceAfterDiscount)/item.price)*100)}%
                        </div>
                    ) : null}
                </div>

                <Card.Body
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "12px 14px 14px",
                        flex: 1,
                    }}>
                    <div>
                        <Card.Title as="div" style={{ marginBottom: "8px" }}>
                            <div
                                className="card-title"
                                title={item.title}
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    minHeight: "40px",
                                    lineHeight: "20px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#333",
                                    textAlign: "right",
                                }}>
                                {item.title}
                            </div>
                        </Card.Title>
                        {item.description ? (
                            <div style={{
                                fontSize: "11px",
                                color: "#999",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "right",
                                marginBottom: "6px",
                            }}>
                                {item.category?.name || ""}
                            </div>
                        ) : null}
                    </div>

                    <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "auto", paddingTop: "8px", borderTop: "1px solid #f5f5f5" }}>
                        <div className="d-flex align-items-center" style={{ gap: "4px" }}>
                            <img
                                src={rate}
                                alt="rate"
                                height="14px"
                                width="14px"
                                style={{ objectFit: "contain" }}
                            />
                            <div className="card-rate" style={{ fontSize: "13px", color: "#ffc107", fontWeight: "700" }}>{item.ratingsAverage || 0}</div>
                            <span style={{ fontSize: "11px", color: "#aaa" }}>({item.ratingsQuantity || 0})</span>
                        </div>
                        <div className="d-flex align-items-baseline" style={{ gap: "6px" }}>
                            {hasDiscount ? (
                                <>
                                    <span style={{ textDecorationLine: 'line-through', color: "#aaa", fontSize: "12px" }}>{item.price}</span>
                                    <span className="card-price" style={{ fontSize: "16px", fontWeight: "800", color: "#1A3F60" }}>{item.priceAfterDiscount}</span>
                                </>
                            ) : (
                                <span className="card-price" style={{ fontSize: "16px", fontWeight: "800", color: "#1A3F60" }}>{item.price}</span>
                            )}
                            <span className="card-currency" style={{ fontSize: "11px", color: "#777" }}>جنيه</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <ToastContainer />
        </Col>
    )
}

export default ProductCard
