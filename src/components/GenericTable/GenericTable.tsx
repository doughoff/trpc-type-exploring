export interface Props<T> {
  items: T[];
  header: () => React.ReactNode;
  rows: (item: T) => React.ReactNode;
}

const GenericTable = <T,>({ items, header, rows }: Props<T>) => {
  return (
    <>
      {header}
      {items.map(rows)}
    </>
  );
};

export default GenericTable;
