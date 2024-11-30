"use server";

import db from "@/db";
import { Product, productTable } from "@/db/schema";
import { toast } from "@/hooks/use-toast";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (id: number) => {
  const product = await db
    .select()
    .from(productTable)
    .where(eq(productTable.id, id))
    .limit(1)
    .then((res) => res[0]);
  if (!product) return;

  await db.delete(productTable).where(eq(productTable.id, id));

  revalidatePath("/");
};

export const addProduct = async (
  product: Omit<Product, "id"> & { id?: number }
) => {
  if (product.id) {
    await db
      .update(productTable)
      .set(product)
      .where(eq(productTable.id, product.id));
  } else {
    await db.insert(productTable).values(product);
  }

  revalidatePath("/");
};
