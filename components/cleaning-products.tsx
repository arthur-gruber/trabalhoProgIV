"use client";

import { useState } from "react";
import { SprayCan, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/db/schema";
import { addProduct, deleteProduct } from "@/queries/products";

export default function CleaningProducts({
  products,
}: {
  products: Product[];
}) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState<null | number>(null);

  const { toast } = useToast();

  const test = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const product = {
      id: editingProduct?.id,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
    };

    await addProduct(product);

    if (product.id) {
      toast({
        title: "Produto atualizado",
        description: `${product.name} foi atualizado com sucesso.`,
      });
    } else {
      toast({
        title: "Produto adicionado",
        description: `${product.name} foi adicionado com sucesso.`,
      });
    }

    setEditingProduct(null);
    (e.target as HTMLFormElement).reset();
    setModalOpen(false);
    setEditModalOpen(null);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <SprayCan className="h-6 w-6" />
            Inventário de produtos de limpeza
          </CardTitle>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingProduct(null);
                  setModalOpen(true);
                }}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Editar produto" : "Adicionar novo produto"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={test} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    defaultValue={editingProduct?.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    defaultValue={editingProduct?.description}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      defaultValue={editingProduct?.price}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Estoque</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      required
                      defaultValue={editingProduct?.stock ?? 0}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {editingProduct ? "Atualizar produto" : "Adicionar produto"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Dialog
                      open={editModalOpen === product.id}
                      onOpenChange={(open) =>
                        setEditModalOpen(open ? product.id : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setEditingProduct(product);
                            setEditModalOpen(product.id);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Editar produto</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={test} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                              id="name"
                              name="name"
                              required
                              defaultValue={product.name}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                              id="description"
                              name="description"
                              required
                              defaultValue={product.description}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="price">Preço (R$)</Label>
                              <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                required
                                defaultValue={product.price}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="stock">Estoque</Label>
                              <Input
                                id="stock"
                                name="stock"
                                type="number"
                                min="0"
                                required
                                defaultValue={product.stock ?? 0}
                              />
                            </div>
                          </div>
                          <Button type="submit" className="w-full">
                            Atualizar produto
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        deleteProduct(product.id).then(() => {
                          toast({
                            title: "Produto excluído",
                            description: `${product?.name} foi excluído com sucesso.`,
                            variant: "destructive",
                          });
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
