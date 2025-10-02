import React, { ReactNode, useState } from "react";
import { Menubar, Sidebar, Button } from "@/imports";
import { items } from "@/shared/utils/constant";
import { useAppSettings } from "@/entities/AppProvider";

interface LayoutProps {
    headerTitle?: string;
    sidebarContent?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
}

type SidebarState = "hidden" | "overlay" | "expanded" | "collapsed";

const Layout: React.FC<LayoutProps> = ({
    headerTitle = "Threader",
    sidebarContent,
    footer,
    children,
}) => {
    const [sidebarState, setSidebarState] = useState<SidebarState>("expanded");
    const { theme, toggleTheme } = useAppSettings();

    const toggleSidebarDesktop = () => {
        setSidebarState((prev) => (prev === "collapsed" ? "expanded" : "collapsed"));
    };

    const openSidebarMobile = () => setSidebarState("overlay");
    const closeSidebarMobile = () => setSidebarState("hidden");

    const isCollapsed = sidebarState === "collapsed";
    const isOverlay = sidebarState === "overlay";

    const start = (
        <div className="flex align-items-center gap-2">
            {/* Mobile toggle (overlay) */}
            <Button
                icon="pi pi-bars"
                className="p-button-text p-button-plain md:hidden"
                onClick={openSidebarMobile}
            />

            {/* Desktop toggle (collapse/expand) */}
            <Button
                icon={isCollapsed ? "pi pi-angle-right" : "pi pi-angle-left"}
                className="p-button-text p-button-plain hidden md:flex"
                onClick={toggleSidebarDesktop}
            />
        </div>
    );

    const end = (
        <div className="flex align-items-center gap-2">
            <Button
                icon={theme === "light" ? "pi pi-moon" : "pi pi-sun"}
                className="p-button-text"
                onClick={toggleTheme}
            // tooltip={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            // tooltipOptions={{ position: "bottom" }}
            />
        </div>
    );

    return (
        <div className="flex flex-column h-screen surface-ground text-color">
            {/* Header / Menubar */}
            <Menubar
                start={start}
                end={end}
                model={items}
                className="shadow-1 surface-card"
            >
                <span className="font-bold ml-2">{headerTitle}</span>
            </Menubar>

            <div className="flex overflow-hidden">
                {/* Desktop Sidebar (collapsible) */}
                {sidebarContent && (
                    <aside
                        className={`hidden md:flex flex-column surface-card border-right-1 border-300 transition-all transition-duration-300 ${isCollapsed ? "w-4rem" : "w-16rem p-3"
                            } overflow-y-auto`}
                    >
                        {!isCollapsed && (
                            <>
                                <h4 className="mb-3 text-sm text-500">Chat History</h4>
                                {sidebarContent}
                            </>
                        )}
                    </aside>
                )}

                {/* Mobile Sidebar (overlay) */}
                <Sidebar
                    visible={isOverlay}
                    onHide={closeSidebarMobile}
                    modal
                    dismissable
                    className="w-16rem"
                >
                    <h4 className="mb-3 text-sm text-500">Chat History</h4>
                    {sidebarContent}
                </Sidebar>

                {/* Main Content */}
                <main className="flex-1 p-3">{children}</main>
            </div>

            {/* Footer */}
            {footer && (
                <footer className="surface-card border-top-1 border-300 shadow-1 p-3">
                    {footer}
                </footer>
            )}
        </div>
    );
};

export default Layout;
