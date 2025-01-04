import Image from 'next/image';
import React from 'react';
import loading from '../../../public/loading-min.png';

function Loading() {
  return (
    <div className="h-[50vh] flex flex-col items-center justify-center gap-5 laptop:px-[20px] laptop:py-[20px]">
      <div className="mb-6 animate-bounce">
        <Image src={loading} alt="ElecticForLogo" height={106} width={106} />
      </div>
      <p className="w-full text-center text-lg">Завантаження...</p>
    </div>
  );
}

export default Loading;
