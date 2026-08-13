import { ModeToggle } from "./theme-toggle";

const header = async () => {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-14 w-full items-center justify-center border-b border-gray-200 bg-white px-4 shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <p className="font-semibold text-xl">Lorelis</p>

      <div className="absolute right-4">
        <ModeToggle />
      </div>
    </header>
  );
};

export default header;