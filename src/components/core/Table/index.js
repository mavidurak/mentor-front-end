import { STable } from "./styles"
import { useTable, usePagination } from 'react-table'


const Table = ({ columns, data }) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )
  return (
    <>
      <STable {...getTableProps()}>
        <STable.Head>
          {headerGroups.map(headerGroup => (
            <STable.TRHead {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <STable.TH {...column.getHeaderProps({
                  style: { minWidth: column.minWidth, width: column.width }
                })}>{column.render('Header')}</STable.TH>
              ))}
            </STable.TRHead>
          ))}
        </STable.Head>
        <STable.Body {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <STable.TRBody {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <STable.TD {...cell.getCellProps()}>{cell.render('Cell')}</STable.TD>
                })}
              </STable.TRBody>
            )
          })}
        </STable.Body>
      </STable>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
export default Table