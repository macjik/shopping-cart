import { seedItems } from '../../db';

function SeedButton({ onRefresh }) {
  const handleClick = async () => {
    try {
      await seedItems();
      onRefresh(); 
    } catch (error) {
      console.error('Failed to seed items:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className='mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
    >
      Recreate products
    </button>
  );
}

export default SeedButton;