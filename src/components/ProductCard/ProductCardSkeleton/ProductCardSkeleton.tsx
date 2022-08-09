import React, { FC } from 'react';
import productPlaceholderSm from '../../../assets/mocks/product-placeholder.png';
import productPlaceHolderLg from '../../../assets/mocks/product-placeholder-lg.png';
import Skeleton from '../../Skeleton/Skeleton';

const ProductCardSkeleton: FC<{ size: string }> = ({ size }) => {
  return (
    <div>
      <img
        src={size === 'sm' ? productPlaceholderSm : productPlaceHolderLg}
        alt='product card skeleton'
      />
      <Skeleton width={131} height={16} bottomMargin={6} />
      <Skeleton width={105} height={10} bottomMargin={2} />
      <Skeleton width={83} height={16} bottomMargin={2} />
      {size === 'lg' && <Skeleton width={105} height={18} />}
    </div>
  );
};

export default ProductCardSkeleton;
