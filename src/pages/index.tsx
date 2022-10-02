import {
  AnyQueryProcedure,
  inferProcedureInput,
  inferProcedureOutput,
} from '@trpc/server';
import { NextPageWithLayout } from './_app';
import type {
  DecorateProcedure,
  UseTRPCQueryOptions,
} from '@trpc/react/shared';
import { trpc } from '~/utils/trpc';
import { TRPCClientErrorLike } from '@trpc/client';

type GenericTableProps<
  TProcedure extends AnyQueryProcedure,
  TInput extends inferProcedureInput<TProcedure>,
  TPath extends string,
> = {
  query: DecorateProcedure<TProcedure, TPath>;
  input: TInput;
  queryOptions: UseTRPCQueryOptions<
    TPath,
    inferProcedureInput<TProcedure>,
    inferProcedureOutput<TProcedure>,
    inferProcedureOutput<TProcedure>,
    TRPCClientErrorLike<TProcedure>
  >;
  rows: (data: inferProcedureOutput<TProcedure> | undefined) => React.ReactNode;
};

const GenericTable = <
  TProcedure extends AnyQueryProcedure,
  TInput extends inferProcedureInput<TProcedure>,
  TPath extends string,
>({
  query,
  input,
  queryOptions,
  rows,
}: GenericTableProps<TProcedure, TInput, TPath>) => {
  const { data } = query.useQuery(input, queryOptions);
  return <div>{rows(data)}</div>;
};

const LocalPage: NextPageWithLayout = () => {
  return (
    <GenericTable
      query={trpc.post.list}
      input={{ limit: 10 }}
      queryOptions={{}}
      rows={(data) =>
        (data?.items ?? []).map((item) => <div key={item.id}>{item.title}</div>)
      }
    />
  );
};

export default LocalPage;
