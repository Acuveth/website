// FeaturesScreen.js
import React from 'react';
import { TruckIcon, TagIcon, ChatAlt2Icon } from '@heroicons/react/outline';

const FeaturesScreen = () => {
  return (
    <div className="flex flex-col items-center py-16 bg-gray-900">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-white mb-12">
        NAJ VEČ LJUDI VE ZA VAS
      </h2>

      {/* Feature Icons and Descriptions */}
      <div className="flex justify-center space-x-16">
        
        {/* Feature 1: Hitra objava */}
        <div className="flex flex-col items-center text-center">
          <TruckIcon className="w-20 h-20 text-white mb-4" />
          <h3 className="text-lg font-semibold text-white">Hitra objava</h3>
          <p className="text-gray-400 max-w-xs">
            Vaš dogodek bomo objavili v 24h od vašega nakupa
          </p>
        </div>

        {/* Feature 2: Cenovno ugodne cene */}
        <div className="flex flex-col items-center text-center">
          <TagIcon className="w-20 h-20 text-white mb-4" />
          <h3 className="text-lg font-semibold text-white">Cenovno ugodne cene</h3>
          <p className="text-gray-400 max-w-xs">
           Najcenejši in največji medij za promocijo dogodkov v Sloveniji
          </p>
        </div>

        {/* Feature 3: 24/7 Pomoč strankam */}
        <div className="flex flex-col items-center text-center">
          <ChatAlt2Icon className="w-20 h-20 text-white mb-4" />
          <h3 className="text-lg font-semibold text-white">24/7 Pomoč strankam</h3>
          <p className="text-gray-400 max-w-xs">
            Kadarkoli in kjerkoli smo na voljo 24/7 za kakršno koli pomoč strankam
          </p>
        </div>

      </div>
    </div>
  );
};

export default FeaturesScreen;
