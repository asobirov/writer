type LayoutProps = {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    children
}) => {
    return (
        <div className="container flex mt-4">
            {children}
        </div>
    )
}

export default Layout;