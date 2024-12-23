import FavoriteProductCard from "@/components/favorite-product-card";

const sampleProducts = [
  { id: 1, name: "Product 1", description: "Description 1", price: 100 },
  { id: 2, name: "Product 2", description: "Description 2", price: 200 },
  { id: 3, name: "Product 2", description: "Description 2", price: 200 },
  { id: 4, name: "Product 2", description: "Description 2", price: 200 },
];
export default function FavoritesPage() {
  return (
    <div className="container mt-10">
      <h1 className="text-3xl font-bold mb-8">Favoritos</h1>
      <p>No posee productos en su lista de deseos.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleProducts.map((product) => (
          <FavoriteProductCard
            key={product.id}
            title={product.name}
            price={product.price}
            imageUrl="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          />
        ))}
      </div>
    </div>
  );
}
