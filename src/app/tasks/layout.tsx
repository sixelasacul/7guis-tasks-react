export default function TasksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <a href="/">Go back to home page</a>
      <br />
      {children}
    </>
  )
}
