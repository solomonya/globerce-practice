import axios from 'axios';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

const MarketSection: FC<PropsWithChildren<{ loading: boolean }>> = ({
  loading,
  children,
}) => {
  return <div> {children}</div>;
};

const CategorySkeleton: FC = () => {
  return <div></div>;
};

const Category: FC<{ items: Array<any> }> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

const CategorySection: FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('request')
      .then((response) => {
        setData(response.data);
      })
      .catch((reject) => {
        setError(reject);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || error) {
    return (
      <MarketSection loading={loading}>
        <CategorySkeleton />
      </MarketSection>
    );
  }

  return <Category items={data} />;
};
