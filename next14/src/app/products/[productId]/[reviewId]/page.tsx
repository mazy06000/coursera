import { notFound } from "next/navigation";

type ReviewParams = {
    params : {
        productId: string
        reviewId: string
    }
    };

export default function ReviewDetails({ params }: ReviewParams) {
    if (parseInt(params.reviewId) > 1000) {
        notFound();
    }
  return (
    <div>
      <h1>Product Details: {params.productId}</h1>
      <h1>Product Details: {params.reviewId}</h1>
    </div>
  );
}