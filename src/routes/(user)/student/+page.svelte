<script>
    import {studentDelete, studentGetList} from "$lib/api/StudentApi.js";
    import {alertConfirm, alertError, alertSuccess} from "$lib/alert.js";
    import {onMount} from "svelte";

    let students = $state([]);

    async function studentList() {
        const response = await studentGetList();
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            students = responseBody.data;
        } else {
            await alertError(responseBody.message);
        }
    }

    async function studentRemove(id) {
        if (!await alertConfirm('are you sure?')) return;

        const response = await studentDelete(id);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            await alertSuccess(`delete ${responseBody.data.name} successfully`);
            await studentList();
        } else {
            await alertError(responseBody.message);
        }
    }

    onMount(async () => {
        await studentList();
    });
</script>
<section class="p-6 flex-1">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Student List</h2>
        <a class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
           href="/student/create">
            ➕ Add Student
        </a>
    </div>

    <div class="overflow-x-auto bg-white rounded-2xl shadow">
        <table class="min-w-full border-collapse">
            <thead class="bg-gray-100 text-gray-700">
            <tr>
                <th class="px-6 py-3 text-left">#</th>
                <th class="px-6 py-3 text-left">ID</th>
                <th class="px-6 py-3 text-left">Name</th>
                <th class="px-6 py-3 text-left">Email</th>
                <th class="px-6 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each students as student, index}
                <tr class="border-t hover:bg-gray-50">
                    <th class="px-6 py-3">{index+1}</th>
                    <td class="px-6 py-3">{student.id}</td>
                    <td class="px-6 py-3">{student.name}</td>
                    <td class="px-6 py-3">{student.email}</td>
                    <td class="px-6 py-3 text-center space-x-2">
                        <a class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                           href="/student/{student.id}">
                            Details
                        </a>
                        <a class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                           href="/student/{student.id}/edit">
                            Edit
                        </a>
                        <button onclick={() => studentRemove(student.id)}
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