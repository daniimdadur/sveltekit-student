<script>
    import {getDepartmentDelete, getDepartmentList} from "$lib/api/DepartmentApi.js";
    import {alertConfirm, alertError, alertSuccess} from "$lib/alert.js";
    import {onMount} from "svelte";

    let departments = $state([]);
    let number = $state(1);

    async function departmentList() {
        const response = await getDepartmentList();
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            departments = responseBody.data;
        } else {
            await alertError(responseBody.message);
        }
    }

    async function departmentDelete(id) {
        if (!await alertConfirm('are you sure want to delete this department?')) return;

        const response = await getDepartmentDelete(id);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            await alertSuccess('delete department successfully');
            await departmentList();
        } else {
            await alertError(responseBody.message);
        }
    }

    onMount(async ()=> {
        await departmentList();
    });
</script>
<section class="p-6 flex-1">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Department List</h2>
        <a class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
           href="/department/create">
            ➕ Add Department
        </a>
    </div>

    <div class="overflow-x-auto bg-white rounded-2xl shadow">
        <table class="min-w-full border-collapse">
            <thead class="bg-gray-100 text-gray-700">
            <tr>
                <th class="px-6 py-3 text-left">#</th>
                <th class="px-6 py-3 text-left">ID</th>
                <th class="px-6 py-3 text-left">Name</th>
                <th class="px-6 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each departments as department, index}
                <tr class="border-t hover:bg-gray-50">
                    <th class="px-6 py-3">{index+1}</th>
                    <td class="px-6 py-3">{department.id}</td>
                    <td class="px-6 py-3">{department.name}</td>
                    <td class="px-6 py-3 text-center space-x-2">
                        <a class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                           href="/department/{department.id}">
                            Details
                        </a>
                        <a class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                           href="/department/{department.id}/edit">
                            Edit
                        </a>
                        <button onclick={() => departmentDelete(department.id)}
                                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded">
                            <i class="fas fa-trash-alt mr-2"></i> Delete
                        </button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</section>
