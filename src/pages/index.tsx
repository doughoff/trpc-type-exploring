import {
  AnyQueryProcedure,
  inferProcedureOutput,
  inferProcedureInput,
} from '@trpc/server';
import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import type {
  DecorateProcedure,
  UseTRPCQueryOptions,
} from '@trpc/react/shared';

import { TRPCClientErrorLike } from '@trpc/client';

interface GenericTableProps<
  TProcedure extends AnyQueryProcedure,
  TInput = inferProcedureInput<TProcedure>,
  TData = inferProcedureOutput<TProcedure>,
  TOptions = UseTRPCQueryOptions<
    '',
    inferProcedureInput<TProcedure>,
    TData,
    TData,
    TRPCClientErrorLike<TProcedure>
  >,
> {
  query: DecorateProcedure<TProcedure, ''>;
  filter: TInput;
  options: TOptions;
  header: () => React.ReactNode;
  rows: (data: TData | undefined) => React.ReactNode;
}

const GenericTable = <
  TProcedure extends AnyQueryProcedure,
  TInput = inferProcedureInput<TProcedure>,
  TData = inferProcedureOutput<TProcedure>,
  TOptions = UseTRPCQueryOptions<
    '',
    inferProcedureInput<TProcedure>,
    TData,
    TData,
    TRPCClientErrorLike<TProcedure>
  >,
>({
  query,
  header,
  rows,
  filter,
  options,
}: GenericTableProps<TProcedure, TInput, TData, TOptions>) => {
  const { data } = query.useQuery(filter, options);

  return (
    <>
      {header}
      {rows(data)}
    </>
  );
};

const LocalPage: NextPageWithLayout = () => {
  const { data } = trpc.post.list.useQuery({});
  return (
    <>
      <GenericTable
        procedure={trpc.post.list}
        filter={{}}
        rows={(data) => <span>{data?.title}</span>}
      />
    </>
  );
};

export default LocalPage;
