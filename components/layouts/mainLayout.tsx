type LayoutProps = {
    children: React.ReactNode
  }
export default function Layout({ children }: LayoutProps) {
  return (
  <div>
    layout
    {children}
  </div>
)};