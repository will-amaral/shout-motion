import type { ReactNode } from 'react'

type TableProps = {
  columns: {
    title: string
    field: string
    render?: (value: unknown) => ReactNode
  }[]
  rows: { id?: string; [key: string]: unknown }[]
}
export default function Table(props: TableProps) {
  const { columns, rows } = props
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ title }) => (
            <th scope="col" key={title}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row?.id || index}>
            {columns
              .map(({ field, render }) => {
                if (field in row && render) return <td>{render(row[field])}</td>
                else if (field in row) return <td>{row[field] as ReactNode}</td>
                else return null
              })
              .filter(item => !!item)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
