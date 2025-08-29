<script>
    import {studentPost} from "$lib/api/StudentApi.js";
    import {alertError, alertSuccess} from "$lib/alert.js";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {departmentGetList} from "$lib/api/DepartmentApi.js";
    import {lecturerPost} from "$lib/api/LecturerApi.js";

    let lecturer = $state({
        name: '',
        email: '',
        title: '',
        departmentId: ''
    });

    let departments = $state([
        {
            id: '',
            name: ''
        }
    ]);

    async function lecturerCreate(e) {
        e.preventDefault();

        const response = await lecturerPost(lecturer);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            await alertSuccess();
            await goto('/lecturer');
        } else {
            await alertError(responseBody.message);
        }
    }

    async function departmentList() {
        const response = await departmentGetList();
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            departments = responseBody.data;
        } else {
            await alertError(responseBody.message);
        }
    }

    onMount(async ()=> {
        await departmentList();
    });
</script>
<section class="p-6 bg-white rounded-2xl shadow-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-700">Lecturer Add</h2>

    <form onsubmit={lecturerCreate}>
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input
                    id="name"
                    type="text"
                    bind:value={lecturer.name}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Email</label>
            <input
                    id="name"
                    type="email"
                    bind:value={lecturer.email}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div><div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-600">Title</label>
        <input
                id="name"
                type="text"
                bind:value={lecturer.title}
                class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
        <div class="mb-4">
            <label for="department" class="block text-sm font-medium text-gray-600">Department</label>
            <select
                    id="department"
                    bind:value={lecturer.departmentId}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
            >
                <option value="" disabled>Select Department</option>
                {#each departments as department}
                    <option value={department.id}>
                        {department.name}
                    </option>
                {/each}
            </select>
        </div>
        <div class="flex justify-end gap-3 mt-4">
            <button type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                <i class="fas fa-plus-circle mr-2"></i>Save
            </button>
            <a class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
               href="/lecturer">
                Back
            </a>
        </div>
    </form>
</section>