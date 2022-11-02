import React from "react";

import SidebarContent from "./SidebarContent";

function DesktopSidebar() {
  return (
    <aside className="z-30 flex-shrink-0 hidden w-56 overflow-y-auto bg-white dark:bg-gray-800 lg:block border-r">
      <SidebarContent />
    </aside>
  );
}

export default DesktopSidebar;
