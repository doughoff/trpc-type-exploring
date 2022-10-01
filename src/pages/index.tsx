import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';

export interface GenericTableProps<T> {
  items: T[];
  header: () => React.ReactNode;
  rows: (item: T) => React.ReactNode;
}

const GenericTable = <T,>({ items, header, rows }: GenericTableProps<T>) => {
  return (
    <>
      {header}
      {items.map(rows)}
    </>
  );
};

const IndexPage: NextPageWithLayout = () => {
  const { data } = trpc.post.list.useQuery({});

  return (
    <>
      <GenericTable
        items={data?.items ?? []}
        header={() => <span>Header</span>}
        rows={(item) => <span>{item.title}</span>}
      />
    </>
  );
};

export default IndexPage;
