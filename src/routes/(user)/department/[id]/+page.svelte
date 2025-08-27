<script>
    import {departmentGet} from "$lib/api/DepartmentApi.js";
    import {alertError} from "$lib/alert.js";
    import {page} from "$app/state";
    import {onMount} from "svelte";

    const {id} = page.params;
    const department = $state({
        id: id,
        name: ''
    });

    let students = $state([{
        id: '',
        name: '',
        email: '',
        departmentName: ''
    }]);

    let lecturers = $state([
        {
            id: '',
            name: '',
            email: '',
            title: '',
            departmentName: ''
        }
    ]);

    async function departmentDetail() {
        const response = await departmentGet(id);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            department.name = responseBody.data.name;
            students = responseBody.data.students;
            lecturers = responseBody.data.lecturers;
        } else {
            await alertError(responseBody.message)
        }
    }

    onMount(async () => {
        await departmentDetail();
    });
</script>
<section class="p-6 bg-white rounded-2xl shadow-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-700">Department Detail</h2>

    <form class="space-y-4">
        <div>
            <label for="id" class="block text-sm font-medium text-gray-600">ID</label>
            <input
                    id="id"
                    type="text"
                    bind:value={department.id}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
            />
        </div>
        <div>
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input
                    id="name"
                    type="text"
                    bind:value={department.name}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
            />
        </div>
        {#if students && students.length > 0}
            <h2 class="text-2xl font-bold">Student List</h2>
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
                                <a class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                   href="/student/{student.id}">
                                    Details
                                </a>
                                <a class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                   href="/student/{student.id}">
                                    Edit
                                </a>
                                <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        {/if}
        {#if lecturers && lecturers.length > 0}
            <h2 class="text-2xl font-bold">Lecturer List</h2>
            <div class="overflow-x-auto bg-white rounded-2xl shadow">
                <table class="min-w-full border-collapse">
                    <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th class="px-6 py-3 text-left">#</th>
                        <th class="px-6 py-3 text-left">ID</th>
                        <th class="px-6 py-3 text-left">Name</th>
                        <th class="px-6 py-3 text-left">Email</th>
                        <th class="px-6 py-3 text-left">Title</th>
                        <th class="px-6 py-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each lecturers as lecturer, index}
                        <tr class="border-t hover:bg-gray-50">
                            <th class="px-6 py-3">{index+1}</th>
                            <td class="px-6 py-3">{lecturer.id}</td>
                            <td class="px-6 py-3">{lecturer.name}</td>
                            <td class="px-6 py-3">{lecturer.email}</td>
                            <td class="px-6 py-3">{lecturer.title}</td>
                            <td class="px-6 py-3 text-center space-x-2">
                                <a class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                   href="/lecturer/{lecturer.id}">
                                    Details
                                </a>
                                <a class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                   href="/lecturer/{lecturer.id}">
                                    Edit
                                </a>
                                <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        {/if}
        <div class="flex justify-end gap-3">
            <a class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            href="/department">
                Back
            </a>
        </div>
    </form>
</section>