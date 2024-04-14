type ProductDetailsParams = {
    params : {
        productId: string
    }
    };

export default function ProductDetails({ params }: ProductDetailsParams) {
  return (
    <div>
      <h1>Product Details: {params.productId}</h1>
    </div>
  );
}