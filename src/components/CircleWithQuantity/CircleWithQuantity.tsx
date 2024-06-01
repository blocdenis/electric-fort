import React from 'react';

interface CircleWithQuantityProps {
  quantity: number;
}

function CircleWithQuantity({ quantity }: CircleWithQuantityProps) {
  return (
    <div className="bg-yellow text-center absolute text-white w-[25.5px] top-[-35%] right-[-30%] rounded-full">
      {quantity}
    </div>
  );
}

export default CircleWithQuantity;
