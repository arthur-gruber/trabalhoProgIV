import CleaningProducts from "@/components/cleaning-products";
import db from "@/db";
import { productTable } from "@/db/schema";

export default async function Home() {
  const products = await db.select().from(productTable).all();

  return <CleaningProducts products={products} />;
}
