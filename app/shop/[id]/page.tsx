import ProductDetail from "./ProductDetails";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/lib/models/Product";

async function getProduct(id: string) {
  try {
    await connectToDatabase();

    const product = await Product.findById(id).lean();

    return JSON.parse(JSON.stringify(product));
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  // const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return <ProductDetail product={product} />;
}