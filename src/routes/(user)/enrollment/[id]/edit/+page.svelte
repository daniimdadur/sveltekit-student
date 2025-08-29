<script>
    import {page} from "$app/state";
    import {alertError, alertSuccess} from "$lib/alert.js";
    import {departmentGetList} from "$lib/api/DepartmentApi.js";
    import {onMount} from "svelte";
    import {lecturerGet, lecturerPatch} from "$lib/api/LecturerApi.js";

    const {id} = page.params;
    let lecturer = $state({
        name: '',
        email: '',
        title: '',
        departmentId: '',
        departmentName: ''
    });

    let departments = $state([
        {
            id: '',
            name: ''
        }
    ]);

    async function lecturerUpdate(e) {
        e.preventDefault();

        const response = await lecturerPatch(id, lecturer);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            await alertSuccess();
        } else {
            await alertError(responseBody.message);
        }
    }

    async function lecturerDetail() {
        const response = await lecturerGet(id);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            lecturer = responseBody.data;
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

    onMount(async () => {
        await departmentList();
        await lecturerDetail();
    });
</script>
<section class="p-6 bg-white rounded-2xl shadow-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-700">Lecturer Edit</h2>

    <form onsubmit={lecturerUpdate}>
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
        </div>
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Email</label>
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
                    <option value={department.id} selected={department.id === lecturer.departmentId}>
                        {department.name}
                    </option>
                {/each}
            </select>
        </div>
        <div class="flex justify-end gap-3 mt-4">
            <button type="submit"
                    class="bg-yellow-400 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                <i class="fas fa-plus-circle mr-2"></i>Save Changes
            </button>
            <a class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
               href="/lecturer">
                Back
            </a>
        </div>
    </form>
</section>