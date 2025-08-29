<script>
    let menuItems = [
        { name: "Dashboard", icon: "📊", href: "/" },
        { name: "Users", icon: "👥", href: "#" },
        { name: "Settings", icon: "⚙️", href: "#" },
        { name: "Department", icon: "👥", href: "/department" },
        { name: "Student", icon: "👥", href: "/student" },
        { name: "Lecturer", icon: "👥", href: "/lecturer" },
        { name: "Course", icon: "👥", href: "/course" }
    ];
</script>

<aside class="bg-gray-900 text-white w-64 min-h-screen p-4 space-y-6 shadow-lg">
    <h2 class="text-xl font-semibold">Menu</h2>
    <ul class="space-y-2">
        {#each menuItems as item}
            <li>
                <a href={item.href} class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
                    <span>{item.icon}</span> {item.name}
                </a>
            </li>
        {/each}
    </ul>
</aside>
