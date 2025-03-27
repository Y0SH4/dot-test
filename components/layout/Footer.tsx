export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">TaskShop</h3>
            <p className="text-sm text-gray-500">
              Manage your tasks and shop in one place
            </p>
          </div>

          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TaskShop. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
