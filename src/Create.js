
import { useState, useEffect, useCallback } from "react";

import "./Create.css";

export default function Create() {
    const [reviews, setReviews] = useState([]);
    const [pastReviews, setPastReviews] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        setPastReviews(savedReviews);
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);

                // Insert the image inside the review div
                const reviewDiv = document.getElementById("review");
                if (reviewDiv) {
                    reviewDiv.innerHTML += `<img src="${e.target.result}" alt="Uploaded Image" className="ReviewImage" />`;
                }
            };
            reader.readAsDataURL(file);
        }
    };



    function handleReview(event) {
        event.preventDefault();
        const reviewDiv = document.getElementById("review");
        const reviewText = reviewDiv.innerText.trim(); // Use innerText to get the text content

        if (!reviewText && !selectedImage) {
            alert("The review cannot be blank and must include an image or text.");
            return;
        }

        const newReview = { text: reviewText, image: selectedImage };
        setReviews([...reviews, newReview]);

        // Clear the contentEditable div
        reviewDiv.innerHTML = "";
        setSelectedImage(null);
    }


    const saveSessionReviews = useCallback(() => {
        if (reviews.length > 0) {
            const updatedPastReviews = [...pastReviews, ...reviews];
            localStorage.setItem("reviews", JSON.stringify(updatedPastReviews));
            setPastReviews(updatedPastReviews);
            setReviews([]);
        }
    }, [reviews, pastReviews]);

    useEffect(() => {
        window.addEventListener("beforeunload", saveSessionReviews);
        return () => window.removeEventListener("beforeunload", saveSessionReviews);
    }, [saveSessionReviews]);

    return (
        <main>
            <h2 className="heading">Write a Review</h2>
            <div className="container">
                <form className="Review" id="reviewForm">
                    <div className="TextareaWrapper">
                        <div id="review" contentEditable="true" className="ReviewBox1" placeholder="Write your review here..."></div>
                        <br />
                        <input type="file" id="file-upload" accept="image/*" onChange={handleImageUpload} className="FileInput" style={{ display: "none" }} />
                        <label htmlFor="file-upload" className="file-label1">Choose File</label>
                        &nbsp;&nbsp;&nbsp;<button className="SubmitButton" type="button" onClick={handleReview}>Submit Review</button>
                    </div>
                </form>
            </div>

            {reviews.length > 0 && (
                <div className="ReviewSubmitted">
                    <h3>Current Session Reviews:</h3>
                    <br />
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index}>
                                {review.image && <img src={review.image} alt="Review" className="ReviewImage" />}
                                {review.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {pastReviews.length > 0 && (
                <div className="PastReviews">
                    <h2 style={{ color: 'white' }}>Past Reviews:</h2>
                    <div className="ReviewContainer">
                        {pastReviews.map((review, index) => (
                            <div key={index} className="ReviewBox">
                                {/* <img src={Pin} alt="Pin" className="PinImage" />
                                <h4>Review {index + 1}</h4>
                                <p>{review.text}</p>
                                {review.image && <img src={review.image} alt="Past Review" className="ReviewImage" />} */}
                                <div className="review-box">
                                    <h4>Review {index + 1}</h4>
                                    <p>{review.text}</p>
                                    {review.image && <img src={review.image} alt="Past Review" className="ReviewImage" />}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            )}

        </main>
    );
}
