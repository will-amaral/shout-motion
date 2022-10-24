export default function Data(props: { data: any }) {
  return <pre>{JSON.stringify(props.data, null, 2)}</pre>
}
