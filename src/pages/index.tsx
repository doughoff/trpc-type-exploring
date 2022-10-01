import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import GenericTable from '~/components/GenericTable/GenericTable';

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
